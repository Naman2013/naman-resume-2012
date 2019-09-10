import * as React from 'react';

const LiveActivityContainer = React.lazy(() =>
  import('./containers/live-activity')
);

export const LiveActivityLoadable = (props: any) => (
  <React.Suspense fallback={<div>Loading...</div>}>
    <LiveActivityContainer {...props} />
  </React.Suspense>
);
