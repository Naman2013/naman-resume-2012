import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import uniqueId from 'lodash/uniqueId';
import CenterColumn from 'components/common/CenterColumn';
import GuideTile from 'components/common/tiles/guide-tile';
import GuideExcerptTile from 'components/common/tiles/guide-excerpt-tile';

import style from './guide-tiles.style';

class GuideTiles extends Component {
  static propTypes = {
    guides: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      subTitle: PropTypes.string.isRequired,
    })).isRequired,
    isMobile: PropTypes.bool,
  };

  state = {
    activeId: null,
  }

  setActiveTile = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    if (this.state.activeId !== id) {
      this.setState(() => ({
        activeId: id,
      }));
    }
  }

  removeActiveTile = (e) => {
    this.setState(() => ({
      activeId: null,
    }));
  }


  render() {
    const { guides, isMobile } = this.props;
    const { activeId } = this.state;
    return (
      <CenterColumn widths={['645px', '965px', '965px']}>
        <ul className="guide-tiles-root">
          {!isMobile && guides.map(guide => (
            <li
              key={uniqueId()}
              className="tile"
              onMouseOver={(e) => this.setActiveTile(e, guide.guideId)}
              onMouseLeave={this.removeActiveTile}
            >
              <div>
                <GuideTile {...guide} />
              </div>
              <div className={classnames('excerpt', {
                'show-excerpt': activeId === guide.guideId,
              })}>
                <GuideExcerptTile {...guide} />
              </div>


            </li>
          ))}
          {isMobile && guides.map(guide => (
            <li
              key={uniqueId()}
              className="tile"
            >
              <GuideTile {...guide} />
            </li>
          ))}
        </ul>
        <style jsx>{style}</style>
      </CenterColumn>
    );
  }
}

export default GuideTiles;
