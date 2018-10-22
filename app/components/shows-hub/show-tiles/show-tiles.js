import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import uniqueId from 'lodash/uniqueId';
import CenterColumn from 'components/common/CenterColumn';
import ShowTile from 'components/common/tiles/show-tile-hub';
import ShowExcerptTile from 'components/common/tiles/show-excerpt-tile-hub';

import style from './show-tiles.style';

class ShowTiles extends Component {
  static propTypes = {
    shows: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      subTitle: PropTypes.string.isRequired,
    })).isRequired,
    isMobile: PropTypes.bool,
    updateReadingListInfo: PropTypes.func.isRequired,
  };

  state = {
    activeId: null,
  }

  setActiveTile = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { id } = e.currentTarget.dataset;
    const parsedId = Number(id);
    if (this.state.activeId !== parsedId) {
      this.setState(() => ({
        activeId: Number(parsedId),
      }));
    }
  }

  removeActiveTile = (e) => {
    this.setState(() => ({
      activeId: null,
    }));
  }


  render() {
    const { shows, isMobile, updateReadingListInfo } = this.props;
    const { activeId } = this.state;
    return (
      <CenterColumn widths={['645px', '965px', '965px']}>
        <ul className="show-tiles-root">
          {!isMobile && shows.map(show => (
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
              <div className={classnames('excerpt', {
                'show-excerpt': activeId === show.eventId,
              })}>
                <ShowExcerptTile {...show} updateReadingInfoInList={updateReadingListInfo} />
              </div>


            </li>
          ))}
          {isMobile && shows.map(show => (
            <li
              key={uniqueId()}
              className="tile"
            >
              <ShowTile {...show} />
            </li>
          ))}
        </ul>
        <style jsx>{style}</style>
      </CenterColumn>
    );
  }
}

export default ShowTiles;
