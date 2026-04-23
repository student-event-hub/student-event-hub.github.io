/* eslint-disable import/extensions */

'use client';

import { Card, Col, Button } from 'react-bootstrap';

type Event = {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
};

type Props = {
  event: Event;
};

const EventCard = ({ event }: Props) => (
  <Col>
    <Card>
      <Card.Body>
        <Card.Title>{event.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {event.date}
        </Card.Subtitle>

        <Card.Text>
          <strong>Location:</strong>
          {event.location}
        </Card.Text>

        <Card.Text>{event.description}</Card.Text>

        <div className="d-flex gap-2 mt-3">
          <Button variant="secondary" size="sm" className="flex-fill">
            Edit Event
          </Button>
          <Button variant="primary" size="sm" className="flex-fill">
            View Details
          </Button>
          <Button variant="success" size="sm" className="flex-fill">
            Add Event
          </Button>
        <div className="d-flex justify-content-between">
          <Button variant="secondary">Edit Event</Button>
          <Button variant="primary">View Details</Button>
        </div>
      </Card.Body>
    </Card>
  </Col>
);

export default EventCard;
