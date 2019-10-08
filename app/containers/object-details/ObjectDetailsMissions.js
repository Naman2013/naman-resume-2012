/** *********************************
 * V4 Object Details : Upcoming Missions
 *   Markdown support on elements????
 *   UTF-8 support....
 *   Multi-National Languages.....
 ********************************** */

import React, { Component, Fragment } from 'react';
import {withTranslation} from 'react-i18next';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { Button } from 'react-bootstrap';
import {
  setupCommunityMissionExpireTimer,
  stopCommunityMissionExpireTimer,
} from 'app/services/objects/timer';
import { Spinner } from 'app/components/spinner/index';
import { getCommunityMissions } from '../../modules/object-details/actions';
import {
  makeObjectDetailsMissionsSelector,
  makeObjectDetailsDataSelector,
  makeObjectDetailsFetchingSelector,
} from '../../modules/object-details/selectors';
import {
  makeQueueTabReservedCommunityMissionDataSelector,
  makeQueueTabReservedCommunityMissionSelector,
} from '../../modules/telescope/selectors';
import {
  reserveCommunityMission,
} from '../../modules/telescope/thunks';
import {
  makeUserSelector,
} from '../../modules/user/selectors';
import { FeaturedObjectsModal } from 'app/modules/telescope/components/featured-objects-modal';
import { MissionSuccessModal } from 'app/modules/missions/components/mission-success-modal';
import { MissionCard } from '../../modules/object-details/components/mission-card';
import DeviceProvider from '../../../app/providers/DeviceProvider';
import ObjectDetailsSectionTitle from '../../components/object-details/ObjectDetailsSectionTitle';
import MissionTile from 'app/components/common/tiles/MissionTile';
import CenterColumn from '../../../app/components/common/CenterColumn';
import messages from './ObjectDetails.messages';
import './ObjectDetailsMissions.scss';

const mapStateToProps = createStructuredSelector({
  missionData: makeObjectDetailsMissionsSelector(),
  reservedCommunityMissionData: makeQueueTabReservedCommunityMissionDataSelector(),
  reservedCommunityMission: makeQueueTabReservedCommunityMissionSelector(),
  user: makeUserSelector(),
  objectDetails: makeObjectDetailsDataSelector(),
  isFetching: makeObjectDetailsFetchingSelector(),
});

const mapDispatchToProps = {
  getCommunityMissions,
  reserveCommunityMission,
};

@connect(
  mapStateToProps,
  mapDispatchToProps
)
@withTranslation
class Missions extends Component {
  state = {
    reservationModalVisible: false,
    selectedMission: {},
    successModalShow: false,
    missionListExpired: false,
  };

  componentDidMount() {
    this.getCommunityMissions();
  }

  componentWillUnmount() {
    stopCommunityMissionExpireTimer();
  }

  getCommunityMissions = () => {
    const {
      getCommunityMissions,
      params: { objectId },
    } = this.props;
    stopCommunityMissionExpireTimer();
    getCommunityMissions(objectId).then(({ data }) => {
      const timerTime = data.expires - data.timestamp;
      this.setState({ missionListExpired: false });
      setupCommunityMissionExpireTimer(timerTime, () =>
        this.setState({ missionListExpired: true })
      );
    });;
  }

  reserveCommunityMission = () => {
    const { reserveCommunityMission, missionData } = this.props;
    const { selectedMission } = this.state;
    const { scheduledMissionId, missionStart } = selectedMission;
    const { callSource } = missionData;

    reserveCommunityMission({
      callSource,
      scheduledMissionId,
      missionStart,
    }).then(() => this.setState({ successModalShow: true, reservationModalVisible: false, }));
  }

  reservationModalShow = mission => {
    this.setState({ reservationModalVisible: true, selectedMission: mission });
  }

  reservationModalHide = () => {
    this.setState({ reservationModalVisible: false, selectedMission: {} });
  };

  modalClose = () => {
    this.setState({ successModalShow: false, selectedMission: {} });
    this.getCommunityMissions();
  }

  render() {
    const {
      params: { objectId },
      objectDetails,
      missionData,
      t,
      user,
      reservedCommunityMissionData,
      reservedCommunityMission,
      isFetching
    } = this.props;
    const { missionCount, missionList, explanation } = missionData;
    const { reservationModalVisible, selectedMission, successModalShow, missionListExpired } = this.state;

    return (
      <Fragment>
        <Spinner
          loading={isFetching}
        />
        <DeviceProvider>
          <ObjectDetailsSectionTitle
            title={`${objectDetails.objectTitle}'s`}
            subTitle={t('.UpcomingMissions')}
            renderNav={() => (
              <div className="object-details-missions-actions">
                {missionListExpired && (
                  <Button
                    onClick={this.getCommunityMissions}
                  >
                    Refresh
                  </Button>
                )}
              </div>
            )}
          />
        </DeviceProvider>
        <CenterColumn>
          {missionCount > 0 ? (
            <div style={{margin: '0 20px 40px'}}>
              {missionList.map(item => (
                <div className={`mission-card-container${missionListExpired ? ' mission-expired' : ''}`}>
                  <MissionCard
                    key={item.scheduledMissionId}
                    timeSlot={item}
                    onClickHandler={() => this.reservationModalShow(item)}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div>
              {!isFetching && explanation}
            </div>
          )}
        </CenterColumn>

        {reservationModalVisible && (
          <FeaturedObjectsModal
            onHide={this.reservationModalHide}
            onComplete={this.reserveCommunityMission}
            selectedMission={selectedMission}
            user={user}
            onMissionView={this.reserveCommunityMission}
            show
          />
        )}

        <MissionSuccessModal
          show={successModalShow}
          onHide={this.modalClose}
          reservedMissionData={selectedMission}
          reservedMission={reservedCommunityMissionData}
          missionSlot={reservedCommunityMission}
        />
      </Fragment>
    );
  }
}

Missions.propTypes = {
  intl: intlShape.isRequired,
};

export default Missions;
