import React from 'react';
import renderer from 'react-test-renderer';
import Mission from './Mission';

const pendingMission = {
  upcomingTitle: 'Andromeda Galaxy',
  upcomingObjectIconURL: 'https://vega.slooh.com/icons/reservations/not_available_w.svg',
  upcomingStart: 1499570400,
};

describe('<Mission />', () => {
  it('should render a missions title and image', () => {
    const tree = renderer.create(
      <Mission
        upcomingTitle={pendingMission.upcomingTitle}
        upcomingObjectIconURL={pendingMission.upcomingObjectIconURL}
        upcomingStart={pendingMission.upcomingStart}
      />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
