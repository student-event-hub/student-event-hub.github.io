'use client';

/* eslint-disable import/extensions */
/* eslint-disable react/jsx-no-bind */

import { useMemo, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { FunnelFill, Search } from 'react-bootstrap-icons';
import type { EventCardData } from '@/app/lib/EventCardData';
import CardGrid from './CardGrid';

type EventSearchProps = {
  initialEvents: EventCardData[];
};

const EventSearch = ({ initialEvents }: EventSearchProps) => {
  const [searchText, setSearchText] = useState('');

  const filteredEvents = useMemo(() => {
    const searchValue = searchText.trim().toLowerCase();

    if (!searchValue) {
      return initialEvents;
    }

    return initialEvents.filter((event) => [
      event.name,
      event.description,
      event.location,
      event.eventDate,
      event.startTime,
      event.endTime,
      event.owner.join(' '),
      event.interests.join(' '),
    ].join(' ').toLowerCase().includes(searchValue));
  }, [initialEvents, searchText]);

  return (
    <>
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
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            style={{
              border: 'none',
              boxShadow: 'none',
              paddingLeft: 0,
            }}
          />
        </div>
      </div>
      <CardGrid key={searchText} initialEvents={filteredEvents} />
    </>
  );
};

export default EventSearch;
