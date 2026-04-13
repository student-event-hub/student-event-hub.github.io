import * as Yup from 'yup';

export interface IEvent {
  name: string;
  homepage?: string;
  picture?: string;
  description: string;
  interests?: (string | undefined)[] | undefined;
  participants?: (string | undefined)[] | undefined;
}

export const AddEventSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  homepage: Yup.string().optional().url('Homepage must be a valid URL'),
  picture: Yup.string().optional(),
  description: Yup.string().required('Description is required'),
  interests: Yup.array().of(Yup.string()),
  participants: Yup.array().of(Yup.string()),
});

export interface IProfile {
  firstName: string;
  lastName: string;
  email: string;
  bio?: string;
  interests?: (string | undefined)[] | undefined;
  events?: (string | undefined)[] | undefined;
}

export const ProfileSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().required('Email is required').email('Email must be a valid email'),
  bio: Yup.string().optional(),
  interests: Yup.array().of(Yup.string()),
  events: Yup.array().of(Yup.string()),
});
