import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  getObservatoryList,
  getCurrentObservatory,
  fetchObservatoryTelescopeStatus,
  fetchAllWidgetsByObservatory } from '../modules/Telescope-Overview';

import AnnouncementBanner from '../components/common/announcement-banner/announcement-banner';
import TelescopeFilterNav from '../components/telescope-overview/telescope-filter-nav';
import ObservatoryHero from '../components/telescope-overview/observatory-hero';
import TelescopeCards from '../components/telescope-overview/telescope-cards/telescope-cards';

import { backgroundImageCover } from '../styles/mixins/utilities';

const MINIMUM_TELESCOPE_REFRESH_RATE = 0;

function mapStateToProps(state, ownProps) {
  return {
    observatoryList: state.telescopeOverview.observatoryList.observatoryList,
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
    }, dispatch),
  };
}

@connect(mapStateToProps, mapDispatchToProps)
class TelescopeOverview extends Component {

  componentDidMount() {
    this.props.actions.getObservatoryList(
      this.props.currentObservatoryId
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.observatoryId !== this.props.currentObservatoryId) {
      const currentObservatory =
        getCurrentObservatory(nextProps.observatoryList, nextProps.params.observatoryId);

      this.props.actions.fetchAllWidgetsByObservatory(currentObservatory);
      this.props.actions.fetchObservatoryTelescopeStatus(currentObservatory.obsId);
    }

    this.buildTelescopeStatusTimer();
  }

  componentWillUnmount() {
    clearInterval(this.telescopeStatusTimer);
  }

  buildTelescopeStatusTimer() {
    const { observatoryTelecopeStatus } = this.props;

    if (observatoryTelecopeStatus) {
      clearInterval(this.telescopeStatusTimer);
      const { statusExpires, requestedObsId } = observatoryTelecopeStatus;
      const remainingTime = (statusExpires * 1000) - new Date().getTime();

      if (remainingTime > MINIMUM_TELESCOPE_REFRESH_RATE) {
        this.telescopeStatusTimer = setInterval(() => {
          this.props.actions.fetchObservatoryTelescopeStatus(requestedObsId);
        }, remainingTime);
      }
    }
  }

  render() {
    const { observatoryList, currentObservatoryId } = this.props;

    const currentObservatory =
      getCurrentObservatory(observatoryList, currentObservatoryId);

    if (!currentObservatory) {
      return null;
    }

    const { obsId } = currentObservatory;

    return (
      <div className="root">

        <AnnouncementBanner
          obsId={obsId}
        />

        <TelescopeFilterNav
          observatoryList={this.props.observatoryList}
        />

        <ObservatoryHero
          moonPhaseWidgetResult={this.props.moonPhaseWidgetResult}
          satelliteViewWidgetResult={this.props.satelliteViewWidgetResult}
          {...currentObservatory}
        />

        <TelescopeCards
          observatoryTelecopeStatus={this.props.observatoryTelecopeStatus}
          observatory={currentObservatory}
        />

        <style jsx>{`
          .root {
            ${backgroundImageCover}
            background-image: url("assets/images/photos/hero-inspire-background.jpg");
          }
        `}</style>

      </div>
    );
  }
}

const { shape, string, arrayOf, func } = PropTypes;

TelescopeOverview.defaultProps = {
  observatoryTelecopeStatus: {},
  satelliteViewWidgetResult: {},
  moonPhaseWidgetResult: {},
  observatoryList: [],
  currentObservatoryId: '',
  actions: {},
};

TelescopeOverview.propTypes = {
  observatoryTelecopeStatus: shape({
    statusExpires: string,
    requestedObsId: string,
  }),
  satelliteViewWidgetResult: shape({
    expiration: string,
    obsId: string,
    satelliteImageURL: string,
  }),
  moonPhaseWidgetResult: shape({
    phaseImageURL: string,
  }),
  observatoryList: arrayOf(shape({
    obsDescription: string,
    obsHeroURL: string,
  })),
  currentObservatoryId: string,
  actions: shape({
    getObservatoryList: func,
    fetchAllWidgetsByObservatory: func,
    fetchObservatoryTelescopeStatus: func,
  }),
};

export default TelescopeOverview;
