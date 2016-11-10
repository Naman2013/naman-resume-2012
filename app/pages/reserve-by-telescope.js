import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { checkUser } from '../modules/User';
import classnames from 'classnames';

import {
  missionGetCards,
  missionConfirmOpen,
  missionConfirmClose } from '../modules/Missions';

import {
  getObservatoryList,
  getCurrentObservatory } from '../modules/Telescope-Overview';

import TelescopeSelection from '../components/telescopes/selection-widget/telescope-selection';
import CurrentSelectionHeader from '../components/telescopes/current-selection-header/header';
import DatesSelection from '../components/telescopes/current-selection-header/dates-selection';
import Tips from '../components/telescopes/current-selection-header/tips';

import Listings from '../components/telescopes/listings/listings';

// TODO: refactor to use user information from STATE
import exampleUser from '../example-api-data/example-user'

const { element, func, object } = PropTypes;

/**
  @todo Get observatoryList in here for the telescope selection widget
  */

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      missionGetCards,
      missionConfirmOpen,
      missionConfirmClose,
      getObservatoryList,
      getCurrentObservatory,
    }, dispatch)
  };
}

function mapStateToProps({ missions, telescopeOverview }, ownProps) {
  return {
    user: exampleUser, // TODO: state.user,
    observatoryList: telescopeOverview.observatoryList,
    currentObservatoryId: ownProps.params.observatoryId,
    missions,
    cardList: missions.cardList || [],
  };
}

@connect(mapStateToProps, mapDispatchToProps)
class ReserveMissions extends Component {

  componentDidMount() {
    this.props.actions.getObservatoryList(
      this.props.user,
      this.props.currentObservatoryId
    );
  }

  render() {
    const { observatoryList, params } = this.props;

    // TODO: Move this check into TelescopeSelection component
    if(observatoryList.length === 0) {
      return null;
    }

    return (
      <div className="reserve-by-telescope container-fluid">

        <TelescopeSelection
          observatoryList={observatoryList}
          params={params}
          showUTCTimer={false}
          rootRoute={`reservations/reserve-by-telescope`} />

        <CurrentSelectionHeader />

        <div>
        	<DatesSelection />
        	<Tips />
        </div>

        <Listings />
      </div>
    );
  }
}

export default ReserveMissions;
