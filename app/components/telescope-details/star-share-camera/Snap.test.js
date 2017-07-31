import React from 'react';
import renderer from 'react-test-renderer';
import Snap from './Snap';

it('should render nothing when no imageURL is provided', () => {
  const tree = renderer.create(
    <Snap />,
  );
  expect(tree.toJSON()).toMatchSnapshot();
});

it('should render a container when an image url is provided', () => {
  const tree = renderer.create(
    <Snap imageURL="foo.jpg" />,
  );
  expect(tree.toJSON()).toMatchSnapshot();
});
