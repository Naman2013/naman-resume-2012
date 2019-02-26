/** *********************************
 * V4 Related Shows populated with info
 *
 *
 *
 ********************************** */

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import classnames from 'classnames';
import uniqueId from 'lodash/uniqueId';
import WinstonTile from '../common/tiles/WinstonTile';
import FlipedGuideCard from '../common/tiles/guide-excerpt-tile';

import styles from './RelatedGuides.style';

const { arrayOf, bool, number, shape, string } = PropTypes;

class BootstrappedRelatedShows extends Component {
  static propTypes = {
    isDesktop: bool,
    guideList: arrayOf(shape()),
    guideCount: number,
  };

  static defaultProps = {
    isDesktop: false,
    guideList: [],
    guideCount: 0,
  };

  render() {
    const { guideList } = this.props;

    return (
      <div className="root">
        {guideList.length > 0 &&
          guideList.map(guide => {
            return (
              <article>
                <div className="card">
                  <WinstonTile
                    title={guide.guideTitle}
                    linkUrl={guide.linkUrl}
                    linkText={guide.linkText}
                    theme={{
                      backgroundSize: '100%',
                      backgroundImage:
                        "url('https://vega.slooh.com/assets/v4/common/guide_tile_bg_rect.jpg')",
                    }}
                  />
                </div>
                <div className="flipped">
                  <FlipedGuideCard
                    {...guide}
                    guideReferenceTitle={guide.guideTitle}
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
