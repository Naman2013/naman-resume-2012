import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Sticky from 'react-stickynode';
import {
  getObservatoryList,
  getCurrentObservatory } from '../modules/Telescope-Overview';

import TelescopeSelection from '../components/telescopes/selection-widget/telescope-selection';
import CurrentSelectionHeader from '../components/telescopes/current-selection-header/header';
import DateSelectionNavigation from '../components/telescopes/date-selection-navigation/date-selection-navigation';
import GenericLoadingBox from '../components/common/loading-screens/generic-loading-box';
import Listings from '../components/telescopes/listings/listings';
import s from './reserve-by-telescope.scss';

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      getObservatoryList,
    }, dispatch),
  };
}

function mapStateToProps({ missions, telescopeOverview, missionSlotsByTelescope }, ownProps) {
  return {
    observatoryList: telescopeOverview.observatoryList.observatoryList,
    currentObservatoryId: ownProps.params.obsUniqueId,
    missions,
    cardList: missions.cardList || [],
    missionSlotsByTelescope,
  };
}

@connect(mapStateToProps, mapDispatchToProps)
class ReserveMissions extends Component {
  componentWillMount() {
    this.props.actions.getObservatoryList(this.props.currentObservatoryId, 'byTelescope');
  }

  render() {
    const { observatoryList, params, missionSlotsByTelescope } = this.props;
    const { reservationListIsFetching, reservationList } = missionSlotsByTelescope;
    const currentObservatory = getCurrentObservatory(observatoryList, params.obsUniqueId);

    if (!currentObservatory) { return null; }

    const currentTelescope = currentObservatory.obsTelescopes.find(telescope => telescope.teleUniqueId === params.teleUniqueId);
    const currentInstrument = currentTelescope.teleInstrumentList[0];
    const rootRoute = `reservations/reserve-by-telescope/${params.obsUniqueId}/${params.teleUniqueId}`;

    return (
      <div className="reserve-by-telescope" id="reserve-by-telescope">

        <TelescopeSelection
          theme="light"
          observatoryList={observatoryList}
          params={params}
          showUTCTimer={false}
          rootRoute="/reservations/reserve-by-telescope/telescope"
        />

        <Sticky
          activeClass="sticky"
          bottomBoundary="#reserve-by-telescope"
          enabled={true}
          innerZ="10"
          top="#mainHeader"
        >
          <div className={s.stickyNavigationContainer}>
            <CurrentSelectionHeader
              telescopeIcon={currentObservatory.obsLogoURL}
              teleName={currentObservatory.obsName}
              teleSponsorLinkURL={currentTelescope.teleSponsorLinkURL}
              teleSponsorLogoURL={currentTelescope.teleSponsorLogoURL}
              instrTelescopeName={currentTelescope.teleName}
            />
            <DateSelectionNavigation
              routeRoot={rootRoute}
              obsId={currentObservatory.obsId}
              domeId={currentInstrument.instrDomeId}
              telescopeId={currentTelescope.teleId}
            />
          </div>
        </Sticky>

        {
          reservationListIsFetching ?
            <GenericLoadingBox />
          :
            <Listings
              obsId={currentObservatory.obsId}
              domeId={currentInstrument.instrDomeId}
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
