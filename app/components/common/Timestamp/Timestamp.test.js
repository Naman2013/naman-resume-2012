import React from 'react';
import renderer from 'react-test-renderer';
import Timestamp from './';

const START_TIME = 1499570100;

it('should render nothing, when no timestamp is provided', () => {
  const tree = renderer.create(
    <Timestamp />,
  );

  expect(tree.toJSON()).toMatchSnapshot();
});

it('should render a line of text converting a timestamp in seconds to multiple timezones and utc', () => {
  const tree = renderer.create(
    <Timestamp timestampInSeconds={START_TIME} />,
  );

  expect(tree.toJSON()).toMatchSnapshot();
});
