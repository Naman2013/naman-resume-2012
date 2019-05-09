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
import { MissionTimeSlot } from '../../modules/missions/components/mission-time-slot';
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

  getCommunityMissions = () => {
    const {
      getCommunityMissions,
      params: { objectId },
    } = this.props;
    getCommunityMissions(objectId);
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
            <div>
              {missionList.map(item => (
                <div 
                onClick={() => this.reservationModalShow(item)}>
                  <MissionTimeSlot
                    key={item.scheduledMissionId}
                    timeSlot={item}
                    getTelescopeSlot={() => this.reservationModalShow(item)}
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
