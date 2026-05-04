/* eslint-disable import/extensions */
import { Container } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import CreateEventForm from '@/components/CreateEventForm';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { auth } from '@/lib/auth';

const CreateEventPage = async () => {
  const session = await auth();
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );
  const participants = await prisma.user.findMany();

  return (
    <Container>
      <h1 className="text-center">Create Event</h1>
      <CreateEventForm participants={participants} />
    </Container>
  );
};

export default CreateEventPage;
