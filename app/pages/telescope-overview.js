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

function mapStateToProps(state, ownProps) {
  return {
    user: dummyUserData, // TODO: state.user,
    observatoryList: state.telescopeOverview.observatoryList,
    currentObservatoryId: ownProps.params.observatoryId,
    currentObservatory: state.telescopeOverview.currentObservatory,
    moonPhaseWidgetResult: state.telescopeOverview.moonPhaseWidgetResult,
    satelliteViewWidgetResult: state.telescopeOverview.satelliteViewWidgetResult
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

  updateObservatory() {
    this.props.actions.getObservatoryList(
      this.props.user,
      this.props.currentObservatoryId
    );
  }

  componentDidMount() {
    this.updateObservatory();
  }

  closeBanner() {
    this.setState({
      displayBanner: false
    });
  }

  render() {

    const { observatoryList, currentObservatoryId } = this.props;
    const currentObservatory = observatoryList
      .map( observatory => observatory.obsId === currentObservatoryId );
    
    console.log(currentObservatoryId);

    return(
      <div>

        <AnnouncementBanner
          display={this.state.displayBanner}
          closeBanner={this.closeBanner.bind(this)} />

        <TelescopeFilterNav
          observatoryList={ this.props.observatoryList } />

        <ObservatoryHero
          moonPhaseWidgetResult={this.props.moonPhaseWidgetResult}
          satelliteViewWidgetResult={this.props.satelliteViewWidgetResult}
          {...this.props.currentObservatory} />

        <TelescopeCards />

      </div>
    );
  }
}

export default TelescopeOverview;
