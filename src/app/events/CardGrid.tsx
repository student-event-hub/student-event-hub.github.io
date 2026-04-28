/* eslint-disable import/extensions */
/* eslint-disable react/jsx-no-bind */

'use client';

import { useState } from 'react';
import { Row } from 'react-bootstrap';
import EventCardHelper from '@/components/EventCardHelper';
import { Event } from '@prisma/client';

const CardGrid = ({ initialEvents }: { initialEvents: Event[] }) => {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [likes, setLikes] = useState(Array(events.length).fill('0'));
  function handleLike(eventId: number, value: string) {
    setEvents((prevEvents) => prevEvents.map((event) => {
      if (event.id !== eventId) {
        return event;
      }

      let newLikeCount = event.upvotes;
      let newDislikeCount = event.downvotes;

      if (likes[event.id] === '1') {
        newLikeCount -= 1;
      } else if (likes[event.id] === '2') {
        newDislikeCount -= 1;
      }

      if (value === '1') {
        newLikeCount += 1;
      } else if (value === '2') {
        newDislikeCount += 1;
      }

      return {
        ...event,
        upvotes: newLikeCount,
        downvotes: newDislikeCount,
      };
    }));
    setLikes((prevLikes) => prevLikes.map((event) => {
      if (event.id !== eventId) {
        return event;
      }

      let newLiked = value;
      if (likes[event.id] === value) {
        newLiked = '0';
      }

      return {
        ...event,
        liked: newLiked,
      };
    }));
  }

  return (
    <Row xs={1} md={2} lg={4} className="g-2">
      {events.map((event) => (
        <EventCardHelper
          key={event.id}
          event={event}
          onLikeClick={(v: string) => handleLike(event.id, v)}
          likeVal={likes[event.id]}
        />
      ))}
    </Row>
  );
};

export default CardGrid;
