'use client';

import React from 'react';
import { Form, Button, Col, Container, Card, Row } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import swal from 'sweetalert';
import Multiselect from 'multiselect-react-dropdown';
import { Interest, User } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { EditEventSchema, IEditEvent } from '@/lib/validationSchemas';
import { upsertEvent } from '@/lib/dbActions';

type EventWithInterests = {
  id: number;
  name: string;
  description: string | null;
  picture: string | null;
  location: string;
  owner: string[];
  startTime: Date;
  endTime: Date;
  interests: { interest: { name: string } }[];
};

type Props = {
  event: EventWithInterests;
  interests: Interest[];
  participants: User[];
  redirectTo?: string;
};

const EditEventForm = ({ event, interests, participants, redirectTo = '/events' }: Props) => {
  const router = useRouter();
  const formPadding = 'py-1';
  const interestNames = interests.map((i) => i.name);
  const participantEmails = participants.map((p) => p.email);

  const date = event.startTime.toISOString().split('T')[0];
  const startTime = event.startTime.toISOString().split('T')[1].substring(0, 5);
  const endTime = event.endTime.toISOString().split('T')[1].substring(0, 5);
  const existingInterests = event.interests.map((ei) => ei.interest.name);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IEditEvent>({
    resolver: yupResolver(EditEventSchema),
    defaultValues: {
      id: event.id,
      name: event.name,
      description: event.description ?? '',
      picture: event.picture ?? '',
      location: event.location,
      owner: event.owner.join(', '),
      date,
      startTime,
      endTime,
      interests: existingInterests,
    },
  });

  const onSubmit = async (data: IEditEvent) => {
    try {
      await upsertEvent({ ...data, id: Number(data.id) });
      swal('Success!', 'Event updated successfully!', 'success');
      setTimeout(() => router.push(redirectTo), 1500);
    } catch {
      swal('Error!', 'Failed to update event!', 'error');
    }
  };

  return (
    <Container>
      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" {...register('id')} />
            <Row className={formPadding}>
              <Col xs={6}>
                <Form.Group controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" {...register('name')} />
                  <Form.Text className="text-danger">{errors.name?.message}</Form.Text>
                </Form.Group>
              </Col>
              <Col xs={6}>
                <Form.Group controlId="location">
                  <Form.Label>Location</Form.Label>
                  <Form.Control type="text" {...register('location')} />
                  <Form.Text className="text-danger">{errors.location?.message}</Form.Text>
                </Form.Group>
              </Col>
            </Row>
            <Row className={formPadding}>
              <Col xs={4}>
                <Form.Group controlId="date">
                  <Form.Label>Date</Form.Label>
                  <Form.Control type="date" {...register('date')} />
                  <Form.Text className="text-danger">{errors.date?.message}</Form.Text>
                </Form.Group>
              </Col>
              <Col xs={4}>
                <Form.Group controlId="startTime">
                  <Form.Label>Start Time</Form.Label>
                  <Form.Control type="time" {...register('startTime')} />
                  <Form.Text className="text-danger">{errors.startTime?.message}</Form.Text>
                </Form.Group>
              </Col>
              <Col xs={4}>
                <Form.Group controlId="endTime">
                  <Form.Label>End Time</Form.Label>
                  <Form.Control type="time" {...register('endTime')} />
                  <Form.Text className="text-danger">{errors.endTime?.message}</Form.Text>
                </Form.Group>
              </Col>
            </Row>
            <Row className={formPadding}>
              <Col xs={6}>
                <Form.Group controlId="owner">
                  <Form.Label>Owner</Form.Label>
                  <Form.Control type="text" placeholder="Enter owner name" {...register('owner')} />
                  <Form.Text className="text-danger">{errors.owner?.message}</Form.Text>
                </Form.Group>
              </Col>
              <Col xs={6}>
                <Form.Group controlId="picture">
                  <Form.Label>Picture URL</Form.Label>
                  <Form.Control type="text" {...register('picture')} />
                  <Form.Text muted>(optional)</Form.Text>
                </Form.Group>
              </Col>
            </Row>
            <Row className={formPadding}>
              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Describe the event here."
                  {...register('description')}
                />
                <Form.Text muted>(optional)</Form.Text>
              </Form.Group>
            </Row>
            <Row className={formPadding}>
              <Col xs={6}>
                <Form.Group controlId="interests">
                  <Form.Label>Interests</Form.Label>
                  <Controller
                    control={control}
                    name="interests"
                    render={({ field: { value, onChange } }) => (
                      <Multiselect
                        options={interestNames}
                        isObject={false}
                        showCheckbox
                        hidePlaceholder
                        closeOnSelect={false}
                        onSelect={onChange}
                        onRemove={onChange}
                        selectedValues={value}
                      />
                    )}
                  />
                </Form.Group>
              </Col>
              <Col xs={6}>
                <Form.Group controlId="participants">
                  <Form.Label>Participants</Form.Label>
                  <Controller
                    control={control}
                    name="participants"
                    render={({ field: { value, onChange } }) => (
                      <Multiselect
                        options={participantEmails}
                        isObject={false}
                        showCheckbox
                        hidePlaceholder
                        closeOnSelect={false}
                        onSelect={onChange}
                        onRemove={onChange}
                        selectedValues={value}
                      />
                    )}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button variant="primary" type="submit" className="mt-2">
              Update Event
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

EditEventForm.defaultProps = {
  redirectTo: '/events',
};

export default EditEventForm;
