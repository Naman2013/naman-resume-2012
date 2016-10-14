import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import moment from 'moment';
import MissionCard from '../components/missions/mission-card';

@connect(({ missions }) => ({
  cardList: missions.cardList || [],
  piggybacks: missions.piggybacks || []
}))
export default class ExistingMissions extends Component {
  static propTypes = {
    cardList: PropTypes.array,
    openConfirmModal: PropTypes.func.isRequired,
    piggybacks: PropTypes.array
  };

  render() {
    const { cardList, openConfirmModal, piggybacks } = this.props;

    //console.log('existing piggybacks');

    let cards = null;
    if (cardList && Array.isArray(cardList)) {
      cards = cardList.filter(card => {
        // if (!card.userHasReservation) {
        //   return false;
        // }

        const endDate = moment.unix(card.end);
        return !moment().isAfter(endDate, 'days');
      });
    }

    return (
      <div className="existing-missions">
        {!cards && 'waiting...'}

        {cards && cards.map(card => (
          <MissionCard
            key={card.uniqueId}
            className={cx({
              featured: card.cardType === 2,
              'col-md-12': card.cardType === 2,
              secondary: card.cardType !== 2,
              'col-md-6': card.cardType !== 2,
            })}
            card={card}
            openModal={openConfirmModal}
            featured={card.cardType === 2}
            piggyback={ piggybacks.find((piggyback) => piggyback.uniqueId == card.uniqueId) }
          />
        ))}
      </div>
    );
  }
}
