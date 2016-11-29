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
import DatesSelection from '../components/telescopes/current-selection-header/dates-selection';
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
      this.props.user,
      this.props.currentObservatoryId
    );
  }

  render() {
    const { observatoryList, params } = this.props;
    const currentObservatory = getCurrentObservatory(observatoryList, params.obsUniqueId);

    if(!currentObservatory) { return null; }
    const currentTelescope = currentObservatory.obsTelescopes.find(telescope => telescope.teleUniqueId === params.teleUniqueId);
    const currentInstrument = currentTelescope.teleInstrumentList[0];

    console.log('current observatory', currentObservatory);
    console.log('current telescope', currentTelescope);
    console.log('current instrument', currentInstrument);

    return (
      <div className="reserve-by-telescope container-fluid">

        <TelescopeSelection
          theme={`light`}
          observatoryList={observatoryList}
          params={params}
          showUTCTimer={false}
          rootRoute={`reservations/reserve-by-telescope`}
        />

        <CurrentSelectionHeader
          telescopeIcon={currentObservatory.obsLogoURL}
          teleName={currentTelescope.teleName}
          teleSponsorLinkURL={currentTelescope.teleSponsorLinkURL}
          teleSponsorLogoURL={currentTelescope.teleSponsorLogoURL}
          instrTelescopeName={currentInstrument.instrTelescopeName}
        />

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
