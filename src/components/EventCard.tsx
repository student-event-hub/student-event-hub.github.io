/* eslint-disable import/extensions */

'use client';

import { Badge, Card, Col } from 'react-bootstrap';
import TooltipImage from '@/components/TooltipImage';
import { EventCardData } from '@/lib/EventCardData';

const EventCard = ({ event }: { event: EventCardData }) => (
  <Col>
    <Card className="h-100">
      <Card.Body>
        <Card.Img src={event.picture ? event.picture : ''} width={50} />
        <Card.Title style={{ marginTop: '0px' }}>{event.name}</Card.Title>
        <Card.Text>{event.description}</Card.Text>
      </Card.Body>
      <Card.Body>
        {event.interests.map((interest) => (
          <Badge className="mx-1" key={interest} bg="info">
            {interest}
          </Badge>
        ))}
      </Card.Body>
      <Card.Body>
        {event.participants.map((p) => (
          <TooltipImage
            className="mx-1"
            key={p.email}
            name={p.email}
            roundedCircle
            src={p.picture ? p.picture : ''}
            width={50}
          />
        ))}
      </Card.Body>
    </Card>
  </Col>
);

export default EventCard;
