/* eslint-disable import/extensions */
import { auth } from '@/lib/auth';
// import { getServerSession } from 'next-auth';
import { Container } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import FilterProfileForm from '@/components/FilterProfileForm';
import { loggedInProtectedPage } from '@/lib/page-protection';
// import authOptions from '@/lib/authOptions';

const FilterPage = async () => {
  const session = await auth();
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );
  const allInterests = await prisma.interest.findMany();
  const allProfiles = await prisma.profile.findMany();
  const allProfileInterests = await prisma.profileInterest.findMany();
  const allProjects = await prisma.event.findMany();
  const allProfileProjects = await prisma.profileEvent.findMany();
  return (
    <Container>
      <FilterProfileForm
        interests={allInterests}
        profiles={allProfiles}
        profileInterests={allProfileInterests}
        profileProjects={allProfileProjects}
        projects={allProjects}
      />
    </Container>
  );
};
export default FilterPage;
