import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import uniqueId from 'lodash/uniqueId';
import CenterColumn from 'components/common/CenterColumn';
import GroupTile from 'components/common/tiles/GroupTile';
import GroupExcerptTile from 'components/common/tiles/group-excerpt-tile';
import { askToJoin } from 'services/community-groups/ask-to-join';
import { toggleJoinGroup } from 'services/community-groups/toggle-join-group';
import style from './group-tiles.style';

class GroupTiles extends Component {
  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    groups: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      subTitle: PropTypes.string.isRequired,
    })).isRequired,
    isMobile: PropTypes.bool,
    updateGroupItemInfo: PropTypes.func.isRequired,
    updatePrompt: PropTypes.func.isRequired,
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

  askToJoinGroup = () => { // for private groups

  }

  toggleJoinGroup = (e) => { // for public groups
    const {
      closeModal,
      params,
    } = this.props;

    const { discussionGroupId } = e.currentTarget.dataset;

    this.closeModal();

    toggleJoinGroup({
      discussionGroupId,
      groupSet: params.filterType,
    });
  }


  render() {
    const { groups, isMobile, updateGroupItemInfo, updatePrompt } = this.props;
    const { activeId } = this.state;
    return (
      <CenterColumn widths={['645px', '965px', '965px']}>
        <ul className="group-tiles-root">
          {!isMobile && groups.map(group => (
            <li
              key={uniqueId()}
              className="tile"
              data-id={group.discussionGroupId}
              onMouseOver={this.setActiveTile}
              onMouseLeave={this.removeActiveTile}
            >
              <div>
                <GroupTile {...group} />
              </div>
              <div className={classnames('excerpt', {
                'show-excerpt': Number(activeId) === Number(group.discussionGroupId),
              })}>
                <GroupExcerptTile
                  {...group}
                  updateGroupItemInfo={updateGroupItemInfo}
                  updatePrompt={updatePrompt}
                />
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
