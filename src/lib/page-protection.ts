import { redirect } from 'next/navigation';

export const loggedInProtectedPage = (session: { user: { email?: string | null; role?: string } } | null) => {
  if (!session) {
    redirect('/auth/signin');
  }
};

export const adminProtectedPage = (session: { user: { email?: string | null; role?: string } } | null) => {
  loggedInProtectedPage(session);
  if (session && session.user.role !== 'ADMIN') {
    redirect('/not-authorized');
  }
};
