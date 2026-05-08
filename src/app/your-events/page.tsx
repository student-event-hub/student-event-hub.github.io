/* eslint-disable import/extensions */
import { Container } from 'react-bootstrap';
import { PageIDs } from '@/utilities/ids';
import { auth } from '@/lib/auth';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { prisma } from '@/lib/prisma';
import type { EventCardData } from '@/app/lib/EventCardData';
import pageStyle from '@/utilities/pageStyle';
import YourEventsClient from './YourEventsClient';

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
  const userEmail = session?.user?.email ?? null;
  const orConditions: object[] = [];
  if (profile) {
    orConditions.push({ ProfileEvent: { some: { profileId: profile.id } } });
  }
  if (userEmail) {
    orConditions.push({ creator: userEmail });
  }

  const events = orConditions.length === 0 ? [] : await prisma.event.findMany({
    where: {
      OR: orConditions,
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
    creator: event.creator,
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
      <YourEventsClient
        profileFirstName={profile?.firstName ?? null}
        profileLastName={profile?.lastName ?? null}
        initialEvents={eventData}
        currentUserEmail={session?.user?.email ?? null}
        currentUserRole={session?.user?.role ?? 'USER'}
      />
    </Container>
  );
};

export default YourEventsPage;
