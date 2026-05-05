import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { PageIDs } from '@/utilities/ids';
import { Facebook, Instagram, Link45deg } from 'react-bootstrap-icons';

export default function Home() {
  return (
    <main>
      <div id={PageIDs.landingPage}>
        <Row className="landing-blue-background" style={{ alignItems: 'stretch' }}>
          <Col className="d-flex flex-column">
            <Container className="text-center d-flex flex-column h-100" style={{ paddingTop: '40px' }}>
              <h1 style={{
                paddingLeft: '20px',
                paddingBottom: '50px',
                color: '#FFF2F2',
                fontSize: '36pt',
              }}
              >
                A Digitized, Centralized Bulletin Board for the UH Community
              </h1>

              <h1 style={{ color: '#FFF2F2' }}>How it Works</h1>
              <ul className="list-group list-group-flush justify-content-center align-items-center">
                <li className="list-group-item landing-list-item-blue">
                  Browse and filter UH related events and activities
                </li>
                <li className="list-group-item landing-list-item-blue">
                  Save events to your personal calendar
                </li>
                <li className="list-group-item landing-list-item-blue">
                  Rate, comment, and submit your own events
                </li>
                <li className="list-group-item landing-list-item-blue">
                  Admin panel to manage events and view user engagement
                </li>
              </ul>
              <div className="d-flex gap-5 justify-content-center mt-4 w-100">
                <Button variant="light" href="/events" size="lg" style={{ minWidth: '160px' }}>
                  Browse All Events
                </Button>
              </div>
              <div className="mt-auto pb-5 d-flex justify-content-center gap-5">
                <a href="https://www.instagram.com/sldatuhm/" target="_blank" rel="noreferrer">
                  <Instagram size={28} color="white" className="mx-1" />
                </a>
                <a href="https://www.facebook.com/uhm.studentlife" target="_blank" rel="noreferrer">
                  <Facebook size={28} color="white" className="mx-1" />
                </a>
                <a href="https://manoa.hawaii.edu/studentlife/" target="_blank" rel="noreferrer">
                  <Link45deg size={28} color="white" className="mx-1" />
                </a>
              </div>
            </Container>
          </Col>
          <Col className="landing-image-col" style={{ padding: 0, position: 'relative', overflow: 'hidden' }}>
            {/* Blurred background fill */}
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'url(/images/UH_Manoa.jpeg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(12px)',
              transform: 'scale(1.15)',
            }}
            />
            {/* Full image on top, fully visible */}
            <Image
              src="/images/UH_Manoa.jpeg"
              alt="UH Manoa campus"
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                display: 'block',
              }}
            />
          </Col>
        </Row>

        { /* Notable Features */ }
        <Row>
          <div className="landing-white-background text-center">
            <h1 style={{ color: '#2D336B' }}>
              Notable Features
            </h1>
            <Container className="d-flex flex-column align-items-center gap-5">
              <Row md={1} lg={2}>
                <Col xs={6}>
                  <Image
                    src="/images/All_Events_Page.png"
                    width={1000}
                    alt="all-events-page"
                    className="rounded shadow-lg"
                  />
                </Col>
              </Row>
              <Row md={1} lg={2}>
                <Col xs={6}>
                  <ul
                    className="list-group list-group-flush justify-content-center align-items-center"
                  >
                    <li className="list-group-item landing-list-item-white">
                      Events are filterable by time/likeability/categories.
                    </li>
                    <li className="list-group-item landing-list-item-white">
                      Users can save events to their own calendar and filter their calendar via event categories.
                    </li>
                    <li className="list-group-item landing-list-item-white">
                      Users can like or dislike events and use the comment button with all comments sections.
                    </li>
                  </ul>
                </Col>
                <Col xs={6}>
                  <ul
                    className="list-group list-group-flush justify-content-center align-items-center"
                  >
                    <li className="list-group-item landing-list-item-white">
                      Users can add other people&apos;s events to their calendar.
                    </li>
                    <li className="list-group-item landing-list-item-white">
                      Being able to find future and current events
                      (specifically events from student life and development (SLD)).
                    </li>
                    <li className="list-group-item landing-list-item-white">
                      Users can create events to the public list of events for others to see.
                    </li>
                  </ul>
                </Col>
              </Row>
            </Container>
          </div>
        </Row>

        { /* Admin Panel Description */}
        <Row className="landing-blue-background" style={{ alignItems: 'stretch' }}>
          <Col className="landing-image-col" style={{ padding: 0, position: 'relative', overflow: 'hidden' }}>
            {/* Blurred background fill */}
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'url(/images/UH_Manoa.jpeg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(12px)',
              transform: 'scale(1.15)',
            }}
            />
            {/* Full image on top, fully visible */}
            <Image
              src="/images/Admin_Page.png"
              alt="UH Manoa campus"
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                display: 'block',
              }}
            />
          </Col>
          <Col className="d-flex flex-column">
            <Container className="text-center d-flex flex-column h-100" style={{ paddingTop: '40px' }}>
              <h1 style={{
                paddingLeft: '20px',
                paddingBottom: '50px',
                color: '#FFF2F2',
                fontSize: '36pt',
              }}
              >
                The Admin Panel
              </h1>

              <h1 style={{ color: '#FFF2F2' }}>For Web Admins and Moderators</h1>
              <ul className="list-group list-group-flush justify-content-center align-items-center">
                <li className="list-group-item landing-list-item-blue">
                  Admins can view all events and user engagement metrics in one place
                </li>
                <li className="list-group-item landing-list-item-blue">
                  Have the ability to delete events that violate guidelines or are inappropriate
                </li>
                <li className="list-group-item landing-list-item-blue">
                  They can also view all comments and delete any that are inappropriate or violate guidelines
                </li>
                <li className="list-group-item landing-list-item-blue">
                  Finally Edit events that have been submitted by users to ensure accuracy and appropriateness
                </li>
              </ul>
              <Image
                src="/images/Edit_Page.png"
                alt="Edit Page"
                style={{
                  marginTop: '40px',
                  width: '75%',
                  height: 'auto',
                  objectFit: 'contain',
                }}
                className="mx-auto d-block"
              />
            </Container>
          </Col>
        </Row>
      </div>
    </main>
  );
}
