import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { checkUser } from '../modules/User';
import classnames from 'classnames';

import {
  getObservatoryList,
  getCurrentObservatory } from '../modules/Telescope-Overview';

import TelescopeSelection from '../components/telescopes/selection-widget/telescope-selection';
import CurrentSelectionHeader from '../components/telescopes/current-selection-header/header';
import DateSelectionNavigation from '../components/telescopes/date-selection-navigation/date-selection-navigation';
import Tips from '../components/telescopes/current-selection-header/tips';

import Listings from '../components/telescopes/listings/listings';

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      getObservatoryList,
    }, dispatch)
  };
}

function mapStateToProps({ missions, telescopeOverview }, ownProps) {
  return {
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
      this.props.currentObservatoryId
    );
  }

  render() {
    const { observatoryList, params } = this.props;
    const currentObservatory = getCurrentObservatory(observatoryList, params.obsUniqueId);

    if(!currentObservatory) { return null; }

    const currentTelescope = currentObservatory.obsTelescopes.find(telescope => telescope.teleUniqueId === params.teleUniqueId);
    const currentInstrument = currentTelescope.teleInstrumentList[0];
    const reservationDate = params.reservationDate;
    const rootRoute = `reservations/reserve-by-telescope/${params.obsUniqueId}/${params.teleUniqueId}`;

    // console.log('current observatory', currentObservatory);
    // console.log('current telescope', currentTelescope);
    // console.log('instrument', currentInstrument);

    return (
      <div className="reserve-by-telescope">

        <TelescopeSelection
          theme={`light`}
          observatoryList={observatoryList}
          params={params}
          showUTCTimer={false}
          rootRoute={`reservations/reserve-by-telescope`}
          appendToRoute={`/${reservationDate}`}
        />

        <CurrentSelectionHeader
          telescopeIcon={currentObservatory.obsLogoURL}
          teleName={currentTelescope.teleName}
          teleSponsorLinkURL={currentTelescope.teleSponsorLinkURL}
          teleSponsorLogoURL={currentTelescope.teleSponsorLogoURL}
          instrTelescopeName={currentInstrument.instrTelescopeName}
        />

      	<DateSelectionNavigation
          routeRoot={rootRoute}
          reservationDate={reservationDate}
          obsId={currentObservatory.obsId}
          domeId={currentInstrument.instrDomeId}
          telescopeId={currentTelescope.teleId}
        />

        <Listings />
      </div>
    );
  }
}

export default ReserveMissions;
