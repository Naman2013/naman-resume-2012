import React, { Suspense } from 'react';

const ProfileContainer = React.lazy(() => import('./containers/profile'));

const PublicProfileContainer = React.lazy(() =>
  import('./containers/public-profile')
);

const PrivateProfileContainer = React.lazy(() =>
  import('./containers/private-profile')
);

const ProfileListsContainer = React.lazy(() =>
  import('./containers/profile-lists')
);

const ProfileGroupsContainer = React.lazy(() =>
  import('./containers/profile-groups')
);

const ProfileActivityContainer = React.lazy(() =>
  import('./containers/profile-activity')
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

export const ProfileGroupsMain = props => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProfileGroupsContainer {...props} />
    </Suspense>
  );
};

export const ProfileActivity = props => (
  <Suspense fallback={<div>Loading...</div>}>
    <ProfileActivityContainer {...props} />
  </Suspense>
);

// Dashboard
const ProfileDashboardContainerLoadable = React.lazy(() =>
  import('./containers/dashborad')
);

export const ProfileDashboardContainer = props => (
  <Suspense fallback={<div>Loading...</div>}>
    <ProfileDashboardContainerLoadable {...props} />
  </Suspense>
);

// Getting Started
const GettingStartedContainerLoadable = React.lazy(() =>
  import('./containers/getting-started')
);

export const GettingStartedContainer = props => (
  <Suspense fallback={<div>Loading...</div>}>
    <GettingStartedContainerLoadable {...props} />
  </Suspense>
);
