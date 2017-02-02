import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
import InlineCountdown from '../../../common/inline-countdown/inline-countdown';
import MissionTime from '../partials/mission-time';
import ByUserTag from '../../../common/by-user-tag/by-user-tag';
import { startCompleteReservation } from '../../../../modules/mission-slots-by-telescope/mission-slots-by-telescope-actions';

const FinishReservationButton = ({handleFinishReservationClick}) => (
  <div className="col-xs-2">
    <button onClick={handleFinishReservationClick} className="btn-primary">
      Finish Reservation
    </button>
  </div>
);

const CountDown = ({expires}) => (
  <div className="col-xs-2 hold-timer-content">
    <h5 className="hold-timer"><InlineCountdown startTime={expires} /></h5>
    <p className="title">Hold time remaining.</p>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    startCompleteReservation,
  }, dispatch),
});

@connect(null, mapDispatchToProps)
class MissionOnHold extends Component {
  constructor(props) {
    super(props);

    this.handleFinishReservationClick = this.handleFinishReservationClick.bind(this);
  }

  handleFinishReservationClick(event) {
    event.preventDefault();
    this.props.actions.startCompleteReservation(this.props.missionIndex);
  }

  render() {
    const {
      missionStart,
      showSlotTimes,
      expires,
      ownerAvatarURL,
      ownerDisplayName,
      ownerLocation,
      ownerMembershipType,
      ownerMemberSince,
      showFinishReservationButton,
      userHasHold
    } = this.props;


    return (
      <li className="telescope-listings-item on-hold">

        <div className="col-xs-2">
          {
            showSlotTimes ?
            <MissionTime
              startTime={missionStart}
            /> : null
          }
        </div>

        <div className="col-md-4 slot-description">
          <img className="slot-logo" src="assets/icons/question-mark.png" width="38" alt="This slot is marked as on hold" />
          {
            userHasHold ?
              <h4 className="slot-name">On Hold. Finish Reservation Within <InlineCountdown startTime={expires} /></h4>
            :
              <h4 className="slot-name">On Hold. Object Not Yet Set.</h4>
          }

        </div>

        <div className="col-xs-4 reserved-by-user-content">
          <h3 className="title">Reserved by:</h3>
          <ByUserTag
            theme="light"
            photo={ownerAvatarURL}
            name={ownerDisplayName}
            accountType={ownerMembershipType}
            location={ownerLocation}
            memberSince={ownerMemberSince}
          />
        </div>

        {
          showFinishReservationButton ?
            <FinishReservationButton handleFinishReservationClick={this.handleFinishReservationClick} />
            :
            <CountDown expires={expires} />
        }

      </li>
    );
  }
}

const { string, number, bool } = PropTypes;
MissionOnHold.propTypes = {
  showSlotTimes: bool.isRequired,
  missionStart: number.isRequired,
  expires: number.isRequired,
  userHasHold: bool.isRequired,

  ownerAvatarURL: string.isRequired,
  ownerDisplayName: string.isRequired,
  ownerLocation: string.isRequired,
  ownerMembershipType: string.isRequired,
  ownerMemberSince: string.isRequired,

  showFinishReservationButton: bool.isRequired,

  missionIndex: number.isRequired,
};

export default MissionOnHold;
