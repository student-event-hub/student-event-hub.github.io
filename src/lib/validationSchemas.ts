import * as Yup from 'yup';

export interface IProject {
  name: string;
  homepage?: string;
  picture?: string;
  description: string;
  interests?: (string | undefined)[] | undefined;
  participants?: (string | undefined)[] | undefined;
}

export const AddProjectSchema = Yup.object().shape({
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
  projects?: (string | undefined)[] | undefined;
}

export const ProfileSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().required('Email is required').email('Email must be a valid email'),
  bio: Yup.string().optional(),
  interests: Yup.array().of(Yup.string()),
  projects: Yup.array().of(Yup.string()),
});

export interface IEvent {
  name: string;
  picture?: string;
  description?: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  owner: string;
  interests?: (string | undefined)[];
  participants?: (string | undefined)[];
}

export const CreateEventSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  picture: Yup.string().optional(),
  description: Yup.string().optional(),
  date: Yup.string()
    .required('Date is required')
    .test('is-not-past', 'Date cannot be in the past', (value) => {
      if (!value) return true;
      const today = new Date().toISOString().split('T')[0];
      return value >= today;
    }),
  startTime: Yup.string().required('Start time is required'),
  endTime: Yup.string()
    .required('End time is required')
    .test('is-after-start', 'End time must be after start time', function (value) {
      const { startTime } = this.parent;
      if (!startTime || !value) return true;
      return value > startTime;
    }),
  location: Yup.string().required('Location is required'),
  owner: Yup.string().required('Owner is required'),
  interests: Yup.array().of(Yup.string()),
  participants: Yup.array().of(Yup.string()),
});

export interface IEditEvent extends IEvent {
  id: number;
}

export const EditEventSchema = CreateEventSchema.shape({
  id: Yup.number().required(),
});

export interface IEditProject {
  startTime: string;
  endTime: string;
  owners?: (string | undefined)[] | undefined;
  description: string;
  names?: string;
  category?: string;
  picture?: string;
  location?: string;
  name?: string;
}

export const EditProjectSchema = Yup.object().shape({
  startTime: Yup.string().required('Start time is required'),
  endTime: Yup.string()
    .required('End time is required')
    .test('is-after-start', 'End time must be after start time', function (value) {
      const { startTime } = this.parent;
      if (!startTime || !value) return true;
      return value > startTime;
    }),
  owners: Yup.array().of(Yup.string()),
  description: Yup.string().required('Description is required'),
  names: Yup.string().optional(),
  category: Yup.string().optional(),
  picture: Yup.string().optional(),
  location: Yup.string().optional(),
  name: Yup.string().optional(),
});
