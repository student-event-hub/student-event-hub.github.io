/* eslint-disable import/extensions */
/* eslint-disable react/jsx-no-bind */
import { Button, Container, Form } from 'react-bootstrap';
import { FunnelFill, Search } from 'react-bootstrap-icons';
import { PageIDs } from '@/utilities/ids';
import { prisma } from '@/lib/prisma';
import pageStyle from '@/utilities/pageStyle';
import type { EventCardData } from '@/app/lib/EventCardData';
import CardGrid from './CardGrid';

export const dynamic = 'force-dynamic';

const EventsPage = async () => {
  const events = await prisma.event.findMany({
    include: {
      interests: {
        include: {
          interest: true,
        },
      },
      ProfileEvent: {
        include: {
          profile: true,
        },
      },
    },
  });

  const eventData: EventCardData[] = events.map((event) => ({
    id: event.id,
    name: event.name,
    owner: event.owner,
    picture: event.picture,
    eventDate: event.startTime.toLocaleDateString(),
    startTime: event.startTime.toLocaleTimeString(),
    endTime: event.endTime.toLocaleTimeString(),
    description: event.description,
    location: event.location,
    upvotes: event.upvotes,
    downvotes: event.downvotes,
    interests: event.interests.map((eventInterest) => eventInterest.interest.name),
    participants: event.ProfileEvent.map((eventParticipant) => eventParticipant.profile),
  }));

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
      <CardGrid initialEvents={eventData} />
    </Container>
  );
};

export default EventsPage;
