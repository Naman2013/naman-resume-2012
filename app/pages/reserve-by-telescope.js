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
import GenericLoadingBox from '../components/common/loading-screens/generic-loading-box';
import Listings from '../components/telescopes/listings/listings';

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      getObservatoryList,
    }, dispatch)
  };
}

function mapStateToProps({ missions, telescopeOverview, missionSlotsByTelescope }, ownProps) {
  return {
    observatoryList: telescopeOverview.observatoryList,
    currentObservatoryId: ownProps.params.obsUniqueId,
    missions,
    cardList: missions.cardList || [],
    missionSlotsByTelescope,
  };
}

@connect(mapStateToProps, mapDispatchToProps)
class ReserveMissions extends Component {

  componentWillMount() {
    window.scrollTo(0, 0);
  }

  componentDidMount() {
    this.props.actions.getObservatoryList(
      this.props.currentObservatoryId,
    );
  }

  render() {
    const { observatoryList, params, missionSlotsByTelescope } = this.props;
    const { reservationListIsFetching, reservationList } = missionSlotsByTelescope;
    const currentObservatory = getCurrentObservatory(observatoryList, params.obsUniqueId);

    if(!currentObservatory) { return null; }

    const currentTelescope = currentObservatory.obsTelescopes.find(telescope => telescope.teleUniqueId === params.teleUniqueId);
    const currentInstrument = currentTelescope.teleInstrumentList[0];
    const rootRoute = `reservations/reserve-by-telescope/${params.obsUniqueId}/${params.teleUniqueId}`;

    // console.log('current observatory', currentObservatory);
    // console.log('current telescope', currentTelescope);
    // console.log('instrument', currentInstrument);
    // console.log(missionSlotsByTelescope);

    return (
      <div className="reserve-by-telescope">

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

      	<DateSelectionNavigation
          routeRoot={rootRoute}
          obsId={currentObservatory.obsId}
          domeId={currentInstrument.instrDomeId}
          telescopeId={currentTelescope.teleId}
        />

        {
          reservationListIsFetching ?
          <GenericLoadingBox />
          :
          <Listings
            telescopeId={currentTelescope.teleId}
            reservations={reservationList.missionList}
            allowReservations={reservationList.allowReservations}
          />
        }
      </div>
    );
  }
}

export default ReserveMissions;
