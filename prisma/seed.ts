import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';
import * as config from '../config/settings.development.json';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding the database');

  for (const event of config.defaultEvents) {
    console.log(`  Creating/Updating event ${event.name}`);
    for (const interest of event.interests) {
      await prisma.interest.upsert({
        where: { name: interest },
        update: {},
        create: { name: interest },
      });
    }
    const dbEvent = await prisma.event.upsert({
      where: { name: event.name },
      update: { creator: event.creator },
      create: {
        name: event.name,
        description: event.description,
        picture: event.picture,
        startTime: new Date(event.year, event.month, event.day, event.startHour, event.startMinute),
        endTime: new Date(event.year, event.month, event.day, event.endHour, event.endMinute),
        location: event.location,
        owner: event.owner,
        creator: event.creator,
        signedUp: event.signedUp,
      },
    });
    for (const intere of event.interests) {
      const dbInterest = await prisma.interest.findUnique({ where: { name: intere } });
      const existing = await prisma.eventInterest.findMany({
        where: { eventId: dbEvent.id, interestId: dbInterest!.id },
      });
      if (existing.length === 0) {
        await prisma.eventInterest.create({
          data: { eventId: dbEvent.id, interestId: dbInterest!.id },
        });
      }
    }
  }

  for (const project of config.defaultProjects) {
    console.log(`  Creating/Updating project ${project.name}`);
    for (const interest of project.interests) {
      await prisma.interest.upsert({
        where: { name: interest },
        update: {},
        create: { name: interest },
      });
    }
    const dbProject = await prisma.project.upsert({
      where: { name: project.name },
      update: {},
      create: {
        name: project.name,
        homepage: project.homepage,
        description: project.description,
        picture: project.picture,
      },
    });
    for (const intere of project.interests) {
      const dbInterest = await prisma.interest.findUnique({ where: { name: intere } });
      const existing = await prisma.projectInterest.findMany({
        where: { projectId: dbProject.id, interestId: dbInterest!.id },
      });
      if (existing.length === 0) {
        await prisma.projectInterest.create({
          data: { projectId: dbProject.id, interestId: dbInterest!.id },
        });
      }
    }
  }

  const password = await hash('foo', 10);

  console.log('  Creating/Updating admin user admin@foo.com');
  await prisma.user.upsert({
    where: { email: 'admin@foo.com' },
    update: {},
    create: { email: 'admin@foo.com', password, role: 'ADMIN' },
  });

  for (const profile of config.defaultProfiles) {
    console.log(`  Creating/Updating profile ${profile.email}`);
    for (const interest of profile.interests) {
      await prisma.interest.upsert({
        where: { name: interest },
        update: {},
        create: { name: interest },
      });
    }
    await prisma.user.upsert({
      where: { email: profile.email },
      update: {},
      create: { email: profile.email, password },
    });
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
    for (const interest of profile.interests) {
      const dbInterest = await prisma.interest.findUnique({ where: { name: interest } });
      const existing = await prisma.profileInterest.findMany({
        where: { profileId: dbProfile.id, interestId: dbInterest!.id },
      });
      if (existing.length === 0) {
        await prisma.profileInterest.create({
          data: { profileId: dbProfile.id, interestId: dbInterest!.id },
        });
      }
    }
    for (const eventName of profile.events) {
      const dbEvent = await prisma.event.findFirst({ where: { name: eventName } });
      if (!dbEvent) continue;
      const existing = await prisma.profileEvent.findMany({
        where: { profileId: dbProfile.id, eventId: dbEvent.id },
      });
      if (existing.length === 0) {
        await prisma.profileEvent.create({
          data: { profileId: dbProfile.id, eventId: dbEvent.id },
        });
      }
    }
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
