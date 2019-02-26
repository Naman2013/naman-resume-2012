/** *********************************
 * V4 Related Shows populated with info
 *
 *
 *
 ********************************** */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WinstonTile from '../common/tiles/WinstonTile';
import FlipedCard from '../common/tiles/show-excerpt-tile-hub';

import styles from './RelatedShows.style';

const { arrayOf, bool, number, shape } = PropTypes;

class BootstrappedRelatedShows extends Component {
  static propTypes = {
    isDesktop: bool,
    showList: arrayOf(shape()),
    showCount: number,
  };

  static defaultProps = {
    isDesktop: false,
    showList: [],
    showCount: 0,
  };

  render() {
    const { showList } = this.props;

    return (
      <div className="root">
        {showList.length > 0 &&
          showList.map(show => {
            return (
              <article>
                <div className="card">
                  <WinstonTile
                    title={show.showTitle}
                    linkUrl={show.linkUrl}
                    linkText={show.linkText}
                    theme={{
                      backgroundSize: 'cover',
                      backgroundImage:
                        "url('https://vega.slooh.com/assets/v4/common/show_card_bg.jpg')",
                    }}
                  />
                </div>
                <div className="flipped">
                  <FlipedCard
                    {...show}
                    eventTitle={show.showTitle}
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
