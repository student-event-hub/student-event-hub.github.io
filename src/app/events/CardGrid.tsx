/* eslint-disable import/extensions */
/* eslint-disable react/jsx-no-bind */
'use client';

import { useState } from 'react';
import { Row } from 'react-bootstrap';
import { useSession } from 'next-auth/react';
import EventCard from '@/components/EventCard';
import { updateEventLikeDislike } from '@/lib/dbActions';
import type { EventCardData } from '@/app/lib/EventCardData';

type LikeValue = '0' | '1' | '2';

const CardGrid = ({ initialEvents }: { initialEvents: EventCardData[] }) => {
  const { status } = useSession();
  const [events, setEvents] = useState<EventCardData[]>(initialEvents);
  const [likes, setLikes] = useState<Record<number, LikeValue>>(
    initialEvents.reduce((acc, event) => ({
      ...acc,
      [event.id]: '0',
    }), {} as Record<number, LikeValue>),
  );
  const [updatingEventId, setUpdatingEventId] = useState<number | null>(null);
  const userCanVote = status === 'authenticated';

  const getNewLikeValue = (currentValue: LikeValue, value: string): LikeValue => {
    if (value !== '1' && value !== '2') {
      return '0';
    }
    if (currentValue === value) {
      return '0';
    }
    return value;
  };

  const updateEventCounts = (
    oldEvents: EventCardData[],
    eventId: number,
    oldValue: LikeValue,
    newValue: LikeValue,
  ) => oldEvents.map((event) => {
    if (event.id !== eventId) {
      return event;
    }
    let newLikeCount = event.upvotes;
    let newDislikeCount = event.downvotes;
    if (oldValue === '1') {
      newLikeCount -= 1;
    } else if (oldValue === '2') {
      newDislikeCount -= 1;
    }
    if (newValue === '1') {
      newLikeCount += 1;
    } else if (newValue === '2') {
      newDislikeCount += 1;
    }
    return {
      ...event,
      upvotes: newLikeCount,
      downvotes: newDislikeCount,
    };
  });

  async function handleLike(eventId: number, value: string) {
    if (!userCanVote || updatingEventId === eventId) {
      return;
    }
    const oldValue = likes[eventId] || '0';
    const newValue = getNewLikeValue(oldValue, value);
    const oldEvents = events;
    const oldLikes = likes;
    setUpdatingEventId(eventId);
    setEvents((prevEvents) => updateEventCounts(prevEvents, eventId, oldValue, newValue));
    setLikes((prevLikes) => ({
      ...prevLikes,
      [eventId]: newValue,
    }));
    try {
      const updatedEvent = await updateEventLikeDislike(eventId, oldValue, newValue);
      setEvents((prevEvents) => prevEvents.map((event) => {
        if (event.id !== eventId) {
          return event;
        }
        return {
          ...event,
          upvotes: updatedEvent.upvotes,
          downvotes: updatedEvent.downvotes,
        };
      }));
    } catch {
      setEvents(oldEvents);
      setLikes(oldLikes);
    } finally {
      setUpdatingEventId(null);
    }
  }

  return (
    <Row xs={1} md={2} lg={4} className="g-2">
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          onLikeClick={handleLike}
          likeVal={likes[event.id] || '0'}
          disabled={!userCanVote || updatingEventId === event.id}
        />
      ))}
    </Row>
  );
};

export default CardGrid;
