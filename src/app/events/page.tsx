/* eslint-disable import/extensions */

'use client';

import { useState } from 'react';
import { Button, Container, Form, Row } from 'react-bootstrap';
import { FunnelFill, Search } from 'react-bootstrap-icons';
import { PageIDs } from '@/utilities/ids';
import pageStyle from '@/utilities/pageStyle';
import EventsCard, { Event } from '@/components/EventCard';

const events = [
  {
    id: 1,
    title: 'Beach Cleanup',
    date: 'April 25, 2026',
    location: 'Ewa Beach Park',
    description: 'Join us to help clean up the beach and protect marine life.',
    liked: '0',
  },
  {
    id: 2,
    title: 'Tech Networking Night',
    date: 'May 2, 2026',
    location: 'Honolulu Tech Hub',
    description: 'Meet professionals and students in the tech industry.',
    liked: '0',
  },
  {
    id: 3,
    title: 'Food Festival',
    date: 'May 10, 2026',
    location: 'Waikiki',
    description: 'Enjoy local food, live music, and cultural performances.',
    liked: '0',
  },
];

const EventsPage = () => {
  const [likesList, setLikesList] = useState(Array(events.length).fill('0'));
  function handleLike(n: string, e: Event) {
    if (n === e.liked) {
      e.liked = '0';
      const nextLikes = likesList.slice();
      nextLikes[e.id] = '0';
      setLikesList(nextLikes);
    } else {
      e.liked = n;
      const nextLikes = likesList.slice();
      nextLikes[e.id] = n;
      setLikesList(nextLikes);
    }
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
            onLikeClick={(n: string) => handleLike(n, event)}
          />
        ))}
      </Row>
    </Container>
  );
};
export default EventsPage;
