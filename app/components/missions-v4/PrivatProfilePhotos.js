import React, { Fragment } from 'react';
import { Route } from 'react-router';
import PhotoHubNavigation from './PhotoHubNavigation';

export default ({ children }) => (
  <Fragment>
    <PhotoHubNavigation />
    {children}
  </Fragment>
);
