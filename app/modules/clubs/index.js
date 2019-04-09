import React, { Suspense } from 'react';

const TopThreadsContainer = React.lazy(() => import('./containers/topThreads'));

export const TopThreads = props => (
  <Suspense fallback={<div>Loading...</div>}>
    <TopThreadsContainer {...props} />
  </Suspense>
);
