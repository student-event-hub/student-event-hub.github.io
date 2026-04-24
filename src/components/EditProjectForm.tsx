/* eslint-disable import/extensions */

'use client';

import React from 'react';
import { Form, Button, Col, Container, Card, Row } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import swal from 'sweetalert';
import Multiselect from 'multiselect-react-dropdown';
import { Interest, User } from '@prisma/client';
import { EditProjectSchema, IEditProject } from '@/lib/validationSchemas';
import { upsertProject } from '@/lib/dbActions';

const EditProjectForm = ({ interests, participants }: { interests: Interest[]; participants: User[] }) => {
  const formPadding = 'py-1';
  const interestNames = interests.map((interest) => interest.name);
  const participantNames = participants.map((participant) => participant.email);
  const categories = ['STEM', 'Art', 'Music', 'Sports', 'Technology', 'Business', 'Health', 'Social'];
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
      swal('Success!', 'Project data edited successfully!', 'success');
      reset();
    } else {
      swal('Error!', 'Failed to edit project data!', 'error');
    }
  };

  return (
    <Container>
      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
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
                  <Controller
                    control={control}
                    name="names"
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
