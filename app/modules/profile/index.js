import React, { Suspense } from 'react';

const PublicProfileContainer = React.lazy(() =>
  import('./containers/public-profile')
);

export const PublicProfileMain = props => (
  <Suspense fallback={<div>Loading...</div>}>
    <PublicProfileContainer {...props} />
  </Suspense>
);
