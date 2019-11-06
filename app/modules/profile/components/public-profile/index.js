import React, { cloneElement, Fragment } from 'react';
import ProfileWrapper from 'app/modules/profile/components/profile-wrapper';

const PublicProfile = props => {
  const {
    publicProfileData,
    params,
    children,
    getProfile,
    isLoading,
    location,
  } = props;
  if (!publicProfileData) return null;
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
