/* eslint-disable import/extensions */
import { Container } from 'react-bootstrap';
import { PageIDs } from '@/utilities/ids';
import pageStyle from '@/utilities/pageStyle';

const YourEventsPage = () => (
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
      <h1 style={{ fontSize: '2rem', marginBottom: '16px' }}>John Foo</h1>
      <p style={{ fontSize: '1.1rem', marginBottom: 0 }}>
        We will implement some sort of data in this box, such as the amount of
        events the user has saved and the amount of events created.
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
      <p style={{ marginBottom: 0 }}>
        Upcoming event cards will be rendered here once event data is connected.
      </p>
    </div>
  </Container>
);

export default YourEventsPage;
