import React, { cloneElement, Fragment } from 'react';
import { browserHistory } from 'react-router';
import ProfileWrapper from 'app/modules/profile/components/profile-wrapper';

const PublicProfile = props => {
  const {
    publicProfileData,
    params,
    children,
    getProfile,
    isLoading,
    location,
    router,
  } = props;

  if (!publicProfileData) return null;

  // if index route
  if (router.location.pathname === '/profile/public') {
    // go to first menu item
    browserHistory.push(publicProfileData.profileMenuList[0].linkUrl);
  }

  if (!children) return null;

  return (
    <Fragment>
      {publicProfileData && (
        <ProfileWrapper
          params={params}
          data={publicProfileData}
          isLoading={isLoading}
          location={location}
        >
          {cloneElement(children, { params, getProfile })}
        </ProfileWrapper>
      )}
    </Fragment>
  );
};

export default PublicProfile;
