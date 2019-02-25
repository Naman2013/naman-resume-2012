import React, { Suspense } from 'react';

const StoryDetailsContainer = React.lazy(() =>
  import('./containers/story-details')
);

export const StoryDetailsMain = props => (
  <Suspense fallback={<div>Loading...</div>}>
    <StoryDetailsContainer {...props} />
  </Suspense>
);
