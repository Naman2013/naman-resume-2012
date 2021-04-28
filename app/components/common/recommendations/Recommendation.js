// todo remove me
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import truncate from 'lodash/truncate';
import ReactTooltip from 'react-tooltip';
import PiggybackStatus from './PiggybackStatus';
import { fetchRecommendsCards } from '../../../services/recommendations/recommends-cards';
import { getNextPiggyback } from '../../../services/recommendations/get-next-piggyback';
import { getNextReservation } from '../../../services/recommendations/get-next-reservation';
import {
  getNextPiggybackSingle,
  getNextPiggybackSingleSuccess,
  grabMissionSlot,
  missionConfirmOpen,
  setCurrentCard,
} from '../../../modules/missions-old';
import { validateResponseAccess } from '../../../modules/authorization/actions';
import s from './Recommendation.scss';

const defaultState = {
  newMissionMode: false,

  cardApiError: false,
  cardData: null,
  cardErrorMessage: null,
  cardErrorBody: null,
  piggybackResult: null,

  newReservationResult: {
    missionList: {
      missionAvailable: false,
      missionStart: 0,
    },
  },
  newReservationError: false,

  piggybackConfirmed: false,
};

const mapStateToProps = ({ piggyback, missions }) => ({
  piggybackReservationConfirmed: piggyback.reservationConfirmed,
  newMissionJustReserved: missions.missionSlotJustReserved,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      getNextPiggybackSingle, //  TODO: do we still need this?
      getNextPiggybackSingleSuccess,
      grabMissionSlot,
      missionConfirmOpen,
      validateResponseAccess,
      setCurrentCard,
    },
    dispatch
  ),
});

@connect(
  mapStateToProps,
  mapDispatchToProps
)
class Recommendation extends Component {
  static defaultProps = {
    at: null,
    token: null,
    cid: null,
    type: 'community',
  };

  static propTypes = {
    at: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    token: PropTypes.string,
    cid: PropTypes.string,
    objectId: PropTypes.number.isRequired,
    type: PropTypes.oneOf(['community']),
  };

  constructor(props) {
    super(props);
    this.initialize();
  }

  state = { ...defaultState };

  componentWillReceiveProps() {
    // if either a new mission or piggyback had occurred reset the card
    const {
      piggybackReservationConfirmed,
      newMissionJustReserved,
    } = this.props;
    if (piggybackReservationConfirmed || newMissionJustReserved) {
      this.reset();
    }
  }

  reset() {
    this.setState({ ...defaultState });
    this.initialize();
  }

  initialize() {
    const { at, token, cid, objectId, type } = this.props;
    fetchRecommendsCards({ at, token, cid, objectId, type })
      .then(result => this.handleCardResult(result.data))
      .catch(error => this.handleCardError(error));
  }

  handleCardResult(cardResult) {
    // fetch a possible piggyback for the next upcoming mission for this card
    const { apiError } = cardResult;
    if (!apiError) {
      this.fetchPiggybackInfo(cardResult);
    }
  }

  fetchPiggybackInfo(cardResult) {
    const { at, token, cid, objectId, type } = this.props;
    const { uniqueId } = cardResult.cardList[0];
    getNextPiggyback({
      at,
      token,
      cid,
      objectId,
      type,
      uniqueId,
      requestType: 'single',
    })
      .then(result => {
        this.props.actions.validateResponseAccess(result.data);

        if (!result.data.apiError) {
          this.setState({
            piggybackResult: result.data,
            cardApiError: cardResult.apiError,
            cardErrorMessage: cardResult.errorMsg,
            cardData: cardResult,
          });
        }
      })
      .catch(error => this.handleCardError(error));
  }

  handleCardError(error) {
    this.setState({
      cardApiError: true,
      cardData: null,
      cardErrorBody: error,
    });
  }

  handleReservePiggybackClick = event => {
    event.preventDefault();

    const { piggybackResult, cardData } = this.state;
    this.props.actions.setCurrentCard(cardData.cardList[0]);
    this.props.actions.getNextPiggybackSingleSuccess(piggybackResult);
  };

  handleLoadReservationClick = event => {
    event.preventDefault();
    const { cid, at, token } = this.props;
    const { uniqueId, astroObjectId } = this.state.cardData.cardList[0];
    getNextReservation({
      cid,
      at,
      token,
      uniqueId,
      objectId: astroObjectId,
      requestType: 'single',
    }).then(result => {
      this.props.actions.validateResponseAccess(result.data);
      if (!result.data.apiError) {
        this.handleLoadNewReservationResult(result.data);
      }
    });
  };

  handleLoadNewReservationResult(newReservationResult) {
    this.setState({
      newReservationResult,
      newMissionMode: true,
    });
  }

  handleLoadNewReservationError(error) {
    // console.log('there was an error with fetching the reservation info...');
   
  }

  onSuccessReserveNewMission = () => {
    this.props.actions.missionConfirmOpen('reserve', card);
  };

  handleReserveNewMissionClick = event => {
    event.preventDefault();
    const {
      newReservationResult: { missionList },
      cardData: { cardList },
    } = this.state;
    const card = cardList[0];
    const mission = {
      ...missionList,
      callSource: 'recommends',
      objectTitle: card.title,
      objectType: card.objectType,
      onSuccessCallback: this.onSuccessReserveNewMission,
    };

    this.props.actions.grabMissionSlot(mission);
  };

  render() {
    const {
      cardData,
      piggybackResult,
      newReservationResult,
      newMissionMode,
    } = this.state;

    if (!cardData && !piggybackResult) {
      return null;
    }

    const {
      headline,
      objectIconURL,
      title,
      description,
    } = cardData.cardList[0];
    const truncatedDescription = truncate(description, {
      length: 150,
      omission: '...',
      separator: ' ',
    });
    const piggybackMissionResult = piggybackResult.missionList[0];

    const { missionList } = this.state.piggybackResult;
    const { missionAvailable, missionStart } = missionList[0];

    return (
      <div className={s.recommendationRoot}>
        <ReactTooltip className={s.tooltip} place="left" effect="solid" />

        <h4 className={s.title}>{headline}</h4>

        <div>
          <span>
            <img alt="" src={objectIconURL} height="60" />
          </span>
          <h3 className={s.objectName}>{title}</h3>
          <p data-tip={description} className={s.description}>
            {truncatedDescription}
          </p>
        </div>

        {/** bottom half is dynamic based on result calls */}
        <PiggybackStatus
          newMissionMode={newMissionMode}
          piggybackAvailable={missionAvailable}
          piggybackMissionStart={missionStart}
          userHasReservation={piggybackMissionResult.userHasReservation}
          telescopePierName={piggybackMissionResult.telescopePierName}
          newMissionAvailable={
            newReservationResult.missionList.missionAvailable
          }
          newMissionMissionStart={newReservationResult.missionList.missionStart}
          handleReservePiggybackClick={this.handleReservePiggybackClick}
          handleLoadReservationClick={this.handleLoadReservationClick}
          handleReserveNewMissionClick={this.handleReserveNewMissionClick}
        />
      </div>
    );
  }
}

export default Recommendation;
