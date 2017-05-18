import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import moment from 'moment';
import ExistingMissionCard from '../components/missions/existing-mission-card';
import GenericLoadingBox from '../components/common/loading-screens/generic-loading-box';

@connect(({ missions }) => ({
  cardList: missions.cardList,
  piggybacks: missions.piggybacks,
  fetchingCards: missions.fetchingCards,
  fetchingPiggybacks: missions.fetchingPiggybacks,
}))

class ExistingMissions extends Component {
  get cardList() {
    const cardList = this.props.cardList || [];

    return cardList.filter((card) => {
      if (card.missionAvailable) {
        return false;
      }
      const endDate = moment.unix(card.end);
      return !moment().isAfter(endDate, 'days');
    });
  }

  render() {
    const { cardList, piggybacks, fetchingCards, fetchingPiggybacks } = this.props;

    return (
      <div className="existing-missions clearfix">

        {
          (fetchingCards || fetchingPiggybacks) ?
            <GenericLoadingBox />
            :
            this.cardList.map(card => (
              <ExistingMissionCard
                key={card.uniqueId}
                className={classnames({
                  featured: card.cardType === 2,
                  'col-md-12': card.cardType === 2,
                  secondary: card.cardType !== 2,
                  'col-md-6': card.cardType !== 2,
                })}
                card={card}
                featured={card.cardType === 2}
                piggyback={piggybacks.find((piggyback) => piggyback.uniqueId == card.uniqueId)}
              />
            ))
        }
      </div>
    );
  }
}

ExistingMissions.defaultProps = {
  cardList: [],
  piggybacks: [],
  fetchingCards: false,
  fetchingPiggybacks: false,
};

ExistingMissions.propTypes = {
  fetchingCards: PropTypes.bool,
  fetchingPiggybacks: PropTypes.bool,
  cardList: PropTypes.arrayOf(PropTypes.shape({
    astroObjectId: PropTypes.string.isRequired,
    cardType: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    domeId: PropTypes.string.isRequired,
    end: PropTypes.string.isRequired,
    group: PropTypes.string.isRequired,
    headline: PropTypes.string.isRequired,
    lookaheadDaysPiggyback: PropTypes.string.isRequired,
    lookaheadDaysReservation: PropTypes.string.isRequired,
    objectIconURL: PropTypes.string.isRequired,
    objectType: PropTypes.string.isRequired,
    obsId: PropTypes.string.isRequired,
    recommendsId: PropTypes.string.isRequired,
    recommendsIndex: PropTypes.number.isRequired,
    recommendsType: PropTypes.string.isRequired,
    start: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    telescopeId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    uniqueId: PropTypes.string.isRequired,
  })),
  piggybacks: PropTypes.arrayOf(PropTypes.shape({
    domeId: PropTypes.number.isRequired,
    expires: PropTypes.number.isRequired,
    missionAvailable: PropTypes.bool.isRequired,
    missionIndex: PropTypes.number.isRequired,
    missionStart: PropTypes.number.isRequired,
    nextVisible: PropTypes.number.isRequired,
    objectId: PropTypes.number.isRequired,
    objectVisible: PropTypes.bool.isRequired,
    obsId: PropTypes.string.isRequired,
    scheduledMissionId: PropTypes.number.isRequired,
    telescopeId: PropTypes.string.isRequired,
    uniqueId: PropTypes.string.isRequired,
    userHasReservation: PropTypes.bool.isRequired,
    userReservationType: PropTypes.string.isRequired,
  })),
};

export default ExistingMissions;
