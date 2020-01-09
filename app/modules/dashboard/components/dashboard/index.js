import React, { Component } from 'react';
import {
  setupFeaturedObjectsExpireTimer,
  stopFeaturedObjectsExpireTimer,
} from 'app/services/dashboard/timer';
import DashboardDisplay from 'app/modules/dashboard/components/DashboardDisplay';
import GuestDashboard from '../guest-dashboard';

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

    if (user.isAuthorized) {
      this.getDashboardFeaturedObjects();
    }
  }

  componentWillUnmount() {
    stopFeaturedObjectsExpireTimer();
  }

  getDashboardFeaturedObjects = () => {
    const {
      getDashboardFeaturedObjects,
      guestDashboard: {
        Sections: {
          Missions: {
            APIParams: { callSource },
          },
        },
      },
    } = this.props;

    stopFeaturedObjectsExpireTimer();
    getDashboardFeaturedObjects({ callSource }).then(({ payload }) => {
      const timerTime = payload.expires - payload.timestamp;
      setupFeaturedObjectsExpireTimer(timerTime, () =>
        this.getDashboardFeaturedObjects()
      );
    });
  };

  render() {
    const {
      user,
      hideHero,
      hideNav,
      guestDashboard,
      recommendedObjects,
      getGuestDashboard,
      getSubscriptionPlans,
      subscriptionPlansData,
      getObservatoryList,
      observatoryListData,
      getDashboardShows,
      dashboardShowsList,
    } = this.props;

    if (user.isAuthorized) {
      return (
        <DashboardDisplay
          hideHero={hideHero}
          hideNav={hideNav}
          user={user}
          recommendedObjects={recommendedObjects}
        />
      );
    }

    return (
      <GuestDashboard
        guestDashboard={guestDashboard}
        recommendedObjects={recommendedObjects}
        getGuestDashboard={getGuestDashboard}
        getDashboardFeaturedObjects={this.getDashboardFeaturedObjects}
        getSubscriptionPlans={getSubscriptionPlans}
        subscriptionPlansData={subscriptionPlansData}
        getObservatoryList={getObservatoryList}
        observatoryListData={observatoryListData}
        getDashboardShows={getDashboardShows}
        dashboardShowsList={dashboardShowsList}
      />
    );
  }
}
