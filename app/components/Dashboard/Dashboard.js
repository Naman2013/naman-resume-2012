/***********************************
* V4 Dashboard the new home page
*
*
*
***********************************/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Home from 'pages/home';
import DashboardDisplay from './DashboardDisplay';

const mapStateToProps = ({
  user,
}) => ({
  user,
});
@connect(mapStateToProps, null)

class Dashboard extends Component {

  render () {
    const { user } = this.props;
    return (<div>
      <DashboardDisplay />
    </div>)
  }
}

export default Dashboard;
