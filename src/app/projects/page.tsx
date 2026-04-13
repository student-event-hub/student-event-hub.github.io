/* eslint-disable import/extensions */
import { Container, Row } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import { PageIDs } from '@/utilities/ids';
import pageStyle from '@/utilities/pageStyle';
import EventCardHelper from './EventCardHelper';

const EventsPage = async () => {
  const events = await prisma.event.findMany();
  events.sort((a, b) => a.name.localeCompare(b.name));
  return (
    <Container id={PageIDs.eventsPage} style={pageStyle}>
      <Row xs={1} md={2} lg={4} className="g-2">
        {events.map((event) => (
          <EventCardHelper key={event.id} event={event} />
        ))}
      </Row>
    </Container>
  );
};

export default EventsPage;
