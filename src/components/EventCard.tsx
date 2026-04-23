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
};

type Props = {
  event: Event;
  onLikeClick: Function;
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
              <div>
                {event.title}
              </div>
              <div className="ms-auto">
                {likeDislike.map((radio, idx) => (
                  <ToggleButton
                    key={idx}
                    id={radio.name}
                    type="radio"
                    variant={radio.variant}
                    name={radio.name}
                    value={radio.value}
                    checked={event.liked === radio.value}
                    onChange={(e) => onLikeClick(e.currentTarget.value)}
                    className="justify-content-left"
                  >
                    <radio.icon />
                  </ToggleButton>
                ))}
              </div>
            </Stack>
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {event.date}
          </Card.Subtitle>
          <Card.Text>
            <strong>Location:</strong>
            {' '}
            {event.location}
          </Card.Text>
          <Card.Text>{event.description}</Card.Text>
          <Button variant="primary">View Details</Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default EventCard;
