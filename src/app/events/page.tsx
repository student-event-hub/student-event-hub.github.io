/* eslint-disable import/extensions */
/* eslint-disable react/jsx-no-bind */

import { Button, Container, Form } from 'react-bootstrap';
import { FunnelFill, Search } from 'react-bootstrap-icons';
import { PageIDs } from '@/utilities/ids';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import pageStyle from '@/utilities/pageStyle';
import type { EventCardData, LikeValue } from '@/app/lib/EventCardData';
import CardGrid from './CardGrid';

const EventsPage = async () => {
  const events = await prisma.event.findMany();
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
      <CardGrid initialEvents={events} />
    </Container>
  );
};

export default EventsPage;
