import React, { cloneElement, Fragment } from 'react';
import ProfileWrapper from 'app/modules/profile/components/profile-wrapper';

const PrivateProfile = props => {
  const {
    privateProfileData,
    params,
    children,
    getProfile,
    isLoading,
    location,
  } = props;
  if (!privateProfileData) return null;

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
