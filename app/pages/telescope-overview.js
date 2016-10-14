import React, {Component, PropTypes} from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
  getObservatoryList,
  getCurrentObservatory,
  fetchObservatoryTelescopeStatus,
  fetchAllWidgetsByObservatory} from '../modules/Telescope-Overview';

import AnnouncementBanner from '../components/common/announcement-banner/announcement-banner';
import TelescopeFilterNav from '../components/telescope-overview/telescope-filter-nav';
import ObservatoryHero from '../components/telescope-overview/observatory-hero';
import TelescopeCards from '../components/telescope-overview/telescope-cards/telescope-cards';

import exampleUser from '../example-api-data/example-user'

const MINIMUM_TELESCOPE_REFRESH_RATE = 0;

function mapStateToProps(state, ownProps) {
  return {
    user: exampleUser, // TODO: state.user,
    observatoryList: state.telescopeOverview.observatoryList,
    currentObservatoryId: ownProps.params.observatoryId,
    moonPhaseWidgetResult: state.telescopeOverview.moonPhaseWidgetResult,
    satelliteViewWidgetResult: state.telescopeOverview.satelliteViewWidgetResult,
    observatoryTelecopeStatus: state.telescopeOverview.observatoryTelecopeStatus,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      getObservatoryList,
      fetchAllWidgetsByObservatory,
      fetchObservatoryTelescopeStatus,
    }, dispatch)
  };
}

@connect(mapStateToProps, mapDispatchToProps)
class TelescopeOverview extends Component {

  componentDidMount() {
    this.props.actions.getObservatoryList(
      this.props.user,
      this.props.currentObservatoryId
    );
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.params.observatoryId !== this.props.currentObservatoryId) {
      const currentObservatory =
        getCurrentObservatory(nextProps.observatoryList, nextProps.params.observatoryId);

      this.props.actions.fetchAllWidgetsByObservatory(currentObservatory);
      this.props.actions.fetchObservatoryTelescopeStatus(currentObservatory.obsId);
    }

    this.buildTelescopeStatusTimer();
  }

  buildTelescopeStatusTimer() {
    const { observatoryTelecopeStatus } = this.props;

    if(observatoryTelecopeStatus) {
      clearInterval(this.telescopeStatusTimer);
      const { statusExpires, requestedObsId } = observatoryTelecopeStatus;
      const remainingTime = (statusExpires * 1000) - new Date().getTime();

      if(remainingTime > MINIMUM_TELESCOPE_REFRESH_RATE) {
        this.telescopeStatusTimer = setInterval(() => {
          this.props.actions.fetchObservatoryTelescopeStatus(requestedObsId);
        }, remainingTime);
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.telescopeStatusTimer);
  }

  render() {
    const {observatoryList, currentObservatoryId} = this.props;
    const currentObservatory =
      getCurrentObservatory(observatoryList, currentObservatoryId);

    if(!currentObservatory) {
      return null;
    }

    const { obsId } = currentObservatory;

    return(
      <div>

        <AnnouncementBanner
          obsId={obsId} />

        <TelescopeFilterNav
          observatoryList={this.props.observatoryList} />

        <ObservatoryHero
          moonPhaseWidgetResult={this.props.moonPhaseWidgetResult}
          satelliteViewWidgetResult={this.props.satelliteViewWidgetResult}
          {...currentObservatory} />

        <TelescopeCards
          observatoryTelecopeStatus={this.props.observatoryTelecopeStatus}
          observatory={currentObservatory}/>

      </div>
    );
  }
}

export default TelescopeOverview;
