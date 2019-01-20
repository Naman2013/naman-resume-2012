/* ********************************
 * V4 Private profile container
 ********************************* */

import React, { Component, Fragment, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SubPageNavigation from '../../../components/common/sub-page-navigation';
import { fetchPrivateProfile } from '../../../modules/private-profile/actions';

class PrivateProfile extends Component {
  static propTypes = {
    privateProfileData: PropTypes.shape({}).isRequired,
    fetchPrivateProfile: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.fetchPrivateProfile({});
  }

  generateNavItems = list => list.map(item => ({ title: item.name, link: item.linkUrl }));

  render() {
    const { children, privateProfileData } = this.props;
    
    return (
      <div>
        {privateProfileData.profileMenuList && (
          <Fragment>
            <SubPageNavigation items={this.generateNavItems(privateProfileData.profileMenuList)} />

            {/* {cloneElement(children)} */}
          </Fragment>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ privateProfile, user }) => ({
  privateProfileData: privateProfile.privateProfileData,
  user,
});

const mapDispatchToProps = { fetchPrivateProfile };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PrivateProfile);
