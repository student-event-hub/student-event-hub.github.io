export type EventCardData = {
  id: number;
  name: string;
  owner: string[];
  creator: string;
  picture: string | null;
  description: string | null;
  eventDate: string;
  startTime: string;
  endTime: string;
  location: string;
  upvotes: number;
  downvotes: number;
  userVote: number;
  interests: string[];
  participants: {
    id: number;
    picture: string | null;
    email: string;
    username: string;
    firstName: string | null;
    lastName: string | null;
    bio: string | null;
    title: string | null;
  }[];
};
