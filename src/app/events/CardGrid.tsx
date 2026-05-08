'use client';

/* eslint-disable import/extensions */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/require-default-props */

import { useState, useEffect } from 'react';
import { Row } from 'react-bootstrap';
import { useSession } from 'next-auth/react';
import EventCard from '@/components/EventCard';
import { updateEventLikeDislike, joinEvent, leaveEvent } from '@/lib/dbActions';
import type { EventCardData } from '@/app/lib/EventCardData';

type CardGridProps = {
  initialEvents: EventCardData[];
  currentUserEmail?: string | null;
  currentUserRole?: string;
  showEditDelete?: boolean;
  showAddEvent?: boolean;
  showRemoveEvent?: boolean;
  onEventRemoved?: () => void;
};

const CardGrid = ({
  initialEvents,
  currentUserEmail = null,
  currentUserRole = 'USER',
  showEditDelete = false,
  showAddEvent = false,
  showRemoveEvent = false,
  onEventRemoved,
}: CardGridProps) => {
  const { status } = useSession();
  const [events, setEvents] = useState<EventCardData[]>(initialEvents);
  const [likes, setLikes] = useState<Record<number, number>>(
    initialEvents.reduce((acc, event) => ({
      ...acc,
      [event.id]: event.userVote,
    }), {} as Record<number, number>),
  );
  const [updatingEventId, setUpdatingEventId] = useState<number | null>(null);
  const [joiningEventId, setJoiningEventId] = useState<number | null>(null);
  const [joinedEventIds, setJoinedEventIds] = useState<Set<number>>(
    new Set(
      initialEvents
        .filter(event => event.participants.some(p => p.email === currentUserEmail))
        .map(event => event.id),
    ),
  );
  const [removingEventId, setRemovingEventId] = useState<number | null>(null);
  const [removedEventIds, setRemovedEventIds] = useState<Set<number>>(new Set());
  const userCanVote = status === 'authenticated';

  useEffect(() => {
    setJoinedEventIds(new Set(
      initialEvents
        .filter(event => event.participants.some(p => p.email === currentUserEmail))
        .map(event => event.id),
    ));
  }, [initialEvents, currentUserEmail]);

  const getNewLikeValue = (currentValue: number, value: number): number => {
    if (value !== 1 && value !== 2) {
      return 0;
    }
    if (currentValue === value) {
      return 0;
    }
    return value;
  };

  const updateEventCounts = (
    oldEvents: EventCardData[],
    eventId: number,
    oldValue: number,
    newValue: number,
  ) => oldEvents.map((event) => {
    if (event.id !== eventId) {
      return event;
    }

    let newLikeCount = event.upvotes;
    let newDislikeCount = event.downvotes;

    if (oldValue === 1) {
      newLikeCount -= 1;
    } else if (oldValue === 2) {
      newDislikeCount -= 1;
    }

    if (newValue === 1) {
      newLikeCount += 1;
    } else if (newValue === 2) {
      newDislikeCount += 1;
    }

    return {
      ...event,
      upvotes: newLikeCount,
      downvotes: newDislikeCount,
      userVote: newValue,
    };
  });

  async function handleLike(eventId: number, value: number) {
    if (!userCanVote || updatingEventId === eventId) {
      return;
    }

    const oldValue = likes[eventId] || 0;
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
      const updatedEvent = await updateEventLikeDislike(eventId, newValue);

      setEvents((prevEvents) => prevEvents.map((event) => {
        if (event.id !== eventId) {
          return event;
        }

        return {
          ...event,
          upvotes: updatedEvent.upvotes,
          downvotes: updatedEvent.downvotes,
          userVote: updatedEvent.userVote,
        };
      }));

      setLikes((prevLikes) => ({
        ...prevLikes,
        [eventId]: updatedEvent.userVote,
      }));
    } catch {
      setEvents(oldEvents);
      setLikes(oldLikes);
    } finally {
      setUpdatingEventId(null);
    }
  }

  async function handleAddEvent(eventId: number) {
    if (!currentUserEmail || joiningEventId === eventId) return;
    setJoiningEventId(eventId);
    try {
      await joinEvent(eventId, currentUserEmail);
      setJoinedEventIds(prev => new Set([...prev, eventId]));
      setRemovedEventIds(prev => { const next = new Set(prev); next.delete(eventId); return next; });
    } finally {
      setJoiningEventId(null);
    }
  }

  async function handleRemoveEvent(eventId: number) {
    if (!currentUserEmail || removingEventId === eventId) return;
    setRemovingEventId(eventId);
    try {
      await leaveEvent(eventId, currentUserEmail);
      setRemovedEventIds(prev => new Set([...prev, eventId]));
      setJoinedEventIds(prev => { const next = new Set(prev); next.delete(eventId); return next; });
      onEventRemoved?.();
    } finally {
      setRemovingEventId(null);
    }
  }

  const visibleEvents = showRemoveEvent
    ? events.filter(event => !removedEventIds.has(event.id))
    : events;

  return (
    <Row xs={1} md={2} lg={4} className="g-2">
      {visibleEvents.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          onLikeClick={handleLike}
          likeVal={likes[event.id] || 0}
          disabled={!userCanVote || updatingEventId === event.id}
          currentUserEmail={currentUserEmail}
          currentUserRole={currentUserRole}
          showEditDelete={showEditDelete}
          showAddEvent={showAddEvent}
          onAddEvent={handleAddEvent}
          alreadyJoined={joinedEventIds.has(event.id)}
          joiningThisEvent={joiningEventId === event.id}
          showRemoveEvent={showRemoveEvent}
          onRemoveEvent={handleRemoveEvent}
          removingThisEvent={removingEventId === event.id}
        />
      ))}
    </Row>
  );
};

export default CardGrid;
