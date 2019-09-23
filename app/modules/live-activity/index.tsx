import * as React from 'react';

const LiveActivityContainer = React.lazy(() =>
  import('./containers/live-activity')
);

export const LiveActivityLoadable = (props: any) => (
  <React.Suspense fallback={<div>.</div>}>
    <LiveActivityContainer {...props} />
  </React.Suspense>
);
