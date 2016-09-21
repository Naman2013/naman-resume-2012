import React, { Component, PropTypes } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getObservatoryList } from '../modules/Telescope-Overview';

import AnnouncementBanner from '../components/common/announcement-banner';
import TelescopeFilterNav from '../components/telescope-overview/telescope-filter-nav';
import ObservatoryHero from '../components/telescope-overview/observatory-hero';
import TelescopeCards from '../components/telescope-overview/telescope-cards/telescope-cards';

const dummyUserData = {
ver: "v1",
lang: "en",
fname: "Brandon",
userid: "BrandonS.2016",
username: "Frankincense",
avatarType: "dummy",
avatarURL: "http://images-account.slooh.com/avatar-dummy.png",
cid: "198265",
at: "2",
status: "Active",
notifyType: "all",
notifyStatus: "unread",
notifyCount: "0",
school: "",
classroom: "",
teacher: "",
redirect: "",
token: "ab94b9f39049348848d807bc1a071e96919e9b1e",
tokenExp: "",
validate: "",
loginError: "false",
statusCode: "200"
};

function mapStateToProps(state) {
  console.log(state);
  return {
    user: dummyUserData, // TODO: state.user,
    observatoryList: state.telescopeOverview.observatoryList
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      getObservatoryList
    }, dispatch)
  };
}

@connect(mapStateToProps, mapDispatchToProps)
class TelescopeOverview extends Component {

  constructor(props) {
    super(props);
    this.state = {
      displayBanner: true
    };
  }

  componentDidMount() {
    this.props.actions.getObservatoryList(this.props.user);
  }

  closeBanner() {
    this.setState({
      displayBanner: false
    });
  }

  render() {
    return(
      <div>

        <AnnouncementBanner
          display={this.state.displayBanner}
          closeBanner={this.closeBanner.bind(this)} />

        <TelescopeFilterNav
          observatoryList={ this.props.observatoryList } />

        <ObservatoryHero />

        <TelescopeCards />

      </div>
    );
  }
}

export default TelescopeOverview;
