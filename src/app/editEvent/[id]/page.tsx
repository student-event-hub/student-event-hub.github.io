import { notFound } from 'next/navigation';
import { Container } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { auth } from '@/lib/auth';
import EditEventForm from '@/components/EditEventForm';

const EditEventPage = async ({ params, searchParams }: { params: { id: string }; searchParams: { from?: string } }) => {
  const session = await auth();
  loggedInProtectedPage(
    session as { user: { email: string; id: string; randomKey: string } } | null,
  );

  const eventId = parseInt(params.id, 10);
  if (Number.isNaN(eventId)) notFound();

  const event = await prisma.event.findUnique({
    where: { id: eventId },
    include: { interests: { include: { interest: true } } },
  });

  if (!event) notFound();

  const allInterests = await prisma.interest.findMany();
  const allParticipants = await prisma.user.findMany();

  return (
    <Container>
      <h1 className="text-center">Edit Event</h1>
      <EditEventForm
        event={event}
        interests={allInterests}
        participants={allParticipants}
        redirectTo={searchParams.from === 'admin' ? '/admin' : '/events'}
      />
    </Container>
  );
};

export default EditEventPage;
