/* eslint-disable import/extensions */

'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Form, Button, Col, Container, Card, Row } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import swal from 'sweetalert';
import Multiselect from 'multiselect-react-dropdown';
import { User } from '@prisma/client';
import { EditProjectSchema } from '@/lib/validationSchemas';
import { updateEvent } from '@/lib/dbActions';

type EventData = {
  id: number;
  name: string;
  description: string | null;
  location: string;
  startTime: string;
  endTime: string;
  originalStartISO: string;
  originalEndISO: string;
  owner: string[];
  picture: string | null;
} | null;

const EditProjectForm = ({ participants, event }: { participants: User[]; event: EventData }) => {
  const router = useRouter();
  const formPadding = 'py-1';
  const participantNames = participants.map((participant) => participant.email);
  const categories = ['STEM', 'Art', 'Music', 'Sports', 'Technology', 'Business', 'Health', 'Social'];

  const buildValues = (e: typeof event) => (e ? {
    name: e.name,
    description: e.description ?? '',
    location: e.location,
    startTime: e.startTime,
    endTime: e.endTime,
    owners: e.owner,
    picture: e.picture ?? '',
    names: '',
    category: '',
  } : {
    name: '',
    description: '',
    location: '',
    startTime: '',
    endTime: '',
    owners: [] as string[],
    picture: '',
    names: '',
    category: '',
  });

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(EditProjectSchema),
    defaultValues: buildValues(event),
  });

  useEffect(() => {
    reset(buildValues(event));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event]);

  const onSubmit = async (data: any) => {
    if (!event) return;
    try {
      await updateEvent(event.id, data, event.originalStartISO, event.originalEndISO);
      await swal('Success!', 'Event updated successfully!', 'success');
      router.refresh();
      router.back();
    } catch {
      swal('Error!', 'Failed to update event!', 'error');
    }
  };

  return (
    <Container>
      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className={formPadding}>
              <Form.Group controlId="name">
                <Form.Label>Name of Event</Form.Label>
                <Form.Control type="text" {...register('name')} />
                <Form.Text className="text-danger">{errors.name?.message}</Form.Text>
              </Form.Group>
            </Row>
            <Row className={formPadding}>
              <Form.Group controlId="location">
                <Form.Label>Location</Form.Label>
                <Form.Control type="text" {...register('location')} />
                <Form.Text className="text-danger">{errors.location?.message}</Form.Text>
              </Form.Group>
            </Row>
            <Row className={formPadding}>
              <Col xs={6}>
                <Form.Group controlId="startTime">
                  <Form.Label>Start Time</Form.Label>
                  <Form.Control type="time" {...register('startTime')} />
                  <Form.Text className="text-danger">{errors.startTime?.message}</Form.Text>
                </Form.Group>
              </Col>
              <Col xs={6}>
                <Form.Group controlId="endTime">
                  <Form.Label>End Time</Form.Label>
                  <Form.Control type="time" {...register('endTime')} />
                  <Form.Text className="text-danger">{errors.endTime?.message}</Form.Text>
                </Form.Group>
              </Col>
            </Row>

            <Row className={formPadding}>
              <Col xs={6}>
                <Form.Group controlId="owners">
                  <Form.Label>Owner(s)</Form.Label>
                  <Controller
                    control={control}
                    name="owners"
                    render={({ field: { value, onChange } }) => (
                      <Multiselect
                        options={participantNames}
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
                <Form.Group controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control as="textarea" placeholder="Describe the project here." {...register('description')} />
                  <Form.Text muted>(optional)</Form.Text>
                </Form.Group>
              </Col>
            </Row>
            <Row className={formPadding}>
              <Col xs={6}>
                <Form.Group controlId="names">
                  <Form.Label>Names</Form.Label>
                  <Form.Control type="text" {...register('names')} />
                  <Form.Text className="text-danger">{errors.names?.message}</Form.Text>
                </Form.Group>
              </Col>
              <Col xs={6}>
                <Form.Group controlId="category">
                  <Form.Label>Category</Form.Label>
                  <Controller
                    control={control}
                    name="category"
                    render={({ field: { value, onChange } }) => (
                      <Multiselect
                        options={categories}
                        isObject={false}
                        singleSelect
                        hidePlaceholder
                        onSelect={onChange}
                        onRemove={onChange}
                        selectedValues={value}
                      />
                    )}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className={formPadding}>
              <Col xs={12}>
                <Form.Group controlId="picture">
                  <Form.Label>Picture/Logo</Form.Label>
                  <Form.Control type="text" {...register('picture')} />
                  <Form.Text className="text-danger">{errors.picture?.message}</Form.Text>
                  <Form.Text muted>(optional)</Form.Text>
                </Form.Group>
              </Col>
            </Row>
            <Button variant="primary" type="submit">
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EditProjectForm;
