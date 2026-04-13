import { Interest } from '@prisma/client';
// eslint-disable-next-line import/extensions
import { prisma } from '@/lib/prisma';
import InterestCard from './InterestCard';

const InterestCardHelper = async ({ interest }: { interest: Interest }) => {
  const profileInterests = await prisma.profileInterest.findMany({
    where: { interestId: interest.id },
  });
  // console.log('profileInterests: ', profileInterests);
  const profiles = await prisma.profile.findMany({
    where: { id: { in: profileInterests.map((profileInterest) => profileInterest.profileId) } },
  });
  // console.log('profiles: ', profiles);
  const profileImages = profiles.map((profile) => ({ name: profile.email, picture: profile.picture }));
  // console.log('profileImages: ', profileImages);
  const eventInterests = await prisma.eventInterest.findMany({
    where: { interestId: interest.id },
  });
  const events = await prisma.event.findMany({
    where: { id: { in: eventInterests.map((eventInterest) => eventInterest.eventId) } },
  });
  // console.log('events: ', events);
  const eventImages = events.map((event) => ({ name: event.name, picture: event.picture }));
  // console.log('eventImages: ', eventImages);
  const interestData = {
    name: interest.name,
    profilePictures: profileImages,
    eventPictures: eventImages,
  };
  return <InterestCard interest={interestData} />;
};

export default InterestCardHelper;
