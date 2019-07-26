import React, { PureComponent } from 'react';
import { QuestQaHeader } from '../../quest-qa/quest-qa-header';
import { QuestQaAnswerForm } from '../../quest-qa/quest-qa-answer-form';
import './styles.scss';

const ACTIVITY_STATES = {
  complete: 'complete',
  incomplete: 'incomplete',
};

export class QuestModuleQaFreeForm extends PureComponent {
  componentDidMount = () => {
    const { module, questId, getQaFreeForm } = this.props;
    const { moduleId } = module;
    if (questId && moduleId) getQaFreeForm({ questId, moduleId });
  };

  render() {
    const { questQaFreeForm, module } = this.props;
    const { moduleId } = module;
    const {
      activityTitle,
      activityState,
      activityInstructions,
      moduleBaseImageURL,
      moduleBaseThumbnailURL,
    } = questQaFreeForm[moduleId] || {};
    console.log(this.props);
    // const { panelList } = questOutput;

    return (
      <div className="quest-qa-free-form">
        <QuestQaHeader
          title={activityTitle}
          completed={activityState === ACTIVITY_STATES.complete}
        />

        <div className="quest-qa-instructions">{activityInstructions}</div>

        <QuestQaAnswerForm
          imageUrl={moduleBaseImageURL}
          thumbnailUrl={moduleBaseThumbnailURL}
        />
      </div>
    );
  }
}
