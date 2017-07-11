import React from 'react';
import { shallow } from 'enzyme';
import UpcomingMissionList from './UpcomingMissionList';

const MISSIONS = [
  {
    upcomingMissionIndex: 0,
    upcomingMissionAvailable: true,
    upcomingScheduledMissionId: 1621824,
    upcomingStart: 1499570100,
    upcomingTitle: 'Pending: Target name is not yet available',
    upcomingObjectIconURL: 'https://vega.slooh.com/icons/reservations/not_available_w.svg',
  },
  {
    upcomingMissionIndex: 1,
    upcomingMissionAvailable: true,
    upcomingScheduledMissionId: 1621825,
    upcomingStart: 1499570400,
    upcomingTitle: 'Pending: Target name is not yet available',
    upcomingObjectIconURL: 'https://vega.slooh.com/icons/reservations/not_available_w.svg',
  },
];

describe('<UpcomingMissions />', () => {
  it('should render the missions given to it', () => {
    const upcomingWrapper = shallow(<UpcomingMissionList missions={MISSIONS} />);
    expect(upcomingWrapper.find('.mission')).toHaveLength(2);
  });

  it('should render nothing when no missions provided', () => {
    const upcomingWrapper = shallow(<UpcomingMissionList />);
    expect(upcomingWrapper.find('.mission')).toHaveLength(0);
  })
});
