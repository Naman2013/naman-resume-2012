import React, { Component } from 'react';
import {
  setupFeaturedObjectsExpireTimer,
  stopFeaturedObjectsExpireTimer,
} from 'app/services/dashboard/timer';
import DashboardDisplay from 'app/modules/dashboard/components/DashboardDisplay';
import { GuestDashboard } from '../guest-dashboard';

export class Dashboard extends Component {
  constructor(props) {
    super(props);
    const { embed, router, user } = this.props;

    // Redirect user to /profile/dashboard from / if user is authenticated
    if (!embed && user.isAuthorized) {
      router.push('/profile/private');
    }
  }

  componentDidMount() {
    const { user } = this.props;

    if (!user.isAuthorized) {
      this.getGuestDashboard();
    }

    this.getDashboardFeaturedObjects();
  }

  componentWillUnmount() {
    stopFeaturedObjectsExpireTimer();
  }

  getGuestDashboard = () => {
    const { getGuestDashboard } = this.props;
    getGuestDashboard();
  };

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
    const { user, hideHero, hideNav, guestDashboard } = this.props;

    if (user.isAuthorized) {
      return <DashboardDisplay {...{ hideHero, hideNav, user }} />;
    }

    return <GuestDashboard user={user} guestDashboard={guestDashboard} />;
  }
}
