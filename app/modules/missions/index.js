import React, { Suspense } from 'react';

const MissionsContainer = React.lazy(() => import('./containers/missions'));

export const MissionsMain = props => (
  <Suspense fallback={<div>Loading...</div>}>
    <MissionsContainer {...props} />
  </Suspense>
);
