/* eslint-disable react/jsx-indent */
/* eslint-disable @typescript-eslint/indent */

'use client';

import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { Container, Image, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { BoxArrowRight, PersonFill, PersonPlusFill } from 'react-bootstrap-icons';
// eslint-disable-next-line import/extensions
import { ComponentIDs } from '@/utilities/ids';

const NavBar: React.FC = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const currentUser = session?.user?.email;
  // const userWithRole = session?.user as { email: string; randomKey: string };
  // const role = userWithRole?.randomKey;
  const menuStyle = { marginBottom: '0px' };
  const navbarClassName = currentUser ? 'bg-dark' : 'bg-light';
  // const navbarVariant = currentUser ? 'dark' : 'light';
  return (
    <Navbar expand="lg" style={menuStyle} className={navbarClassName}>
      <Container>
        <Navbar.Brand href="/" className="align-items-center">
          <span style={{ fontWeight: 800, fontSize: '24px' }}>
            <Image src="/images/logo_blue.png" width={50} style={{ marginBottom: 3 }} alt="Bowfolios" />
            Student Event Hub
          </span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls={ComponentIDs.basicNavbarNav} />
        <Navbar.Collapse id={ComponentIDs.basicNavbarNav}>
          <Nav className="me-auto justify-content-start">
            <Nav.Link
              id={ComponentIDs.allEventsMenuItem}
              active={pathname === '/events'}
              href="/events"
              key="allEvents"
            >
              All Events
            </Nav.Link>

            {currentUser // Section for navbar components that should only be visible to logged in users.
              ? [
                            <Nav.Link
                              id={ComponentIDs.addEventMenuItem}
                              active={pathname === '/createEvent'}
                              href="/createEvent"
                              key="createEvent"
                            >
              Create Event
                            </Nav.Link>,
            <Nav.Link
              id={ComponentIDs.yourEventsMenuItem}
              active={pathname === '/your-events'}
              href="/your-events"
              key="yourEvents"
            >
              Your Events
            </Nav.Link>,
                  <Nav.Link
                    id={ComponentIDs.addProjectMenuItem}
                    active={pathname === '/addProject'}
                    href="/addProject"
                    key="addP"
                  >
                    Add Project
                  </Nav.Link>,
                  <Nav.Link
                    id={ComponentIDs.filterMenuItem}
                    active={pathname === '/filter'}
                    href="/filter"
                    key="filter"
                  >
                    Filter
                  </Nav.Link>,
                ]
              : ''}
          </Nav>
          <Nav className="justify-content-end">
            {currentUser ? (
              <NavDropdown id={ComponentIDs.currentUserDropdown} title={currentUser}>
                <NavDropdown.Item id={ComponentIDs.currentUserDropdownSignOut} href="/auth/signout">
                  <BoxArrowRight />
                  Sign out
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown id={ComponentIDs.loginDropdown} title="Login">
                <NavDropdown.Item id={ComponentIDs.loginDropdownSignIn} href="/auth/signin">
                  <PersonFill />
                  Sign in
                </NavDropdown.Item>
                <NavDropdown.Item id={ComponentIDs.loginDropdownSignUp} href="/auth/signup">
                  <PersonPlusFill />
                  Sign up
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
