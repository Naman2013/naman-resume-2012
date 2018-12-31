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
import {
  fetchObjectDetailsAction,
  fetchObjectMissionsAction,
} from '../../modules/object-details/actions';
import DeviceProvider from '../../../app/providers/DeviceProvider';
import ObjectDetailsSectionTitle from '../../components/object-details/ObjectDetailsSectionTitle';
import MissionTile from 'components/common/tiles/MissionTile';
import CenterColumn from '../../../app/components/common/CenterColumn';
import messages from './ObjectDetails.messages';

const mapStateToProps = ({ objectDetails, appConfig, user }) => ({
  objectMissions: objectDetails.objectMissions,
  objectDetails: objectDetails.objectDetails,
  appConfig,
  user,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      fetchObjectDetailsAction,
      fetchObjectMissionsAction,
    },
    dispatch,
  ),
});

@connect(
  mapStateToProps,
  mapDispatchToProps,
)
class Missions extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      params: { objectId },
      objectDetails,
      objectMissions,
      intl,
    } = this.props;

    return (
      <Fragment>
        <DeviceProvider>
          <ObjectDetailsSectionTitle
            title={`${objectDetails.objectTitle}'s`}
            subTitle={intl.formatMessage(messages.UpcomingMissions)}
          />
        </DeviceProvider>
        <CenterColumn>
          {objectMissions && objectMissions.missionsCount > 0 ? (
            <div>
              {Object.keys(objectMissions.missionsList).map(key => (
                <MissionTile
                  key={`mission_${key}`}
                  title={objectMissions.missionsList[key].title}
                  telescope={objectMissions.missionsList[key].missionDetails.telescope.itemText}
                  dat={objectMissions.missionsList[key].missionDetails.date.itemText}
                  thyme={objectMissions.missionsList[key].missionDetails.time.itemText.slice(0, -4)}
                />
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
