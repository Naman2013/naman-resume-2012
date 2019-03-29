import React, { Suspense } from 'react';

const PublicProfileContainer = React.lazy(() =>
  import('./containers/public-profile')
);

const PrivateProfileContainer = React.lazy(() =>
  import('./containers/private-profile')
);

export const PublicProfileMain = props => (
  <Suspense fallback={<div>Loading...</div>}>
    <PublicProfileContainer {...props} />
  </Suspense>
);

export const PrivateProfileMain = props => (
  <Suspense fallback={<div>Loading...</div>}>
    <PrivateProfileContainer {...props} />
  </Suspense>
);
