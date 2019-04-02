import React, { Suspense } from 'react';

const ProfileContainer = React.lazy(() =>
  import('./containers/profile')
);

const PublicProfileContainer = React.lazy(() =>
  import('./containers/public-profile')
);

const PrivateProfileContainer = React.lazy(() =>
  import('./containers/private-profile')
);

const ProfileListsContainer = React.lazy(() =>
  import('./containers/profile-lists')
);

export const ProfileMain = props => (
  <Suspense fallback={<div>Loading...</div>}>
    <ProfileContainer {...props} />
  </Suspense>
);

export const PublicProfileMain = props => (
  <Suspense fallback={<div>Loading...</div>}>
    <PublicProfileContainer {...props} />
  </Suspense>
);

export const PrivateProfileMain = props => (
  <Suspense fallback={<div>Loading...</div>}>
    <PrivateProfileContainer {...props} />
  </Suspense>
);

export const ProfileListsMain = props => (
  <Suspense fallback={<div>Loading...</div>}>
    <ProfileListsContainer {...props} />
  </Suspense>
);
