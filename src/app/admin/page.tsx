/* eslint-disable import/extensions */

import { Button, Container, Form } from 'react-bootstrap';
import { FunnelFill, Search } from 'react-bootstrap-icons';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { adminProtectedPage } from '@/lib/page-protection';
import pageStyle from '@/utilities/pageStyle';
import { PageIDs } from '@/utilities/ids';
import type { EventCardData } from '@/app/lib/EventCardData';
import AdminCardGrid from './AdminCardGrid';

export const dynamic = 'force-dynamic';

const AdminPage = async () => {
  const session = await auth();
  adminProtectedPage(session);

  const events = await prisma.event.findMany({
    include: {
      interests: { include: { interest: true } },
      ProfileEvent: { include: { profile: true } },
    },
  });

  const eventData: EventCardData[] = events.map((event) => ({
    id: event.id,
    name: event.name,
    owner: event.owner,
    picture: event.picture,
    eventDate: event.startTime.toLocaleDateString(),
    startTime: event.startTime.toLocaleTimeString('en-US', {
      timeZone: 'UTC', hour: 'numeric', minute: '2-digit', hour12: true,
    }),
    endTime: event.endTime.toLocaleTimeString('en-US', {
      timeZone: 'UTC', hour: 'numeric', minute: '2-digit', hour12: true,
    }),
    description: event.description,
    location: event.location,
    upvotes: event.upvotes,
    downvotes: event.downvotes,
    userVote: 0,
    interests: event.interests.map((ei) => ei.interest.name),
    participants: event.ProfileEvent.map((pe) => pe.profile),
  }));

  return (
    <Container id={PageIDs.adminPage} style={pageStyle}>
      <h2 className="mb-3">Admin Panel</h2>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '20px',
          gap: '12px',
        }}
      >
        <Button variant="outline-dark" disabled>
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
            disabled
            style={{
              border: 'none',
              boxShadow: 'none',
              paddingLeft: 0,
            }}
          />
        </div>
      </div>
      <AdminCardGrid events={eventData} />
    </Container>
  );
};

export default AdminPage;
