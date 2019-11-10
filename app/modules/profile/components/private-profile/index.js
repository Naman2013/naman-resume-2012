import React, { cloneElement, Fragment } from 'react';
import { browserHistory } from 'react-router';
import ProfileWrapper from 'app/modules/profile/components/profile-wrapper';

const PrivateProfile = props => {
  const {
    privateProfileData,
    params,
    children,
    getProfile,
    isLoading,
    location,
    router,
  } = props;
  if (!privateProfileData) return null;

  // if index route
  if (router.location.pathname === '/profile/private') {
    // go to first menu item
    browserHistory.push(privateProfileData.profileMenuList[0].linkUrl);
  }

  if (!children) return null;

  return (
    <Fragment>
      {privateProfileData && (
        <ProfileWrapper
          params={params}
          data={privateProfileData}
          isLoading={isLoading}
          location={location}
        >
          {cloneElement(children, {
            params,
            privateProfileData,
            getProfile,
            isLoading,
          })}
        </ProfileWrapper>
      )}
    </Fragment>
  );
};

export default PrivateProfile;
