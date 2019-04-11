import React, { Suspense } from 'react';

const MissionsDetailsContainer = React.lazy(() =>
  import('./containers/mission-details')
);

export const MissionDetailsMain = props => (
  <Suspense fallback={<div>Loading...</div>}>
    <MissionsDetailsContainer {...props} />
  </Suspense>
);
