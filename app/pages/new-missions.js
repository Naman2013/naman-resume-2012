import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import moment from 'moment';
import MissionCard from '../components/missions/mission-card';

@connect(({ missions }) => ({
  cardList: missions.cardList || [],
  piggybacks: missions.piggybacks || [],
  reservations: missions.reservations || []
}))

export default class NewMissions extends React.Component {
  static propTypes = {
    cardList: PropTypes.array,
    openConfirmModal: PropTypes.func.isRequired,
    piggybacks: PropTypes.array,
    reservations: PropTypes.array,
  };

  render() {
    const { cardList, openConfirmModal, piggybacks, reservations } = this.props;

    let cards = null;
    if (cardList && Array.isArray(cardList)) {
      cards = cardList.filter(card => {
        if (card.missionAvailable) {
          return false;
        }
        const endDate = moment.unix(card.end);
        return !moment().isAfter(endDate, 'days');
      });
    }

    return (

      <div className="new-missions">
        {!cards && 'waiting...'}

        {cards && cards.map(card => (
          <MissionCard
            key={card.uniqueId}
            card={card}
            openModal={openConfirmModal}
            featured={card.cardType == 2}
            piggyback={ piggybacks.find((piggyback) => piggyback.uniqueId == card.uniqueId) }
            reservation={ reservations.find((reservations => reservations.uniqueId == card.uniqueId))}
          />
        ))}
      </div>
    );
  }
}
