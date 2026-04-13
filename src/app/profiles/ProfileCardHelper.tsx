/* eslint-disable import/extensions */
import { Profile } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { ProfileCardData } from '@/lib/ProfileCardData';
import ProfileCard from '../../components/ProfileCard';

const ProfileCardHelper = async ({ profile }: { profile: Profile }) => {
  const profileInterests = await prisma.profileInterest.findMany({
    where: { profileId: profile.id },
  });
  const interests = await prisma.interest.findMany({
    where: { id: { in: profileInterests.map((profileInterest) => profileInterest.interestId) } },
  });
  const interestNames = interests.map((interest) => interest.name);
  const profileEvents = await prisma.profileEvent.findMany({
    where: { profileId: profile.id },
  });
  console.log('profileEvents: ', profileEvents);
  const events = await prisma.event.findMany({
    where: { id: { in: profileEvents.map((profileEvent) => profileEvent.eventId) } },
  });
  const profileData: ProfileCardData = {
    firstName: profile.firstName,
    lastName: profile.lastName,
    email: profile.email,
    bio: profile.bio,
    title: profile.title,
    picture: profile.picture,
    events,
    interests: interestNames,
  };
  return <ProfileCard profile={profileData} />;
};

export default ProfileCardHelper;
