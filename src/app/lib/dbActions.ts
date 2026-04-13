'use server';

import { compare, hash } from 'bcrypt';
import { prisma } from './prisma';

export async function getUser(email: string) {
  // console.log(`getUser data: ${email}`);
  // eslint-disable-next-line @typescript-eslint/return-await
  return await prisma.user.findUnique({
    where: { email },
  });
}

export async function checkPassword(credentials: { email: string; password: string }) {
  // console.log(`checkPassword data: ${JSON.stringify(credentials, null, 2)}`);
  const user = await getUser(credentials.email);
  if (!user) {
    return false;
  }
  // eslint-disable-next-line @typescript-eslint/return-await
  return await compare(credentials.password, user.password);
}

export async function changePassword(credentials: { email: string; password: string }) {
  // console.log(`changePassword data: ${JSON.stringify(credentials, null, 2)}`);
  const password = await hash(credentials.password, 10);
  await prisma.user.update({
    where: { email: credentials.email },
    data: {
      password,
    },
  });
}

export async function createUser(credentials: { email: string; password: string }) {
  // console.log(`createUser data: ${JSON.stringify(credentials, null, 2)}`);
  const password = await hash(credentials.password, 10);
  await prisma.user.create({
    data: {
      email: credentials.email,
      password,
    },
  });
}

export async function createEvent(event: any) {
  // console.log(`createEvent data: ${JSON.stringify(event, null, 2)}`);
  const dbEvent = await prisma.event.create({
    data: event,
  });
  return dbEvent;
}

export async function upsertEvent(event: any) {
  // console.log(`upsertEvent data: ${JSON.stringify(event, null, 2)}`);
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
    },
  });
  event.interests.forEach(async (intere: string) => {
    const dbInterest = await prisma.interest.findUnique({
      where: { name: intere },
    });
    // console.log(`${dbEvent.name} ${dbInterest!.name}`);
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
  event.participants.forEach(async (email: string) => {
    const dbProfile = await prisma.profile.findUnique({
      where: { email },
    });
    const dbProfileEvent = await prisma.profileEvent.findMany({
      where: { eventId: dbEvent.id, profileId: dbProfile!.id },
    });
    if (dbProfileEvent.length === 0) {
      await prisma.profileEvent.create({
        data: {
          eventId: dbEvent.id,
          profileId: dbProfile!.id,
        },
      });
    }
  });
  return dbEvent;
}
