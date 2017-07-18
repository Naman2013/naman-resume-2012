import React from 'react';
import renderer from 'react-test-renderer';
import NoUpcomingMission from './NoUpcomingMission';

describe('<NoUpcomingMission />', () => {
  it('should render no mission stuff...', () => {
    const tree = renderer.create(<NoUpcomingMission />);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
