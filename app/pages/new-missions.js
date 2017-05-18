import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import NewMissionCard from '../components/missions/new-mission-card';
import GenericLoadingBox from '../components/common/loading-screens/generic-loading-box';

@connect(({ missions }) => ({
  cardList: missions.cardList || [],
  reservations: missions.reservations || [],
  fetchingCards: missions.fetchingCards,
  fetchingMissions: missions.fetchingMissions,
}))

class NewMissions extends Component {
  get cardList() {
    const { cardList } = this.props;
    return cardList.filter((card) => {
      if (card.missionAvailable) {
        return false;
      }
      const endDate = moment.unix(card.end);
      return !moment().isAfter(endDate, 'days');
    });
  }

  render() {
    const { openConfirmModal, reservations, fetchingCards, fetchingMissions } = this.props;

    return (
      <div className="new-missions">
        {
          (fetchingCards || fetchingMissions) ?
            <GenericLoadingBox />
            :
            this.cardList.map(card => (
              <NewMissionCard
                key={card.uniqueId}
                card={card}
                openModal={openConfirmModal}
                featured={card.cardType == 2}
                reservation={reservations.find((reservation => reservation.uniqueId == card.uniqueId))}
              />
            ))
        }
      </div>
    );
  }
}

NewMissions.defaultProps = {
  cardList: [],
  reservations: [],
  fetchingCards: false,
  fetchingMissions: false,
};

NewMissions.propTypes = {
  fetchingCards: PropTypes.bool,
  fetchingMissions: PropTypes.bool,
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
  reservations: PropTypes.arrayOf(PropTypes.shape({
    domeId: PropTypes.number.isRequired,
    expires: PropTypes.number.isRequired,
    missionAvailable: PropTypes.bool.isRequired,
    missionIndex: PropTypes.number.isRequired,
    missionStart: PropTypes.number.isRequired,
    objectId: PropTypes.number.isRequired,
    obsId: PropTypes.string.isRequired,
    scheduledMissionId: PropTypes.number.isRequired,
    telescopeId: PropTypes.string.isRequired,
    uniqueId: PropTypes.string.isRequired,
    userHasReservation: PropTypes.bool.isRequired,
    userReservationType: PropTypes.string.isRequired,
  })),
  openConfirmModal: PropTypes.func,
};

export default NewMissions;
