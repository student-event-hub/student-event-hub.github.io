/* eslint-disable import/extensions */
/* eslint-disable react/no-array-index-key */

'use client';

import { Card, Col, Button, ToggleButton, Stack } from 'react-bootstrap';
import { HandThumbsDown, HandThumbsUp } from 'react-bootstrap-icons';

export type Event = {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
  liked: string;
  likeCount: number;
  dislikeCount: number;
};

type Props = {
  event: Event;
  onLikeClick: (eventId: number, value: string) => void;
};

const EventCard = ({ event, onLikeClick }: Props) => {
  const likeDislike: { name: string; value: string; variant: string; icon: typeof HandThumbsUp }[] = [
    { name: 'Like', value: '1', variant: 'outline-primary', icon: HandThumbsUp },
    { name: 'Dislike', value: '2', variant: 'outline-danger', icon: HandThumbsDown },
  ];

  return (
    <Col>
      <Card>
        <Card.Body>
          <Card.Title>
            <Stack direction="horizontal">
              <div>{event.title}</div>
              <div className="ms-auto">
                {likeDislike.map((radio) => (
                  <ToggleButton
                    key={radio.value}
                    id={`${event.id}-${radio.name}`}
                    type="radio"
                    variant={radio.variant}
                    name={`like-dislike-${event.id}`}
                    value={radio.value}
                    checked={event.liked === radio.value}
                    onChange={(e) => onLikeClick(event.id, e.currentTarget.value)}
                    className="justify-content-left"
                  >
                    <radio.icon />
                    {' '}
                    {radio.value === '1' ? event.likeCount : event.dislikeCount}
                  </ToggleButton>
                ))}
              </div>
            </Stack>
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{event.date}</Card.Subtitle>
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
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default EventCard;
