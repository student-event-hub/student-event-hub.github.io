'use client';

/* eslint-disable import/extensions */
/* eslint-disable no-nested-ternary */

import { useState } from 'react';
import type { EventCardData } from '@/app/lib/EventCardData';
import CardGrid from '../events/CardGrid';

type Props = {
  profileFirstName: string | null;
  profileLastName: string | null;
  initialEvents: EventCardData[];
  pastEvents: EventCardData[];
  currentUserEmail: string | null;
  currentUserRole: string;
};

const YourEventsClient = ({
  profileFirstName,
  profileLastName,
  initialEvents,
  pastEvents,
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
          {count > 1 ? `You have ${count} upcoming events.`
            : count > 0 ? 'You have 1 upcoming event'
              : 'You have no upcoming events. You should add some.'}
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

      <h2 style={{ marginBottom: '20px', marginTop: '40px' }}>Past Events</h2>

      <div
        className="border rounded"
        style={{
          minHeight: '300px',
          padding: '24px',
          backgroundColor: 'white',
        }}
      >
        <CardGrid
          initialEvents={pastEvents}
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
