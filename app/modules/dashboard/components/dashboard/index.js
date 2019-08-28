import DashboardDisplay from 'app/modules/dashboard/components/DashboardDisplay';
import {
  setupFeaturedObjectsExpireTimer,
  stopFeaturedObjectsExpireTimer,
} from 'app/services/dashboard/timer';
import React, { Component } from 'react';

export class Dashboard extends Component {
  componentDidMount() {
    this.getDashboardFeaturedObjects();
  }

  componentWillUnmount() {
    stopFeaturedObjectsExpireTimer();
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
    const { user, hideHero, hideNav } = this.props;
    return <DashboardDisplay {...{ hideHero, hideNav, user }} />;
  }
}
