'use client';

/* eslint-disable import/extensions */

import { Card, Col, Button } from 'react-bootstrap';
import Link from 'next/link';
import type { EventCardData } from '@/app/lib/EventCardData';

type Props = {
  event: EventCardData;
};

const AdminEventCard = ({ event }: Props) => {
  const shortDescription = event.description == null
    ? 'N/A'
    : event.description.substring(0, 100) + (event.description.length > 100 ? '...' : '');

  return (
    <Col>
      <Card className="h-100">
        {event.picture ? (
          <Card.Img
            variant="top"
            src={event.picture}
            alt={`${event.name} picture`}
            style={{ objectFit: 'contain', height: '160px', backgroundColor: '#f8f9fa' }}
          />
        ) : (
          <div style={{ height: '160px', background: '#e9ecef' }} />
        )}
        <Card.Body className="d-flex flex-column">
          <Card.Title>{event.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{event.eventDate}</Card.Subtitle>
          <Card.Text>
            <strong>Location: </strong>
            {event.location}
          </Card.Text>
          <Card.Text>
            <strong>Owner(s): </strong>
            {event.owner.join(', ')}
          </Card.Text>
          <Card.Text>
            <strong>Description: </strong>
            {shortDescription}
          </Card.Text>
          <Card.Text>
            <strong>Start Time: </strong>
            {event.startTime}
          </Card.Text>
          <Card.Text>
            <strong>End Time: </strong>
            {event.endTime}
          </Card.Text>
          <div className="mt-auto pt-3 d-flex gap-2">
            <Link href={`/editEvent/${event.id}?from=admin`} className="flex-fill">
              <Button variant="secondary" size="lg" className="w-100" style={{ fontSize: '0.8rem' }}>
                Edit Event
              </Button>
            </Link>
            <Button
              variant="danger"
              size="lg"
              className="flex-fill"
              href={`/admin/delete/${event.id}`}
              style={{ fontSize: '0.8rem' }}
            >
              Delete Event
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default AdminEventCard;
