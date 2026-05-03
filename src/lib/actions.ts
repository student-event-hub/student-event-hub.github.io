'use server';

import { createEvent } from '@/lib/dbActions';

export default async function createEventAction(data: any) {
  const event = {
    title: data.eventName,
    location: data.location,
    description: data.description,
    category: data.category?.[0], // from multiselect
    owners: data.owners, // adjust if relational
    startTime: data.startTime,
    endTime: data.endTime,
    picture: data.picture,
  };

  return createEvent(event);
}
