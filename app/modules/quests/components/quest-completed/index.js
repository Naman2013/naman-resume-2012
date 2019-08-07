import React, { PureComponent } from 'react';
import './styles.scss';
import { CompleteCheckbox } from 'app/modules/quests/components/complete-checkbox';
import { downloadFile } from 'app/utils/downloadFile';
import { Link } from 'react-router';
import QuestHubTileBig from 'app/components/common/tiles/QuestHubTileBig';

export class QuestCompleted extends PureComponent {
  // TODO: add questUUID

  componentDidMount() {
    const {
      getQuestCompleted,
      params: { questId },
    } = this.props;
    getQuestCompleted({ questId });
  }

  onDownloadClick = () => {
    const { questCompletedData } = this.props;
    downloadFile(questCompletedData.downloadPDFURL, 'QuestCompletion.pdf');
  };

  render() {
    const { questCompletedData } = this.props;
    const {
      suggestedQuestsList,
      stepsCompletedList,
      readyForMoreQuestsPrompt,
    } = questCompletedData;

    return (
      <div className="quest-complete__body">
        <div className="quest-complete__body-banner">
          <div className="title">{questCompletedData.congratulationsText}</div>
          <div className="subtitle">
            {questCompletedData.questCompletedText}
          </div>
          <div className="vertical-line"></div>
        </div>
        <div className="quest-complete__body-content">
          <div className="quest-emblem">
            <div className="blue-shield">
              <div className="icon-container">
                <img
                  className="icon-content"
                  alt=""
                  width="40"
                  height="40"
                  src="https://vega.slooh.com/assets/v4/icons/object_types/SpiralGalaxy.svg"
                />
              </div>
            </div>
          </div>
          <div className="quest-badge">
            <div className="quest-badge__header">
              <div className="quest-badge__header-left">
                <div className="title">
                  {questCompletedData.youAreAwardedText}:
                </div>
                <div className="subtitle">
                  {questCompletedData.badgeNameText}
                </div>
              </div>
              <div className="quest-badge__header-right">
                <div onClick={this.onDownloadClick} className="download">
                  <span className="icon-download" />
                </div>
              </div>
            </div>
            <div className="quest-badge__body">
              <div className="quest-badge-review">
                <div className="title">{questCompletedData.earnedInText}</div>
              </div>
              <ul className="quest-badge-list">
                {stepsCompletedList.map(item => (
                  <li key={item.stepSequence} className="quest-list-element">
                    <div className="title">{item.stepSummary}</div>
                    <CompleteCheckbox />
                  </li>
                ))}
              </ul>
              <div className="quest-badge-details">
                <div className="title">
                  {questCompletedData.didYouKnowPrompt}
                </div>
                <div className="info">{questCompletedData.didYouKnowText}</div>
              </div>
            </div>
          </div>
          <div className="quest-list-more">
            <div className="quest-list-more-title">
              {questCompletedData.readyForMoreQuestsPrompt}
            </div>
            <div className="list">
              {suggestedQuestsList.map(item => (
                <div className="quest-list-item">
                  <QuestHubTileBig
                    linkUrl={item.linkUrl}
                    questType={item.questType}
                    iconURL={item.badgeIconURL}
                    questDifficulty={item.questDifficulty}
                    title={item.title}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
