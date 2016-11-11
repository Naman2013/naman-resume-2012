import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import moment from 'moment';
import NewMissionCard from '../components/missions/new-mission-card';

@connect(({ missions }) => ({
  cardList: missions.cardList || [],
  reservations: missions.reservations || []
}))

export default class NewMissions extends React.Component {
  static propTypes = {
    cardList: PropTypes.array,
    openConfirmModal: PropTypes.func.isRequired,
    reservations: PropTypes.array,
  };

  render() {
    const { cardList, openConfirmModal, reservations } = this.props;
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

        {
          reservations.length > 0 && cards && cards.map(card => (
            <NewMissionCard
              key={card.uniqueId}
              card={card}
              openModal={openConfirmModal}
              featured={card.cardType == 2}
              reservation={ reservations.find((reservations => reservations.uniqueId == card.uniqueId))}
            />
          ))
        }

      </div>
    );
  }
}
