import { Container, Row, Col, Image } from 'react-bootstrap';
import { PageIDs } from '@/utilities/ids';

export default function Home() {
  return (
    <main>
      <div id={PageIDs.landingPage}>
        <Row className="landing-blue-background">
          <Col>
            <Container className="text-center">
              <h1
                style={{ paddingTop: '20px', color: '#FFF2F2', fontSize: '36pt' }}
              >
                Welcome to the Student Event Hub
              </h1>
              <h3 style={{ paddingBottom: '20px', color: '#FFF2F2' }}>
                A digitized, centralized bulletin board for the UH Community
              </h3>
            </Container>
          </Col>
          <Col>
            <div className="landing-blue-background">
              <Container className="text-center">
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
                </ul>
              </Container>
            </div>
          </Col>
        </Row>
        <Row>
          <div className="landing-white-background text-center">
            <h1 style={{ color: '#2D336B' }}>
              Notable Features
            </h1>
            <Container>
              <Row md={1} lg={2}>
                <Col xs={6}>
                  <Image
                    src="/images/interests-page.png"
                    width={500}
                    alt="interest-page"
                  />
                </Col>
                <Col xs={6}>
                  <Image
                    src="/images/filter-page.png"
                    width={580}
                    alt="filter-page"
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
                    <li className="list-group-item landing-list-item-white">
                      Page Admins will be able to see users that added events to their calendars.
                    </li>
                  </ul>
                </Col>
                <Col xs={6}>
                  <ul
                    className="list-group list-group-flush justify-content-center align-items-center"
                  >
                    <li className="list-group-item landing-list-item-white">
                      Admins have the ability to DELETE events.
                    </li>
                    <li className="list-group-item landing-list-item-white">
                      Users can add events to their calendar.
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
      </div>
    </main>
  );
}
