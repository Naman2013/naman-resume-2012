import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import uniqueId from 'lodash/uniqueId';
import CenterColumn from 'app/components/common/CenterColumn';
import GuideTile from 'app/components/common/tiles/guide-tile';
import GuideExcerptTile from 'app/components/common/tiles/guide-excerpt-tile';

import style from './guide-tiles.style';

class GuideTiles extends Component {
  static propTypes = {
    guides: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        subTitle: PropTypes.string.isRequired,
      })
    ).isRequired,
    isMobile: PropTypes.bool,
    updateReadingListInfo: PropTypes.func.isRequired,
    emptyText: PropTypes.string,
  };

  state = {
    activeId: null,
  };

  setActiveTile = e => {
    e.preventDefault();
    e.stopPropagation();
    const { id } = e.currentTarget.dataset;
    const parsedId = Number(id);
    if (this.state.activeId !== parsedId) {
      this.setState(() => ({
        activeId: Number(parsedId),
      }));
    }
  };

  removeActiveTile = e => {
    this.setState(() => ({
      activeId: null,
    }));
  };

  render() {
    const { guides, isMobile, updateReadingListInfo, emptyText, onUpdate } = this.props;
    const { activeId } = this.state;
    return guides.length ? (
      <CenterColumn widths={['645px', '965px', '965px']}>
        <ul className="guide-tiles-root">
          {!isMobile &&
            guides.map(guide => (
              <li
                key={guide.guideId}
                className="tile"
                data-id={guide.guideId}
                onMouseOver={this.setActiveTile}
                onMouseLeave={this.removeActiveTile}
              >
                <div>
                  <GuideTile {...guide} />
                </div>
                <div
                  className={classnames('excerpt', {
                    'show-excerpt': activeId == guide.guideId,
                  })}
                >
                  <GuideExcerptTile
                    {...guide}
                    updateReadingInfoInList={updateReadingListInfo}
                    onUpdate={onUpdate}
                  />
                </div>
              </li>
            ))}
          {isMobile &&
            guides.map(guide => (
              <li key={uniqueId()} className="tile">
                <GuideTile {...guide} />
              </li>
            ))}
        </ul>
        <style jsx>{style}</style>
      </CenterColumn>
    ) : (
      <span dangerouslySetInnerHTML={{ __html: emptyText }} />
    );
  }
}

export default GuideTiles;
