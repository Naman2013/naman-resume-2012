/***********************************
 * V4 Dashboard the new home page
 *
 *
 *
 ***********************************/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getDashboardFeaturedObjects } from 'app/modules/dashboard/actions';
import {
  setupFeaturedObjectsExpireTimer,
  stopFeaturedObjectsExpireTimer,
} from 'app/services/dashboard/timer';
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
    this.getDashboardFeaturedObjects();
  }

  getDashboardFeaturedObjects = () => {
    const { getDashboardFeaturedObjects } = this.props;
    stopFeaturedObjectsExpireTimer();
    getDashboardFeaturedObjects().then(({ payload }) => {
      const timerTime = payload.expires - payload.timestamp;
      setupFeaturedObjectsExpireTimer(timerTime, () =>
        this.getDashboardFeaturedObjects()
      );

    });
  };

  render() {
    const { user } = this.props;
    return <DashboardDisplay {...user} />;
  }
}

export default Dashboard;
