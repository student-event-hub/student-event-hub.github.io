/* eslint-disable import/extensions */
import { Event } from '@prisma/client';
import EventCard from '@/components/EventCard';
import { prisma } from '@/lib/prisma';
import { EventCardData } from '@/lib/EventCardData';

const EventCardHelper = async ({ event }: { event: Event }) => {
  const eventInterests = await prisma.eventInterest.findMany({
    where: { eventId: event.id },
  });
  const interests = await prisma.interest.findMany({
    where: { id: { in: eventInterests.map((eventInterest) => eventInterest.interestId) } },
  });
  const interestNames = interests.map((interest) => interest.name);
  const eventParticipants = await prisma.profileEvent.findMany({
    where: { eventId: event.id },
  });
  const participants = eventParticipants.map((eventParticipant) => eventParticipant.profileId);
  const profileParticipants = await prisma.profile.findMany({
    where: { id: { in: participants } },
  });
  const eventData: EventCardData = {
    name: event.name,
    homepage: event.homepage,
    picture: event.picture,
    description: event.description,
    interests: interestNames,
    participants: profileParticipants,
  };
  return <EventCard event={eventData} />;
};

export default EventCardHelper;
