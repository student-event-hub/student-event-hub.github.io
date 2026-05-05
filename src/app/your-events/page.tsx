/* eslint-disable import/extensions */
import { Container } from 'react-bootstrap';
import { PageIDs } from '@/utilities/ids';
import { auth } from '@/lib/auth';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { prisma } from '@/lib/prisma';
import type { EventCardData } from '@/app/lib/EventCardData';
import pageStyle from '@/utilities/pageStyle';
import CardGrid from '../events/CardGrid';

type UserVoteData = {
  eventId: number;
  value: number;
};

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
      endTime: {
        gt: new Date(Date.now()),
      },
    },
    include: {
      interests: {
        include: {
          interest: true,
        },
      },
      ProfileEvent: {
        include: {
          profile: true,
        },
      },
    },
  });
  const userVotes: UserVoteData[] = session?.user?.email
    ? await prisma.eventVote.findMany({
      where: {
        userEmail: session.user.email,
      },
      select: {
        eventId: true,
        value: true,
      },
    })
    : [];
  const userVoteMap = new Map<number, number>(
    userVotes.map((vote) => [vote.eventId, vote.value]),
  );
  const eventData: EventCardData[] = events.map((event) => ({
    id: event.id,
    name: event.name,
    owner: event.owner,
    picture: event.picture,
    eventDate: event.startTime.toLocaleDateString(),
    startTime: event.startTime.toLocaleTimeString('en-US', {
      timeZone: 'UTC', hour: 'numeric', minute: '2-digit', hour12: true,
    }),
    endTime: event.endTime.toLocaleTimeString('en-US', {
      timeZone: 'UTC', hour: 'numeric', minute: '2-digit', hour12: true,
    }),
    description: event.description,
    location: event.location,
    upvotes: event.upvotes,
    downvotes: event.downvotes,
    userVote: userVoteMap.get(event.id) || 0,
    interests: event.interests.map((eventInterest) => eventInterest.interest.name),
    participants: event.ProfileEvent.map((eventParticipant) => eventParticipant.profile),
  }));
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
        <h1 style={{ fontSize: '2rem', marginBottom: '16px' }}>{`${profile?.firstName} ${profile?.lastName}`}</h1>
        <p style={{ fontSize: '1.1rem', marginBottom: 0 }}>
          {`You have ${events.length} upcoming events.`}
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
        <CardGrid initialEvents={eventData} />
      </div>
    </Container>
  );
};

export default YourEventsPage;
