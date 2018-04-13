import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PublicObservations from '../../components/profiles/public-observations';

const componentsByRole = {
  ASTRONOMER: ['observations'],
  APPRENTICE: ['observations'],
  LUMINARY: ['observations'],
  HOST: ['observations'],
  ASTROLAB: ['observations'],
};
const mapStateToProps = ({
  user,
}) => ({
  user,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class PublicProfile extends Component {
  static propTypes = {
  }

  static defaultProps = {
  }

  constructor(props) {
    super();
  }

  render() {
    const {
      dashboard,
      user,
    } = this.props;

    // To Do: Delete
    const membershipType = 'ASTRONOMER';

    return (
      <div>Public Profile

        {componentsByRole[membershipType].indexOf('observations') > -1 ? <PublicObservations cid={user.cid} /> : null}
      </div>
    );
  }
}

export default PublicProfile;
