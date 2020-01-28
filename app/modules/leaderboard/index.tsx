import * as React from 'react';

const LeaderboardContainer = React.lazy(() =>
  import('./containers/leaderboard-container')
);

export const LeaderboardContainerLazy: React.FC = props => (
  <React.Suspense fallback={<div>Loading...</div>}>
    <LeaderboardContainer {...props} />
  </React.Suspense>
);
