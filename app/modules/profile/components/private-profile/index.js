import React, { cloneElement, Component, Fragment } from 'react';
import { ProfileWrapper } from 'app/modules/profile/components/profile-wrapper';

export class PrivateProfile extends Component {
  componentDidMount = () => {
    this.fetchData();
  };

  fetchData = () => {
    const { getPrivateProfile } = this.props;
    getPrivateProfile();
  };

  render() {
    console.log('PrivateProfile - this.props', this.props);
    const { privateProfileData, params, children } = this.props;
    if (!privateProfileData) return null;
    return (
      <Fragment>
        {privateProfileData && (
          <ProfileWrapper data={privateProfileData} params={params}>
            {cloneElement(children, { privateProfileData, params })}
          </ProfileWrapper>
        )}
      </Fragment>
    );
  }
}
