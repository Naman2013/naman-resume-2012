import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchDashboard } from '../../modules/dashboard/actions';
import PrivateProfile from '../../containers/profiles/private-profile';
import PublicProfile from '../../containers/profiles/public-profile';

const mapStateToProps = ({
  dashboard,
  user,

}) => ({
  dashboard,
  user,
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchDashboard,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class Profile extends Component {
  static propTypes = {
  }

  static defaultProps = {
  }

  constructor(props) {
    super();
    props.actions.fetchDashboard({

    });
  }

  render() {
    const {
      dashboard,
      params,
      user,
    } = this.props;

    const showPrivateProfile = params.cid === user.cid;

    return (
      <div>
        <div>Profile</div>
        {showPrivateProfile ? <PrivateProfile /> : <PublicProfile />}
      </div>
    );
  }
}

export default Profile;
