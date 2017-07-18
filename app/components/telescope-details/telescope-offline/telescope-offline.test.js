import React from 'react';
import renderer from 'react-test-renderer';
import TelescopeOffline from './telescope-offline';

it('should render with an image and message', () => {
  const tree = renderer.create(
    <TelescopeOffline
      imageSource="https://vega.slooh.com/images/placeholders/telescope-offline.png"
      offlineStatusMessage="Missions are offline due to weather conditions."
    />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
