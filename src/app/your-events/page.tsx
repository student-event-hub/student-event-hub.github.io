/* eslint-disable import/extensions */
import { Container } from 'react-bootstrap';
import { PageIDs } from '@/utilities/ids';
import { auth } from '@/lib/auth';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { prisma } from '@/lib/prisma';
import pageStyle from '@/utilities/pageStyle';
import CardGrid from '@/components/CardGrid';

const YourEventsPage = async () => {
  const session = await auth();
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; name: string; randomKey: string };
    } | null,
  );
  const profile = await prisma.profile.findUnique({
    where: {
      email: session?.user.email === null ? undefined : session?.user.email,
    },
  });
  const events = await prisma.event.findMany({
    where: {
      ProfileEvent: {
        some: {
          profileId: profile?.id,
        },
      },
    },
  });
  // events.filter((event) => profileEvents.find((pe) => pe.eventId === event.id));
  return (
    <Container id={PageIDs.yourEventsPage} style={pageStyle}>
      <div
        className="border rounded"
        style={{
          marginBottom: '32px',
          padding: '24px',
          minHeight: '180px',
          backgroundColor: 'white',
        }}
      >
        <h1 style={{ fontSize: '2rem', marginBottom: '16px' }}>{/* `${profile?.firstName} ${profile?.lastName}` */}</h1>
        <p style={{ fontSize: '1.1rem', marginBottom: 0 }}>
          {
          // We will implement some sort of data in this box, such as the amount of
          // events the user has saved and the amount of events created.
          `You have ${events.length} saved events.`
          }
        </p>
      </div>

      <h2 style={{ marginBottom: '20px' }}>Upcoming Events</h2>

      <div
        className="border rounded"
        style={{
          minHeight: '300px',
          padding: '24px',
          backgroundColor: 'white',
        }}
      >
        <CardGrid initialEvents={events} />
      </div>
    </Container>
  );
};

export default YourEventsPage;
