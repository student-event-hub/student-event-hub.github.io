/* eslint-disable import/extensions */
/* eslint-disable react/jsx-no-bind */

'use client';

import { useState } from 'react';
import { Button, Container, Form, Row } from 'react-bootstrap';
import { FunnelFill, Search } from 'react-bootstrap-icons';
import { PageIDs } from '@/utilities/ids';
import pageStyle from '@/utilities/pageStyle';
import EventsCard, { Event } from '@/components/EventCard';

const initialEvents: Event[] = [
  {
    id: 1,
    title: 'Beach Cleanup',
    date: 'April 25, 2026',
    location: 'Ewa Beach Park',
    description: 'Join us to help clean up the beach and protect marine life.',
    liked: '0',
    likeCount: 1,
    dislikeCount: 2,
  },
  {
    id: 2,
    title: 'Tech Networking Night',
    date: 'May 2, 2026',
    location: 'Honolulu Tech Hub',
    description: 'Meet professionals and students in the tech industry.',
    liked: '0',
    likeCount: 3,
    dislikeCount: 5,
  },
  {
    id: 3,
    title: 'Food Festival',
    date: 'May 10, 2026',
    location: 'Waikiki',
    description: 'Enjoy local food, live music, and cultural performances.',
    liked: '0',
    likeCount: 0,
    dislikeCount: 0,
  },
];

const EventsPage = () => {
  const [events, setEvents] = useState<Event[]>(initialEvents);

  function handleLike(eventId: number, value: string) {
    setEvents((prevEvents) => prevEvents.map((event) => {
      if (event.id !== eventId) {
        return event;
      }

      let newLikeCount = event.likeCount;
      let newDislikeCount = event.dislikeCount;
      let newLiked = value;

      if (event.liked === '1') {
        newLikeCount -= 1;
      } else if (event.liked === '2') {
        newDislikeCount -= 1;
      }

      if (event.liked === value) {
        newLiked = '0';
      } else if (value === '1') {
        newLikeCount += 1;
      } else if (value === '2') {
        newDislikeCount += 1;
      }

      return {
        ...event,
        liked: newLiked,
        likeCount: newLikeCount,
        dislikeCount: newDislikeCount,
      };
    }));
  }

  return (
    <Container id={PageIDs.allEventsPage} style={pageStyle}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '20px',
          gap: '12px',
        }}
      >
        <Button variant="outline-dark">
          <FunnelFill className="me-2" />
          Filter by
        </Button>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            border: '1px solid #ced4da',
            borderRadius: '6px',
            padding: '0 12px',
            width: '420px',
            marginLeft: 'auto',
            backgroundColor: 'white',
          }}
        >
          <Search />
          <Form.Control
            type="text"
            placeholder="Search events"
            style={{
              border: 'none',
              boxShadow: 'none',
              paddingLeft: 0,
            }}
          />
        </div>
      </div>
      <Row xs={1} md={2} lg={4} className="g-2">
        {events.map((event) => (
          <EventsCard
            key={event.id}
            event={event}
            onLikeClick={handleLike}
          />
        ))}
      </Row>
    </Container>
  );
};

export default EventsPage;
