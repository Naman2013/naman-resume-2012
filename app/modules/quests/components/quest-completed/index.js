import React, { PureComponent } from 'react';
import { Link } from 'react-router';
import { Tooltip } from 'react-tippy';
import { CompleteCheckbox } from 'app/modules/quests/components/complete-checkbox';
import { downloadFile } from 'app/utils/downloadFile';
import QuestHubTileBig from 'app/components/common/tiles/QuestHubTileBig';
import './styles.scss';
import Btn from 'app/atoms/Btn';

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
    const { questCompletedData, routeParams } = this.props;
    const {
      suggestedQuestsList,
      stepsCompletedList,
      readyForMoreQuestsPrompt,
      congratulationsText,
      questCompletedText,
      youAreAwardedText,
      yourAccomplishmentsText,
      badgeNameText,
      earnedInText,
      didYouKnowPrompt,
      didYouKnowText,
      reviewQuestButtonCaption,
      downloadPDFTooltipText,
    } = questCompletedData;

    const { questId } = routeParams;

    return (
      <div className="quest-complete__body">
        <div className="quest-complete__body-banner">
          <div className="title">{congratulationsText}</div>
          <div className="subtitle">{questCompletedText}</div>
          <div className="vertical-line" />
        </div>
        <div className="quest-complete__body-content">
          <div className="quest-emblem">
            <div className="blue-shield">
              <div className="icon-container">
                <img
                  className="icon-content"
                  alt=""
                  src="https://vega.slooh.com/assets/v4/icons/object_types/SpiralGalaxy.svg"
                />
              </div>
            </div>
          </div>

          <div className="quest-badge">
            <div className="quest-badge__header">
              <div className="quest-badge__header-left">
                <div className="title">{youAreAwardedText}</div>
                <div className="subtitle">{badgeNameText}</div>
              </div>
              <div className="quest-badge__header-right">
                <Tooltip
                  title={downloadPDFTooltipText}
                  distance={10}
                  position="top"
                >
                  <div onClick={this.onDownloadClick} className="download">
                    <span className="icon-download" />
                  </div>
                </Tooltip>
              </div>
            </div>
            <div className="quest-badge__body">
              <div className="quest-badge-review">
                <div className="title">{earnedInText}</div>
                <div className="quest-badge-review-btn">
                  <Link
                    className="btn btn-primary"
                    to={`/quest-details/${questId}`}
                  >
                    {reviewQuestButtonCaption}
                  </Link>
                </div>
              </div>
              <div className="quest-badge-mobile">
                <div className="quest-badge-navigation">
                  <Link
                    className="btn btn-primary"
                    to={`/quest-details/${questId}`}
                  >
                    {reviewQuestButtonCaption}
                  </Link>
                  <div className="quest-badge-mobile-download">
                    <div onClick={this.onDownloadClick} className="download">
                      <span className="icon-download" />
                    </div>
                  </div>
                </div>
                <div className="quest-badge-accomplishments">
                  <span>{yourAccomplishmentsText}</span>
                </div>
              </div>
              <ul className="quest-badge-list">
                {stepsCompletedList.map(item => (
                  <li key={item.stepSequence} className="quest-list-element">
                    <div className="title">{item.stepSummary}</div>
                    <div className="title-mobile">{item.stepSummaryMobile}</div>
                    <CompleteCheckbox />
                  </li>
                ))}
              </ul>
              <div className="quest-badge-details">
                <div className="title">{didYouKnowPrompt}</div>
                <div className="info">{didYouKnowText}</div>
              </div>
            </div>
          </div>

          <div className="quest-list-more">
            <div className="quest-list-more-title">
              {readyForMoreQuestsPrompt}
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
