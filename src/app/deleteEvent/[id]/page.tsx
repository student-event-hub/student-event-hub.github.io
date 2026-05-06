/* eslint-disable import/extensions */

import { redirect, notFound } from 'next/navigation';
import { Col, Row, Button } from 'react-bootstrap';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { deleteEvent } from '@/lib/dbActions';

type Props = {
  params: { id: string };
};

const DeleteEventPage = async ({ params }: Props) => {
  const session = await auth();
  loggedInProtectedPage(session);

  const eventId = Number(params.id);
  if (Number.isNaN(eventId)) notFound();

  const event = await prisma.event.findUnique({ where: { id: eventId } });
  if (!event) notFound();

  const isOwner = session?.user?.email === event.creator;
  const isAdmin = session?.user?.role === 'ADMIN';
  if (!isOwner && !isAdmin) {
    redirect('/not-authorized');
  }

  async function confirmDelete() {
    'use server';

    await deleteEvent(eventId);
    redirect('/events');
  }

  return (
    <Col id="delete-event-page" className="text-center py-3">
      <h2>
        Delete &quot;
        {event.name}
        &quot;?
      </h2>
      <p className="text-muted">This action cannot be undone.</p>
      <Row>
        <Col xs={4} />
        <Col>
          <form action={confirmDelete}>
            <Button type="submit" variant="danger">
              Delete
            </Button>
          </form>
        </Col>
        <Col>
          <Button variant="secondary" href="/events">
            Cancel
          </Button>
        </Col>
        <Col xs={4} />
      </Row>
    </Col>
  );
};

export default DeleteEventPage;
