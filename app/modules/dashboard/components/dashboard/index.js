import DashboardDisplay from 'app/modules/dashboard/components/DashboardDisplay';
import {
  setupFeaturedObjectsExpireTimer,
  stopFeaturedObjectsExpireTimer,
} from 'app/services/dashboard/timer';
import React, { Component } from 'react';

export class Dashboard extends Component {
  constructor(props) {
    super(props);
    const { embed, router, user } = this.props;
    // Redirect user to /profile/dashboard from / if user is authenticated
    if (!embed && user.isAuthorized) {
      router.push('/profile/private/dashboard');
    }
  }

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
