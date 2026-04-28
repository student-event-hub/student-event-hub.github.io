/* eslint-disable import/extensions */

'use client';

import { useState } from 'react';
import { Button, Container, Form, Row } from 'react-bootstrap';
import { FunnelFill, Search } from 'react-bootstrap-icons';
import { PageIDs } from '@/utilities/ids';
import pageStyle from '@/utilities/pageStyle';
import { prisma } from '@/lib/prisma';
import EventCardHelper from '@/components/EventCardHelper';

const events = await prisma.event.findMany();
const EventsPage = () => {
  const likesList = Array(events.length).fill('0');
  function handleLike(n: string, e: any) {
    if (n === likesList[e.id]) {
      likesList[e.id] = '0';
    } else {
      likesList[e.id] = n;
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
          <EventCardHelper
            key={event.id}
            event={event}
            likeVal={likesList[event.id]}
            onLikeClick={(n: string) => handleLike(n, event)}
          />
        ))}
      </Row>
    </Container>
  );
};
export default EventsPage;
