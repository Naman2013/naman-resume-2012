import React from 'react';
import renderer from 'react-test-renderer';
import GoogleAd from './GoogleAd';

const TEST_DATA = {
  targetDivID: 'advertisement-target',
  adURL: 'slooh.com',
  adWidth: 300,
  adHeight: 300,
};

it('renders correctly', () => {
  const googleAdTree = renderer.create(
    <GoogleAd
      targetDivID={TEST_DATA.targetDivID}
      adURL={TEST_DATA.adURL}
      adWidth={TEST_DATA.adWidth}
      adHeight={TEST_DATA.adHeight}
    />,
  ).toJSON();

  expect(googleAdTree).toMatchSnapshot();
});
