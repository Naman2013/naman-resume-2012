/** *********************************
 * V4 Related Shows populated with info
 *
 *
 *
 ********************************** */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import WinstonTile from '../common/tiles/WinstonTile';
import styles from './RelatedGuides.style';

const { arrayOf, bool, number, shape, string } = PropTypes;

class BootstrappedRelatedShows extends Component {
  static propTypes = {
    relatedGuidesList: arrayOf(shape()),
  };

  static defaultProps = {
    relatedGuidesList: [],
  };

  render() {
    const { relatedGuidesList } = this.props;
    
    return (
      <div className="root">
        {relatedGuidesList.map(item => (
          <WinstonTile
            key={`guide-${item.guideId}`}
            title={item.guideTitle}
            linkUrl={item.linkURL || item.linkUrl}
            linkText={item.linkLabel || item.linkText}
            theme={{
              backgroundSize: '100%',
              backgroundImage:
                "url('https://vega.slooh.com/assets/v4/common/guide_tile_bg_rect.jpg')",
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
