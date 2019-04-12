import React, { Suspense } from 'react';

const ImageDetailsContainer = React.lazy(() =>
  import('./containers/image-details')
);

export const ImageDetailsMain = props => (
  <Suspense fallback={<div>Loading...</div>}>
    <ImageDetailsContainer {...props} />
  </Suspense>
);
