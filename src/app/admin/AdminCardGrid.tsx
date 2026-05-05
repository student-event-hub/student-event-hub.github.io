/* eslint-disable import/extensions */

import { Row } from 'react-bootstrap';
import type { EventCardData } from '@/app/lib/EventCardData';
import AdminEventCard from './AdminEventCard';

const AdminCardGrid = ({ events }: { events: EventCardData[] }) => (
  <Row xs={1} md={2} lg={4} className="g-2">
    {events.map((event) => (
      <AdminEventCard key={event.id} event={event} />
    ))}
  </Row>
);

export default AdminCardGrid;
