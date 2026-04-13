export type PictureInfo = {
  name: string;
  picture: string | null;
};

export type InterestCardData = {
  name: string;
  profilePictures: (PictureInfo | null)[];
  eventPictures: (PictureInfo | null)[];
};
