/* eslint-disable import/extensions */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */

import { Card, Col, Button, ToggleButton, Stack } from 'react-bootstrap';
import Link from 'next/link';
import { HandThumbsDown, HandThumbsUp } from 'react-bootstrap-icons';
import { EventCardData } from '@/app/lib/EventCardData';

type Props = {
  event: EventCardData;
  likeVal: String;
  onLikeClick: Function;
};

const EventCard = ({ event, likeVal, onLikeClick }: Props) => {
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
                {event.name}
              </div>
              <div className="ms-auto">
                {likeDislike.map((radio) => (
                  <ToggleButton
                    key={radio.value}
                    id={`${event.id}-${radio.name}`}
                    type="radio"
                    variant={radio.variant}
                    name={`like-dislike-${event.id}`}
                    value={radio.value}
                    checked={likeVal === radio.value}
                    onChange={(e) => onLikeClick(event.id, e.currentTarget.value)}
                    className="justify-content-left"
                  >
                    <radio.icon />
                    {' '}
                    {radio.value === '1' ? event.upvotes : event.downvotes}
                  </ToggleButton>
                ))}
              </div>
            </Stack>
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {`${event.eventDate}`}
          </Card.Subtitle>
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
            {event.description === null
              ? 'N/A'
              : (event.description.length > 100 ? `${event.description.substring(0, 100)}...` : event.description)}
          </Card.Text>
          <Card.Text>
            <strong>Start Time: </strong>
            {event.startTime}
          </Card.Text>
          <Card.Text>
            <strong>End Time: </strong>
            {event.endTime}
          </Card.Text>
          <Card.Img
            variant="bottom"
            src={event.picture === null ? undefined : event.picture}
            alt={`${event.name} picture`}
            style={{ objectFit: 'cover', maxHeight: '300px' }}
          />
          <div className="d-flex gap-2 mt-3">
            <Link href={`/edit?id=${event.id}`}>
              <Button variant="secondary" size="sm" className="flex-fill">
                Edit Event
              </Button>
            </Link>
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
