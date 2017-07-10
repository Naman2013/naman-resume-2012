import React from 'react';
import { shallow } from 'enzyme';

import UpcomingMissionList from './UpcomingMissionList';
import Mission from './Mission';

const setOfMissions = [];

describe('<UpcomingMissions />', () => {
  it('should render three list items', () => {
    const upcomingWrapper = shallow(<UpcomingMissionList />);
    expect(upcomingWrapper.find('.mission')).toHaveLength(3);
  });
});
