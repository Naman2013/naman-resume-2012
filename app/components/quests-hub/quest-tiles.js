import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import uniqueId from 'lodash/uniqueId';
import CenterColumn from 'components/common/CenterColumn';
import QuestHubTileBig from 'components/common/tiles/QuestHubTileBig';
import QuestHubTileSmall from 'components/common/tiles/QuestHubTileSmall';
import QuestExcerptTile from 'components/common/tiles/quest-excerpt-tile';

import style from './quest-tiles.style';

class QuestTiles extends Component {
  static propTypes = {
    quests: PropTypes.arrayOf(PropTypes.shape({
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
    const { quests, isMobile, updateReadingListInfo } = this.props;
    const { activeId } = this.state;
    return (
      <CenterColumn widths={['645px', '965px', '965px']}>
        <ul className="quest-tiles-root">
          {!isMobile && quests.map(quest => (
            <li
              key={uniqueId()}
              className="tile"
              data-id={quest.questId}
              onMouseOver={this.setActiveTile}
              onMouseLeave={this.removeActiveTile}
            >
              <div>
                <QuestHubTileBig {...quest} />
              </div>
              <div className={classnames('excerpt', {
                'show-excerpt': activeId === quest.questId,
              })}>
                <QuestExcerptTile {...quest} updateReadingInfoInList={updateReadingListInfo} />
              </div>


            </li>
          ))}
          {isMobile && quests.map(quest => (
            <li
              key={uniqueId()}
              className="tile"
            >
              <QuestHubTileSmall {...quest} />
            </li>
          ))}
        </ul>
        <style jsx>{style}</style>
      </CenterColumn>
    );
  }
}

export default QuestTiles;
