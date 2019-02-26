/** *********************************
 * V4 Related Shows populated with info
 *
 *
 *
 ********************************** */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import WinstonTile from '../common/tiles/WinstonTile';
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
        {relatedShowsList.map(item => (
          <WinstonTile
            // TODO: make common fields for api
            key={`show-${item.showId || item.eventId}`}
            title={item.showTitle || item.eventTitle}
            linkUrl={item.linkUrl}
            linkText={item.linkText || item.linkLabel}
            theme={{
              backgroundSize: 'cover',
              backgroundImage:
                "url('https://vega.slooh.com/assets/v4/common/show_card_bg.jpg')",
              marginBottom: '10px',
            }}
          />
        ))}
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default BootstrappedRelatedShows;
