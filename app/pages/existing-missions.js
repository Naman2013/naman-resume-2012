import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import moment from 'moment';
import ExistingMissionCard from '../components/missions/existing-mission-card';

@connect(({ missions }) => ({
  cardList: missions.cardList || [],
  piggybacks: missions.piggybacks || []
}))
export default class ExistingMissions extends Component {
  static propTypes = {
    cardList: PropTypes.array,
    piggybacks: PropTypes.array,
  };

  render() {
    const { cardList, piggybacks } = this.props;

    let cards = null;
    if (cardList && Array.isArray(cardList)) {
      cards = cardList.filter(card => {
        const endDate = moment.unix(card.end);
        return !moment().isAfter(endDate, 'days');
      });
    }

    return (
      <div className="existing-missions">

        {
          piggybacks.length > 0 && cards ? cards.map(card => (
            <ExistingMissionCard
              key={card.uniqueId}
              className={cx({
                featured: card.cardType === 2,
                'col-md-12': card.cardType === 2,
                secondary: card.cardType !== 2,
                'col-md-6': card.cardType !== 2,
              })}
              card={card}
              featured={card.cardType === 2}
              piggyback={ piggybacks.find((piggyback) => piggyback.uniqueId == card.uniqueId) }
            />
          )) : 'waiting...'
        }
      </div>
    );
  }
}
