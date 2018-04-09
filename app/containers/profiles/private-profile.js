import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MyObservations from '../../components/profiles/my-observations';

const componentsByRole = {
  astronomer: ['myobservations', 'askastronomer'],
  apprentice: ['myobservations'],
  luminary: ['myobservations'],
  host: ['myobservations'],
  astrolab: ['myobservations'],
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
class PrivateProfile extends Component {
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
    const membershipType = 'astronomer';
    return (
      <div>Private Profile

        {componentsByRole[membershipType].indexOf('myobservations') > -1 ? <MyObservations cid={user.cid} /> : null}
      </div>
    );
  }
}

export default PrivateProfile;
