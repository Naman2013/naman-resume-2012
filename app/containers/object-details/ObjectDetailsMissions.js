/** *********************************
 * V4 Object Details : Upcoming Missions
 *   Markdown support on elements????
 *   UTF-8 support....
 *   Multi-National Languages.....
 ********************************** */

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import {
  setupCommunityMissionExpireTimer,
  stopCommunityMissionExpireTimer,
} from 'app/services/objects/timer';
import { getCommunityMissions } from '../../modules/object-details/actions';
import {
  makeObjectDetailsMissionsSelector,
  makeObjectDetailsDataSelector,
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

const mapStateToProps = createStructuredSelector({
  missionData: makeObjectDetailsMissionsSelector(),
  reservedCommunityMissionData: makeQueueTabReservedCommunityMissionDataSelector(),
  reservedCommunityMission: makeQueueTabReservedCommunityMissionSelector(),
  user: makeUserSelector(),
  objectDetails: makeObjectDetailsDataSelector(),
});

const mapDispatchToProps = {
  getCommunityMissions,
  reserveCommunityMission,
};

@connect(
  mapStateToProps,
  mapDispatchToProps
)
class Missions extends Component {
  state = {
    reservationModalVisible: false,
    selectedMission: {},
    successModalShow: false,
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
      setupCommunityMissionExpireTimer(timerTime, () =>
        this.getCommunityMissions()
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
      intl,
      user,
      reservedCommunityMissionData,
      reservedCommunityMission,
    } = this.props;
    const { missionCount, missionList } = missionData;
    const { reservationModalVisible, selectedMission, successModalShow } = this.state;

    return (
      <Fragment>
        <DeviceProvider>
          <ObjectDetailsSectionTitle
            title={`${objectDetails.objectTitle}'s`}
            subTitle={intl.formatMessage(messages.UpcomingMissions)}
          />
        </DeviceProvider>
        <CenterColumn>
          {missionCount > 0 ? (
            <div style={{margin: '0 20px 40px'}}>
              {missionList.map(item => (
                <div>
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
              <FormattedMessage
                {...messages.NoMissions}
                values={{ objectTitle: objectDetails.objectTitle }}
              />
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

export default injectIntl(Missions);
