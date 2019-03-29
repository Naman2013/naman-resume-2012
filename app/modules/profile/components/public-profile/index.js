import React, { cloneElement, Component, Fragment } from 'react';
import { ProfileWrapper } from 'app/modules/profile/components/profile-wrapper';

export class PublicProfile extends Component {
  componentDidMount = () => {
    this.fetchData();
  };

  fetchData = () => {
    const { getPublicProfile, params } = this.props;
    const { customerUUID } = params;
    getPublicProfile(customerUUID);
  };

  render() {
    const { publicProfileData, params, children } = this.props;
    return (
      <Fragment>
        {publicProfileData && (
          <ProfileWrapper data={publicProfileData} params={params}>
            {cloneElement(children, { publicProfileData, params })}
          </ProfileWrapper>
        )}
      </Fragment>
    );
  }
}
