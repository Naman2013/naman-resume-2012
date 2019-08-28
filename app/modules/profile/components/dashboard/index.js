import DashboardContainer from 'app/modules/dashboard/containers/dashborad';
import React, { Component } from 'react';

export class Dashboard extends Component {
  render() {
    return <DashboardContainer hideHero hideNav />;
  }
}
