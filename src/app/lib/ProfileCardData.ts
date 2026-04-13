import { Event } from '@prisma/client';

export type ProfileCardData = {
  email: string;
  bio: string | null;
  firstName: string | null;
  lastName: string | null;
  picture: string | null;
  title: string | null;
  events: Event[];
  interests: string[];
};
