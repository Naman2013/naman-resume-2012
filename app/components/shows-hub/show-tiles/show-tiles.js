import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import uniqueId from 'lodash/uniqueId';
import { FormattedMessage } from 'react-intl';
import CenterColumn from 'app/components/common/CenterColumn';
import ShowTile from 'app/components/common/tiles/show-tile-hub';
import ShowExcerptTile from 'app/components/common/tiles/show-excerpt-tile-hub';

import style from './show-tiles.style';

class ShowTiles extends Component {
  static propTypes = {
    shows: PropTypes.arrayOf(
      PropTypes.shape({
        eventTitle: PropTypes.string.isRequired,
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
    const { shows, isMobile, updateReadingListInfo, emptyText, onUpdate } = this.props;
    const { activeId } = this.state;
    return shows.length ? (
      <CenterColumn widths={['645px', '965px', '965px']}>
        <ul className="show-tiles-root">
          {!isMobile &&
            shows.map(show => (
              <li
                key={uniqueId()}
                className="tile"
                data-id={show.eventId}
                onMouseOver={this.setActiveTile}
                onMouseLeave={this.removeActiveTile}
              >
                <div>
                  <ShowTile {...show} />
                </div>
                <div
                  className={classnames('excerpt', {
                    'show-excerpt': activeId == show.eventId,
                  })}
                >
                  <ShowExcerptTile
                    {...show}
                    updateReadingInfoInList={updateReadingListInfo}
                    onUpdate={onUpdate}
                  />
                </div>
              </li>
            ))}
          {isMobile &&
            shows.map(show => (
              <li key={uniqueId()} className="tile">
                <ShowTile {...show} />
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

export default ShowTiles;
