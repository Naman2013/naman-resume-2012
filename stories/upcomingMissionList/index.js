import React from 'react';
import { storiesOf } from '@storybook/react';
import UpcomingMissionList from '../../app/components/telescope-details/UpcomingMissions';
import MISSIONS from '../../app/components/telescope-details/UpcomingMissions/testData';

storiesOf('Upcoming mission list', module)
  .add('No missions available', () => <UpcomingMissionList />)
  .add('With missions', () => <UpcomingMissionList missions={MISSIONS} />);
