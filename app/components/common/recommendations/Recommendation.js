import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PiggybackStatus from './PiggybackStatus';
import { fetchRecommendsCards } from '../../../api/recommendations/recommends-cards';
import { getNextPiggyback } from '../../../api/recommendations/get-next-piggyback';
import { getNextPiggybackSingle } from '../../../modules/Missions';
import s from './Recommendation.scss';

const mapDispatchToProps = () => ({
  actions: bindActionCreators({

  }),
});

@connect(null, mapDispatchToProps)
class Recommendation extends Component {
  static defaultProps = {
    at: null,
    token: null,
    cid: null,
    type: 'community',
  }

  static propTypes = {
    at: PropTypes.number,
    token: PropTypes.string,
    cid: PropTypes.string,
    objectId: PropTypes.number.isRequired,
    type: PropTypes.oneOf(['community']),
  }

  constructor(props) {
    super(props);
    const { at, token, cid, objectId, type } = this.props;
    fetchRecommendsCards({ at, token, cid, objectId, type })
    .then(result => this.handleCardResult(result.data))
    .catch(error => this.handleCardError(error));
  }

  state = {
    cardApiError: false,
    cardData: null,
    cardErrorMessage: null,
    cardErrorBody: null,
    piggybackResult: null,
  }

  handleCardResult(cardResult) {
    // TODO: now fetch a possible piggyback for the next upcoming mission for this card
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
    .then((result) => {
      this.setState({
        piggybackResult: result.data,
        cardApiError: cardResult.apiError,
        cardErrorMessage: cardResult.errorMsg,
        cardData: cardResult.cardList[0],
      });
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

  render() {
    const { cardData, piggybackResult, error, errorBody } = this.state;
    if (!cardData && !piggybackResult) {
      return null;
    }

    const {
      headline,
      objectIconURL,
      title,
      description,
    } = cardData;

    const { apiError, missionList } = this.state.piggybackResult;
    const { missionAvailable, missionStart } = missionList[0];

    return (
      <div className={s.recommendationRoot}>

        <h4 className={s.title}>{headline}</h4>

        <div>
          <span>
            <img alt="" src={objectIconURL} height="60" />
          </span>
          <h3 className={s.objectName}>{title}</h3>
          <p className={s.description}>{description}</p>
        </div>

        {/** bottom half is dynamic based on result calls */}
        <PiggybackStatus
          missionAvailable={missionAvailable}
          missionStart={missionStart}
        />
      </div>
    );
  }
}

export default Recommendation;
