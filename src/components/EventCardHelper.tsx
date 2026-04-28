/* eslint-disable import/extensions */
import { Event } from '@prisma/client';
import EventCard from '@/components/EventCard';
import { prisma } from '@/lib/prisma';
import { EventCardData } from '@/app/lib/EventCardData';

type Props = {
  event: Event;
  likeVal: String;
  onLikeClick: Function;
};

const EventCardHelper = async ({ event, likeVal, onLikeClick }: Props) => {
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
    picture: event.picture,
    eventDate: event.startTime.toLocaleDateString(),
    startTime: event.startTime.toLocaleTimeString(),
    endTime: event.endTime.toLocaleTimeString(),
    description: event.description,
    location: event.location,
    upvotes: event.upvotes,
    downvotes: event.downvotes,
    interests: interestNames,
    participants: profileParticipants,
  };
  return <EventCard event={eventData} likeVal={likeVal} onLikeClick={onLikeClick} />;
};

export default EventCardHelper;
