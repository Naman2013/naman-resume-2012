/***********************************
* V4 Dashboard the new home page
*
*
*
***********************************/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Home from 'pages/home';
import SignedInDashboard from './SignedInDashboard';

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
      {user.isAuthorized ? <SignedInDashboard /> : <Home />}
    </div>)
  }
}

export default Dashboard;
