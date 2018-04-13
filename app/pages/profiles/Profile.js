import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchDashboard } from '../../modules/dashboard/actions';

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
      children,
    } = this.props;

    return (
      <div>
        <div>Profile</div>
        {cloneElement(children)}
      </div>
    );
  }
}

export default Profile;
