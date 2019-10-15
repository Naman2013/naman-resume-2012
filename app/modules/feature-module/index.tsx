import * as React from 'react';

const FeatureContainer = React.lazy(() =>
  import('./containers/feature-container')
);

export const FeatureContainerLazy: React.FC = props => (
  <React.Suspense fallback={<div>Loading...</div>}>
    <FeatureContainer {...props} />
  </React.Suspense>
);
