/* eslint-disable import/extensions */
import { Container } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import EditProjectForm from '@/components/EditProjectForm';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { auth } from '@/lib/auth';

const formatTimeForInput = (date: Date): string => {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

const EditProjectPage = async ({ searchParams }: { searchParams: { id?: string } }) => {
  const session = await auth();
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );

  const participants = await prisma.user.findMany();

  const eventId = searchParams.id ? parseInt(searchParams.id, 10) : null;
  const event = eventId ? await prisma.event.findUnique({ where: { id: eventId } }) : null;

  const eventData = event
    ? {
      id: event.id,
      name: event.name,
      description: event.description,
      location: event.location,
      startTime: formatTimeForInput(event.startTime),
      endTime: formatTimeForInput(event.endTime),
      originalStartISO: event.startTime.toISOString(),
      originalEndISO: event.endTime.toISOString(),
      owner: [event.owner],
      picture: event.picture,
    }
    : null;

  return (
    <Container>
      <h1 className="text-center">Edit Event</h1>
      <EditProjectForm participants={participants} event={eventData} />
    </Container>
  );
};

export default EditProjectPage;
