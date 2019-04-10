import React, { cloneElement, Fragment } from 'react';
import ProfileWrapper from 'app/modules/profile/components/profile-wrapper';

const PrivateProfile = props => {
  const { privateProfileData, params, children } = props;
  if (!privateProfileData) return null;
  return (
    <Fragment>
      {privateProfileData && (
        <ProfileWrapper params={params} data={privateProfileData}>
          {cloneElement(children, { params, privateProfileData })}
        </ProfileWrapper>
      )}
    </Fragment>
  );
};

export default PrivateProfile;
