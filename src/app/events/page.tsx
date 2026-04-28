/* eslint-disable import/extensions */
/* eslint-disable react/jsx-no-bind */

'use client';

import { useEffect, useState } from 'react';
import { Button, Container, Form, Row } from 'react-bootstrap';
import { FunnelFill, Search } from 'react-bootstrap-icons';
import { PageIDs } from '@/utilities/ids';
import pageStyle from '@/utilities/pageStyle';
import EventCardHelper from '@/components/EventCardHelper';
import { Event } from '@prisma/client';
import { getAllEvents } from '../lib/dbActions';

let initialEvents: Event[] = [];

const EventsPage = () => {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [likes, setLikes] = useState(Array(events.length).fill('0'));
  useEffect(() => {
    const fetchData = async () => {
      getAllEvents().then(
        function (value) {
          initialEvents = value;
        },
      );
    };
    fetchData();
    setEvents(initialEvents);
    setLikes(Array(initialEvents.length).fill('0'));
  }, []);
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
          <EventCardHelper
            key={event.id}
            event={event}
            onLikeClick={(v: string) => handleLike(event.id, v)}
            likeVal={likes[event.id]}
          />
        ))}
      </Row>
    </Container>
  );
};

export default EventsPage;
