/***********************************
 * V4 Dashboard the new home page
 *
 *
 *
 ***********************************/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getDashboardFeaturedObjects } from 'app/modules/dashboard/actions';
import DashboardDisplay from './DashboardDisplay';

const mapStateToProps = ({ user }) => ({
  user,
});

const mapDispatchToProps = {
  getDashboardFeaturedObjects,
};

@connect(
  mapStateToProps,
  mapDispatchToProps
)
class Dashboard extends Component {
  componentDidMount() {
    const { getDashboardFeaturedObjects } = this.props;
    getDashboardFeaturedObjects();
  }

  render() {
    const { user } = this.props;
    return <DashboardDisplay {...user} />;
  }
}

export default Dashboard;
