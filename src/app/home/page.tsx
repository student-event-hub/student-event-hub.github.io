/* eslint-disable import/extensions */
import React from 'react';
// import { getServerSession } from 'next-auth';
import { auth } from '@/lib/auth';
import { Profile, Interest, Event } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { loggedInProtectedPage } from '@/lib/page-protection';
// import authOptions from '@/lib/authOptions';
import HomePage from './HomePage';

const HomePageHelper = async () => {
  const session = await auth();
  // console.log(session);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );
  const email = (session && session.user && session.user.email) || '';
  const profile = await prisma.profile.findUnique({
    where: { email },
  });
  const interests = await prisma.interest.findMany();
  // const allInterestNames = interests.map((interest) => interest.name);
  const events = await prisma.event.findMany();
  // const allEventNames = events.map((event) => event.name);
  const profileInterests = await prisma.profileInterest.findMany({
    where: { profileId: profile!.id },
  });
  const proInterests: Interest[] = profileInterests.map((profileInterest) => {
    const i = interests.find((interest) => interest.id === profileInterest.interestId);
    return i as Interest;
  });
  const profileEvents = await prisma.profileEvent.findMany({
    where: { profileId: profile!.id },
  });
  const proEvents: Event[] = profileEvents.map((profileEvent) => {
    const p = events.find((event) => event.id === profileEvent.eventId);
    return p as Event;
  });
  return (
    <HomePage
      profile={profile as Profile}
      interests={interests}
      events={events}
      profileInterests={proInterests}
      profileEvents={proEvents}
    />
  );
};

export default HomePageHelper;
