import React, { Suspense } from 'react';

const GalleryDetailsContainer = React.lazy(() =>
  import('./containers/gallery-details')
);

export const GalleryDetailsMain = props => (
  <Suspense fallback={<div>Loading...</div>}>
    <GalleryDetailsContainer {...props} />
  </Suspense>
);
