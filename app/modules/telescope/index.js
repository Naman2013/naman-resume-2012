import React, { Suspense } from 'react';

const TelescopeDetailsContainer = React.lazy(() =>
  import('./containers/telescope-details')
);

export const TelescopeDetailsMain = props => (
  <Suspense fallback={<div>Loading...</div>}>
    <TelescopeDetailsContainer {...props} />
  </Suspense>
);
