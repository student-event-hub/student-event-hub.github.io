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

        <div className="d-flex justify-content-between">
          <Button variant="secondary">Edit Event</Button>
          <Button variant="primary">View Details</Button>
        </div>
      </Card.Body>
    </Card>
  </Col>
);

export default EventCard;
