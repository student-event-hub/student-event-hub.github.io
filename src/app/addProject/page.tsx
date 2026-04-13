/* eslint-disable import/extensions */
import { Container } from 'react-bootstrap';
// import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import AddProjectForm from '@/components/AddProjectForm';
import { loggedInProtectedPage } from '@/lib/page-protection';
// import { authOptions } from '../api/auth/[...nextauth]/route';
import { auth } from '@/lib/auth';

const AddProjectPage = async () => {
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
      <h1 className="text-center">Add Project</h1>
      <AddProjectForm interests={interests} participants={participants} />
    </Container>
  );
};

export default AddProjectPage;
