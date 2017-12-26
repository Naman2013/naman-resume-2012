import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MissionTime from '../partials/mission-time';
import ShareMission from '../partials/share-mission';
import UserDetails from '../partials/user-details';
import APP_DEFAULTS from '../../../../constants/defaults';
import {
  grabPiggybackByTelescope,
  resetMissionAvailability,
} from '../../../../modules/Piggyback';

import { editCoordinateMission } from '../../../../modules/mission-slots-by-telescope/mission-slots-by-telescope-actions';

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    grabPiggybackByTelescope,
    resetMissionAvailability,
    editCoordinateMission,
  }, dispatch),
});

@connect(null, mapDispatchToProps)
class MissionReserved extends Component {
  constructor(props) {
    super(props);
    this.handlePiggybackClick = this.handlePiggybackClick.bind(this);
  }

  handlePiggybackClick(event) {
    event.preventDefault();
    const { uniqueId, scheduledMissionId } = this.props;
    this.props.actions.grabPiggybackByTelescope({ uniqueId, scheduledMissionId });
  }

  handleEditCoordinatesClick = (event) => {
    event.preventDefault();
    const { missionIndex } = this.props;
    this.props.actions.editCoordinateMission(missionIndex);
  }

  renderMissionStatus() {
    const {
      showPiggybackButton,
      showShareMissionIcons,
      shareMissionIconsText,
      showEditCoordinatesButton,
     } = this.props;

    if (showPiggybackButton) {
      return (
        <div className="col-xs-2 piggyback-on-mission-action">
          <button
            data-tip={APP_DEFAULTS.PIGGYBACK_SHORT_DESCRIPTION}
            onClick={this.handlePiggybackClick}
            className="btn-primary"
          >
            Piggyback on Mission
          </button>
        </div>
      );
    }

    if (showShareMissionIcons || shareMissionIconsText) {
      return (
        <ShareMission
          showShareMissionIcons={showShareMissionIcons}
          shareMissionIconsText={shareMissionIconsText}
        />
      );
    }

    if (showEditCoordinatesButton) {
      return (
        <div className="col-xs-2 piggyback-on-mission-action">
          <button onClick={this.handleEditCoordinatesClick} className="btn-primary">
            Edit Coordinates
          </button>
        </div>
      );
    }

    return null;
  }

  render() {
    const {
      slotIconURL,
      missionStart,
      slotTitle,
      showSlotTimes } = this.props;

    const containerClassnames = classnames({
      'telescope-listings-item': 1,
      reserved: 1,
    });

    return (
      <li className={containerClassnames}>

        <div className="col-xs-2">
          {
            showSlotTimes ?
              <MissionTime
                startTime={missionStart}
              /> : null
          }
        </div>

        <div className="col-xs-4 slot-description">
          <img className="slot-logo" src={slotIconURL} width="38" alt="" />
          <h4 className="slot-name">{slotTitle}</h4>
        </div>

        <UserDetails {...this.props} />

        {
          this.renderMissionStatus()
        }
      </li>
    );
  }
}

const { string, number, bool } = PropTypes;
MissionReserved.propTypes = {
  showSloohUser: bool.isRequired,

  showUserDetails: bool.isRequired,
  ownerDisplayName: string.isRequired,
  ownerMembershipType: string.isRequired,
  ownerGuardianFlag: bool.isRequired,
  ownerMemberSince: string.isRequired,
  ownerAvatarURL: string.isRequired,
  ownerLocation: string.isRequired,

  slotIconURL: string.isRequired,
  missionStart: number.isRequired,
  slotTitle: string.isRequired,

  showPiggybackButton: bool.isRequired,
  showShareMissionIcons: bool.isRequired,
  shareMissionIconsText: string.isRequired,

  uniqueId: string.isRequired,
  scheduledMissionId: number.isRequired,
  callSource: string,
  missionType: string.isRequired,
  showSlotTimes: bool.isRequired,
  showEditCoordinatesButton: bool.isRequired,
};

MissionReserved.defaultProps = {
  callSource: null,
};

export default MissionReserved;
