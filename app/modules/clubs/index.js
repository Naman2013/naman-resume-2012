import React, { Suspense } from 'react';

const TopThreadsContainer = React.lazy(() => import('./containers/topThreads'));
const TopThreadsNewContainer = React.lazy(() => import('./containers/topThreadsNew'));

export const TopThreads = props => (
  <Suspense fallback={<div>Loading...</div>}>
    {/* <TopThreadsContainer {...props} /> */}
    <TopThreadsNewContainer {...props} />
  </Suspense>
);
