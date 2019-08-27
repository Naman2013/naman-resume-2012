import DashboardDisplay from 'app/modules/dashboard/components/DashboardDisplay';
import React, { Component } from 'react';

export class Dashboard extends Component {
  render() {
    const { user } = this.props;
    return <DashboardDisplay {...user} />;
  }
}
