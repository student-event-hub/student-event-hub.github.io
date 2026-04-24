/* eslint-disable import/extensions */
import { Container } from 'react-bootstrap';
// import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import EditProjectForm from '@/components/EditProjectForm';
import { loggedInProtectedPage } from '@/lib/page-protection';
// import { authOptions } from '../api/auth/[...nextauth]/route';
import { auth } from '@/lib/auth';

const EditProjectPage = async () => {
  const session = await auth();
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );
  const interests = await prisma.interest.findMany();
  const participants = await prisma.user.findMany();

  return (
    <Container>
      <h1 className="text-center">Edit Project</h1>
      <EditProjectForm interests={interests} participants={participants} />
    </Container>
  );
};

export default EditProjectPage;
