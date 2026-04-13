import { Profile } from '@prisma/client';

export type EventCardData = {
  name: string;
  homepage: string | null;
  picture: string | null;
  description: string | null;
  interests: string[];
  participants: Profile[];
};
