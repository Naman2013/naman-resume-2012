/** *********************************
 * V4 Related Shows populated with info
 *
 *
 *
 ********************************** */

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import WinstonTile from '../common/tiles/WinstonTile';
import FlipedGuideCard from '../common/tiles/guide-excerpt-tile';

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
        {relatedGuidesList.length > 0 &&
          relatedGuidesList.map(guide => {
            return (
              <article key={`guide-${guide.guideId}`}>
                <div className="card">
                  <WinstonTile
                    title={guide.guideTitle}
                    linkUrl={guide.linkURL || guide.linkUrl}
                    linkText={guide.linkLabel || guide.linkText}
                    theme={{
                      backgroundSize: '100%',
                      backgroundImage:
                        "url('https://vega.slooh.com/assets/v4/common/guide_tile_bg_rect.jpg')",
                    }}
                  />
                </div>
                <div className="flipped">
                  <FlipedGuideCard
                    guideReferenceTitle={guide.guideTitle}
                    linkLabel={guide.linkLabel}
                    linkUrl={guide.linkURL}
                    shortDescription={guide.shortDescription}
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
