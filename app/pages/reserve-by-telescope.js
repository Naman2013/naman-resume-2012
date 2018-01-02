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
import { white } from '../styles/variables/colors';
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
        <Sticky
          enabled
          activeClass="sticky"
          bottomBoundary="#reserve-by-telescope"
          innerZ="10"
          top="#mainHeader"
        >
          <div className="sticky-container">

            <div className="navigation-container">
              <TelescopeSelection
                theme="light"
                observatoryList={observatoryList}
                params={params}
                showUTCTimer={false}
                rootRoute="/reservations/reserve-by-telescope/telescope"
              />
            </div>

            <div className={`${s.stickyNavigationContainer} clearfix`}>
              <div className="current-selection-header-container col-md-4">
                <CurrentSelectionHeader
                  telescopeIcon={currentObservatory.obsLogoURL}
                  teleName={currentObservatory.obsName}
                  teleSponsorLinkURL={currentTelescope.teleSponsorLinkURL}
                  teleSponsorLogoURL={currentTelescope.teleSponsorLogoURL}
                  instrTelescopeName={currentTelescope.teleName}
                />
              </div>
              <div className="col-md-8">
                <div className="date-selection-container">
                  <DateSelectionNavigation
                    routeRoot={rootRoute}
                    obsId={currentObservatory.obsId}
                    domeId={currentInstrument.instrDomeId}
                    telescopeId={currentTelescope.teleId}
                  />
                </div>
              </div>
            </div>
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

        <style jsx>{`
          .sticky-container {
            background: ${white};
            width: 101%;
            margin-left: -8px;
          }

          .navigation-container {
            border-bottom: 1px solid #979797;
          }

          .current-selection-header-container {
            padding-top: 25px;
          }

          .date-selection-container {
            float: right;
            padding-top: 8px;
          }
        `}</style>
      </div>
    );
  }
}

export default ReserveMissions;
