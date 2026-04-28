import { Profile } from '@prisma/client';

export type EventCardData = {
  name: string;
  picture: string | null;
  description: string | null;
  eventDate: string;
  startTime: string;
  endTime: string;
  location: string;
  upvotes: number;
  downvotes: number;
  interests: string[];
  participants: Profile[];
};
