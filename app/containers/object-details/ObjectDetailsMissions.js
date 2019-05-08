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
  makeUserSelector,
} from '../../modules/user/selectors';
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
};

@connect(
  mapStateToProps,
  mapDispatchToProps
)
class Missions extends Component {
  componentDidMount() {
    const {
      getCommunityMissions,
      params: { objectId },
    } = this.props;
    getCommunityMissions(objectId);
  }

  render() {
    const {
      params: { objectId },
      objectDetails,
      missionData,
      intl,
    } = this.props;
    const { missionCount, missionList } = missionData;

    console.log('PROPS', this.props);
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
                <MissionTimeSlot
                  key={item.scheduledMissionId}
                  timeSlot={item}
                  //getTelescopeSlot={() => getTelescopeSlot(item)}
                />
                // <MissionTimeSlot
                //   key={`mission_${key}`}
                //   title={objectMissions.missionsList[key].title}
                //   telescope={
                //     objectMissions.missionsList[key].missionDetails.telescope
                //       .itemText
                //   }
                //   date={
                //     objectMissions.missionsList[key].missionDetails.date
                //       .itemText
                //   }
                //   time={objectMissions.missionsList[
                //     key
                //   ].missionDetails.time.itemText.slice(0, -4)}
                // />
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
      </Fragment>
    );
  }
}

Missions.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(Missions);
