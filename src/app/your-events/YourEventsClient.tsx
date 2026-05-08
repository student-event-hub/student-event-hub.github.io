'use client';

/* eslint-disable import/extensions */

import { useState } from 'react';
import type { EventCardData } from '@/app/lib/EventCardData';
import CardGrid from '../events/CardGrid';

type Props = {
  profileFirstName: string | null;
  profileLastName: string | null;
  initialEvents: EventCardData[];
  currentUserEmail: string | null;
  currentUserRole: string;
};

const YourEventsClient = ({
  profileFirstName,
  profileLastName,
  initialEvents,
  currentUserEmail,
  currentUserRole,
}: Props) => {
  const [count, setCount] = useState(initialEvents.length);

  return (
    <>
      <div
        className="border rounded"
        style={{
          marginBottom: '32px',
          padding: '24px',
          minHeight: '180px',
          backgroundColor: 'white',
        }}
      >
        <h1 style={{ fontSize: '2rem', marginBottom: '16px' }}>{`${profileFirstName} ${profileLastName}`}</h1>
        <p style={{ fontSize: '1.1rem', marginBottom: 0 }}>
          {`You have ${count} upcoming events.`}
        </p>
      </div>

      <h2 style={{ marginBottom: '20px' }}>Upcoming Events</h2>

      <div
        className="border rounded"
        style={{
          minHeight: '300px',
          padding: '24px',
          backgroundColor: 'white',
        }}
      >
        <CardGrid
          initialEvents={initialEvents}
          showEditDelete
          showRemoveEvent
          currentUserEmail={currentUserEmail}
          currentUserRole={currentUserRole}
          onEventRemoved={() => setCount((c) => c - 1)}
        />
      </div>
    </>
  );
};

export default YourEventsClient;
