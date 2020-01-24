import React, { Suspense } from 'react';

const AboutContainer = React.lazy(() => import('./containers/about'));

export const AboutLazy = props => (
  <Suspense fallback={<div>Loading...</div>}>
    <AboutContainer {...props} />
  </Suspense>
);
