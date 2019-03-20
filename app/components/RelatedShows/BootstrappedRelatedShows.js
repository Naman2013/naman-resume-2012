/** *********************************
 * V4 Related Shows populated with info
 *
 *
 *
 ********************************** */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import WinstonTile from '../common/tiles/WinstonTile';
import FlipedShowCard from '../common/tiles/show-excerpt-tile-hub';

import styles from './RelatedShows.style';

const { arrayOf, bool, number, shape, string } = PropTypes;

class BootstrappedRelatedShows extends Component {
  static propTypes = {
    relatedShowsList: arrayOf(shape()),
  };

  static defaultProps = {
    relatedShowsList: [],
  };

  render() {
    const { relatedShowsList } = this.props;

    return (
      <div className="root">
        {relatedShowsList.length > 0 &&
          relatedShowsList.map(show => {
            return (
              <article key={`show-${show.showId || show.eventId}`}>
                <div className="card">
                  <WinstonTile
                    key={`show-${show.showId || show.eventId}`}
                    title={show.showTitle || show.eventTitle}
                    linkUrl={show.linkUrl}
                    linkText={show.linkText || show.linkLabel}
                    theme={{
                      backgroundSize: 'cover',
                      backgroundImage:
                        "url('https://vega.slooh.com/assets/v4/common/show_card_bg.jpg')",
                    }}
                  />
                </div>
                <div className="flipped">
                  <FlipedShowCard
                    eventTitle={show.showTitle}
                    linkLabel={show.linkText}
                    linkUrl={show.linkURL}
                    shortDescription={show.eventDescription}
                    withinReletedSection
                  />
                </div>
              </article>
            );
          })}

        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default BootstrappedRelatedShows;
