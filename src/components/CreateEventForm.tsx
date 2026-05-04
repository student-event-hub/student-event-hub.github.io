/* eslint-disable import/extensions */

'use client';

import React from 'react';
import { Form, Button, Col, Container, Card, Row } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import swal from 'sweetalert';
import Multiselect from 'multiselect-react-dropdown';
import { User } from '@prisma/client';
import { EditProjectSchema, IEditProject } from '@/lib/validationSchemas';
import { upsertProject } from '@/lib/dbActions';

const CreateEventForm = ({ participants }: { participants: User[] }) => {
  const formPadding = 'py-1';
  const categories = ['STEM', 'Art', 'Music', 'Sports', 'Technology', 'Business', 'Health', 'Social'];
  const participantNames = participants.map((participant) => participant.email);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(EditProjectSchema),
  });

  const onSubmit = async (data: IEditProject) => {
    const result = await upsertProject(data);
    if (result) {
      swal('Success!', 'Project data saved successfully!', 'success');
      reset();
    } else {
      swal('Error!', 'Failed to save project data!', 'error');
    }
  };

  return (
    <Container>
      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className={formPadding}>
              <Form.Group controlId="location">
                <Form.Label>Location</Form.Label>
                <Form.Control type="text" {...register('location')} />
                <Form.Text className="text-danger">{errors.location?.message}</Form.Text>
              </Form.Group>
            </Row>
            <Row className={formPadding}>
              <Form.Group controlId="name">
                <Form.Label>Name of Event</Form.Label>
                <Form.Control type="text" {...register('name')} />
                <Form.Text className="text-danger">{errors.name?.message}</Form.Text>
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
              <Col xs={12}>
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
              Create
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CreateEventForm;
