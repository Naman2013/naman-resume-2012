import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import uniqueId from 'lodash/uniqueId';
import CenterColumn from 'components/common/CenterColumn';
import GroupTile from 'components/common/tiles/GroupTile';
import GuideExcerptTile from 'components/common/tiles/group-excerpt-tile';

import style from './group-tiles.style';

class GroupTiles extends Component {
  static propTypes = {
    groups: PropTypes.arrayOf(PropTypes.shape({
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
    const { groups, isMobile, updateReadingListInfo } = this.props;
    const { activeId } = this.state;
    return (
      <CenterColumn widths={['645px', '965px', '965px']}>
        <ul className="group-tiles-root">
          {!isMobile && groups.map(group => (
            <li
              key={uniqueId()}
              className="tile"
              data-id={group.groupId}
              onMouseOver={this.setActiveTile}
              onMouseLeave={this.removeActiveTile}
            >
              <div>
                <GroupTile {...group} />
              </div>
              <div className={classnames('excerpt', {
                'show-excerpt': activeId === group.groupId,
              })}>
                <GuideExcerptTile {...group} updateReadingInfoInList={updateReadingListInfo} />
              </div>


            </li>
          ))}
          {isMobile && groups.map(group => (
            <li
              key={uniqueId()}
              className="tile"
            >
              <GroupTile {...group} />
            </li>
          ))}
        </ul>
        <style jsx>{style}</style>
      </CenterColumn>
    );
  }
}

export default GroupTiles;
