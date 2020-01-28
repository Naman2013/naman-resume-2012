import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import uniqueId from 'lodash/uniqueId';
import { withTranslation } from 'react-i18next';
import CenterColumn from 'app/components/common/CenterColumn';
import QuestHubTileBig from 'app/components/common/tiles/QuestHubTileBig';
import QuestExcerptTile from 'app/components/common/tiles/quest-excerpt-tile';

import QuestCard from 'app/components/common/tiles/Quest-card';
import style from './quest-tiles.style';

@withTranslation()
class QuestTiles extends Component {
  static propTypes = {
    quests: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        subTitle: PropTypes.string.isRequired,
      })
    ).isRequired,
    isMobile: PropTypes.bool,
    updateReadingListInfo: PropTypes.func.isRequired,
  };

  state = {
    activeId: null,
  };

  setActiveTile = e => {
    e.preventDefault();
    e.stopPropagation();
    const { activeId } = this.state;
    const { id } = e.currentTarget.dataset;
    const parsedId = Number(id);
    if (activeId !== parsedId) {
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
    const {
      quests,
      isMobile,
      updateReadingListInfo,
      questsComingSoonMessage,
      t,
    } = this.props;
    const { activeId } = this.state;
    return quests.length ? (
      <CenterColumn widths={['645px', '965px', '965px']}>
        <ul className="quest-tiles-root">
          {!isMobile &&
            quests.map(quest => (
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
                <div
                  className={classnames('excerpt', {
                    'show-excerpt': activeId === quest.questId,
                  })}
                >
                  <QuestExcerptTile
                    {...quest}
                    updateReadingInfoInList={updateReadingListInfo}
                  />
                </div>
              </li>
            ))}
          <div className="quest-list">
            {isMobile && quests
              ? quests.map(quest => (
                  <div className="quest-list-item">
                    <QuestCard
                      linkUrl={quest.linkUrl}
                      questType={quest.questType}
                      iconURL={quest.iconURL}
                      questDifficulty={quest.questDifficulty}
                      title={quest.questTitle}
                      linkLabel={quest.linkLabel}
                      questAuthor={quest.questAuthor}
                    />
                  </div>
                ))
              : null}
          </div>
        </ul>
        <style jsx>{style}</style>
      </CenterColumn>
    ) : (
      (
        <div className="container">
          <p style={{ fontSize: '1.5em' }} className="mt-5">
            {questsComingSoonMessage}
          </p>
        </div>
      ) || t('Hubs.noQuests')
    );
  }
}

export default QuestTiles;
