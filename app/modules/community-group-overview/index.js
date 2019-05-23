import React, { Suspense } from 'react';

const CommunityGroupEditContainer = React.lazy(() =>
  import('./containers/community-group-edit')
);

export const CommunityGroupEdit = props => (
  <Suspense fallback={<div>Loading...</div>}>
    <CommunityGroupEditContainer {...props} />
  </Suspense>
);
