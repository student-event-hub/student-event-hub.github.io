/* eslint-disable import/extensions */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/require-default-props */

import { Card, Col, Button, ToggleButton, Stack } from 'react-bootstrap';
import Link from 'next/link';
import { HandThumbsDown, HandThumbsUp } from 'react-bootstrap-icons';
import type { EventCardData } from '@/app/lib/EventCardData';

type Props = {
  event: EventCardData;
  likeVal: number;
  onLikeClick: (eventId: number, value: number) => void;
  disabled: boolean;
  currentUserEmail?: string | null;
  currentUserRole?: string;
  showEditDelete?: boolean;
  showAddEvent?: boolean;
  onAddEvent?: (eventId: number) => void;
  alreadyJoined?: boolean;
  joiningThisEvent?: boolean;
  showRemoveEvent?: boolean;
  onRemoveEvent?: (eventId: number) => void;
  removingThisEvent?: boolean;
};

const EventCard = ({
  event, likeVal, onLikeClick, disabled,
  currentUserEmail = null, currentUserRole = 'USER',
  showEditDelete = false, showAddEvent = false,
  onAddEvent, alreadyJoined = false, joiningThisEvent = false,
  showRemoveEvent = false, onRemoveEvent, removingThisEvent = false,
}: Props) => {
  const canEditDelete = showEditDelete && (currentUserEmail === event.creator || currentUserRole === 'ADMIN');
  const likeDislike: { name: string; value: number; variant: string; icon: typeof HandThumbsUp }[] = [
    { name: 'Like', value: 1, variant: 'outline-primary', icon: HandThumbsUp },
    { name: 'Dislike', value: 2, variant: 'outline-danger', icon: HandThumbsDown },
  ];

  return (
    <Col>
      <Card className="h-100">
        <Card.Body className="d-flex flex-column">
          <Card.Title>
            <Stack direction="horizontal">
              <div>{event.name}</div>
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
                    disabled={disabled}
                    onChange={(e) => onLikeClick(event.id, parseInt(e.currentTarget.value, 10))}
                    className="justify-content-left"
                  >
                    <radio.icon />
                    {' '}
                    {radio.value === 1 ? event.upvotes : event.downvotes}
                  </ToggleButton>
                ))}
              </div>
            </Stack>
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{`${event.eventDate}`}</Card.Subtitle>
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
          {event.picture && (
            <Card.Img
              variant="bottom"
              src={event.picture}
              alt={`${event.name} picture`}
              style={{ objectFit: 'contain', height: '180px', backgroundColor: '#f8f9fa' }}
            />
          )}
          {(showAddEvent || canEditDelete || (showRemoveEvent && !canEditDelete)) && (
            <div className="mt-auto pt-3">
              {showAddEvent && (
                <div className="d-flex gap-2">
                  <Button
                    variant={alreadyJoined ? 'outline-success' : 'success'}
                    size="sm"
                    className="flex-fill"
                    disabled={alreadyJoined || joiningThisEvent || !currentUserEmail}
                    onClick={() => onAddEvent?.(event.id)}
                  >
                    {alreadyJoined ? 'Added' : joiningThisEvent ? 'Adding...' : 'Add Event'}
                  </Button>
                </div>
              )}
              {canEditDelete && (
                <div className="d-flex gap-2 mb-2">
                  <Link href={`/editEvent/${event.id}`} className="flex-fill">
                    <Button variant="secondary" size="sm" className="w-100">Edit Event</Button>
                  </Link>
                  <Link href={`/deleteEvent/${event.id}`} className="flex-fill">
                    <Button variant="danger" size="sm" className="w-100">Delete Event</Button>
                  </Link>
                </div>
              )}
              {showRemoveEvent && !canEditDelete && (
                <Button
                  variant="outline-danger"
                  size="sm"
                  className="w-100"
                  disabled={removingThisEvent}
                  onClick={() => onRemoveEvent?.(event.id)}
                >
                  {removingThisEvent ? 'Removing...' : 'Remove from Your Events'}
                </Button>
              )}
            </div>
          )}
        </Card.Body>
      </Card>
    </Col>
  );
};

export default EventCard;
