import React from 'react';
import renderer from 'react-test-renderer';
import LiveSign from './live-sign';

// const TEST_DATA = {
//   targetDivID: 'advertisement-target',
//   adURL: 'slooh.com',
//   adWidth: 300,
//   adHeight: 250,
// };

it('renders correctly', () => {
  const liveSign = renderer.create(
    <LiveSign />,
  ).toJSON();

  expect(liveSign).toMatchSnapshot();
});
