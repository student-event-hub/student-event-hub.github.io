/* eslint-disable react/jsx-one-expression-per-line */

'use client';

import React from 'react';
import { Container, Col } from 'react-bootstrap';
import { PageIDs } from '@/utilities/ids';
import pageStyle from '@/utilities/pageStyle';
import { Profile, Interest, Event } from '@prisma/client';
import ProfileForm from '@/components/ProfileForm';

const HomePage = ({
  profile,
  interests,
  events,
  profileInterests,
  profileEvents,
}: {
  profile: Profile;
  interests: Interest[];
  events: Event[];
  profileInterests: Interest[];
  profileEvents: Event[];
}) => (
  <Container id={PageIDs.homePage} style={pageStyle}>
    <Col>
      <h2 className="text-center">Your Profile</h2>
      <ProfileForm
        profile={profile}
        interests={interests}
        events={events}
        profileInterests={profileInterests}
        profileEvents={profileEvents}
      />
    </Col>
  </Container>
);

export default HomePage;
