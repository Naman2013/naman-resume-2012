import React from 'react';
import renderer from 'react-test-renderer';
import LiveSign from './live-sign';

it('renders correctly', () => {
  const liveSign = renderer.create(
    <LiveSign />,
  ).toJSON();

  expect(liveSign).toMatchSnapshot();
});
