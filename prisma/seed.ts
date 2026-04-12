import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';
import * as config from '../config/settings.development.json';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding the database');
  config.defaultEvents.forEach(async (event) => {
    console.log(`  Creating/Updating event ${event.name}`);
    event.interests.forEach(async (interest) => {
      // console.log(`Event ${event.name} ${interest}`);
      await prisma.interest.upsert({
        where: { name: interest },
        update: {},
        create: { name: interest },
      });
      const dbEvent = await prisma.event.upsert({
        where: { name: event.name },
        update: {},
        create: {
          name: event.name,
          description: event.description,
          picture: event.picture,
          startTime: event.startTime,
          endTime: event.endTime,
          location: event.location,
          owner: event.owner,
          creator: event.creator,
          signedUp: event.signedUp,
        },
      });
      event.interests.forEach(async (intere) => {
        const dbInterest = await prisma.interest.findUnique({
          where: { name: intere },
        });
        // console.log(`${dbEvent.name} ${dbInterest!.name}, ${dbInterest}`);
        const dbEventInterest = await prisma.eventInterest.findMany({
          where: { eventId: dbEvent.id, interestId: dbInterest!.id },
        });
        if (dbEventInterest.length === 0) {
          await prisma.eventInterest.create({
            data: {
              eventId: dbEvent.id,
              interestId: dbInterest!.id,
            },
          });
        }
      });
    });
  });
  const password = await hash('foo', 10);
  config.defaultProfiles.forEach(async (profile) => {
    console.log(`  Creating/Updating profile ${profile.email}`);
    // upsert interests from the profile
    profile.interests.forEach(async (interest) => {
      await prisma.interest.upsert({
        where: { name: interest },
        update: {},
        create: { name: interest },
      });
    });
    // Upsert/Create the user so they can login.
    await prisma.user.upsert({
      where: { email: profile.email },
      update: {},
      create: {
        email: profile.email,
        password,
      },
    });
    // Upsert/Create the profile.
    const dbProfile = await prisma.profile.upsert({
      where: { email: profile.email },
      update: {},
      create: {
        email: profile.email,
        username: profile.username,
        firstName: profile.firstName,
        lastName: profile.lastName,
        bio: profile.bio,
        picture: profile.picture,
      },
    });
    profile.interests.forEach(async (interest) => {
      const dbInterest = await prisma.interest.findUnique({
        where: { name: interest },
      });
      // console.log(`${dbProfile.firstName} ${dbInterest!.name}`);
      const dbProfileInterest = await prisma.profileInterest.findMany({
        where: { profileId: dbProfile.id, interestId: dbInterest!.id },
      });
      if (dbProfileInterest.length === 0) {
        // Create the profile interest
        await prisma.profileInterest.create({
          data: {
            profileId: dbProfile.id,
            interestId: dbInterest!.id,
          },
        });
      }
    });
    // Upsert/Create the profile events
    profile.events.forEach(async (event) => {
      // console.log(`Event member ${dbProfile.firstName} ${event}`);
      const dbEvent = await prisma.event.findFirst({
        where: { name: event },
      });
      const dbProfileEvent = await prisma.profileEvent.findMany({
        where: { profileId: dbProfile.id, eventId: dbEvent!.id },
      });
      if (dbProfileEvent.length === 0 && dbEvent !== null) {
        // Create the profile event
        await prisma.profileEvent.create({
          data: {
            profileId: dbProfile.id,
            eventId: dbEvent.id,
          },
        });
      }
    });
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
