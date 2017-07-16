import React from 'react';
import renderer from 'react-test-renderer';
import TelescopeOffline from './telescope-offline';

it('renders correctly', () => {
  const tree = renderer.create(<TelescopeOffline />).toJSON();
  expect(tree).toMatchSnapshot();
});
