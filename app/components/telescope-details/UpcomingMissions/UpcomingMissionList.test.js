import React from 'react';
import { shallow } from 'enzyme';
import UpcomingMissionList from './UpcomingMissionList';
import Mission from './Mission';
import NoUpcomingMission from './NoUpcomingMission';
import MISSIONS from './testData';


describe('<UpcomingMissions />', () => {
  it('should render <Mission /> when provided mission data', () => {
    const upcomingWrapper = shallow(<UpcomingMissionList missions={MISSIONS} />);
    expect(upcomingWrapper.find(Mission)).toHaveLength(2);
  });

  it('when no missions render <NoUpcomingMission />', () => {
    const upcomingWrapper = shallow(<UpcomingMissionList />);
    expect(upcomingWrapper.find(NoUpcomingMission)).toHaveLength(1);
  });
});
