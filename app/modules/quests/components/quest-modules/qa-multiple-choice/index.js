import React, { PureComponent } from 'react';
import { QuestStepModuleHeader } from '../../quest-step-module-header';
import { QuestQaAnswerForm } from '../../quest-qa/quest-qa-answer-form';
import './styles.scss';

const ACTIVITY_STATES = {
  complete: 'complete',
  incomplete: 'incomplete',
};

export class QuestModuleQaMultipleChoice extends PureComponent {
  componentDidMount = () => {
    this.getQaMultipleChoice();
  };

  getQaMultipleChoice = () => {
    const { module, questId, getQaMultipleChoice, stepData } = this.props;
    const { questUUID } = stepData;
    const { moduleId, moduleUUID } = module;
    if (questId && moduleId) {
      getQaMultipleChoice({ questId, moduleId, moduleUUID, questUUID });
    }
  };

  setQaMultipleChoice = (answerIndex, answerLetter) => {
    const {
      setQaMultipleChoice,
      questQaMultipleChoice,
      module,
      refreshQuestStep,
    } = this.props;
    const { moduleId } = module;
    const { questId, questUUID, moduleUUID } = questQaMultipleChoice[moduleId];

    setQaMultipleChoice({
      questId,
      questUUID,
      moduleId,
      moduleUUID,
      answerIndex,
      answerLetter,
    }).then(({ payload }) => {
      const { refreshModule, refreshStep, stepModuleId } = payload;

      if (refreshStep) {
        refreshQuestStep();
      } else if (refreshModule) {
        this.getQaMultipleChoice();
      }
    });
  };

  render() {
    const { questQaMultipleChoice, module, readOnly } = this.props;
    const { moduleId } = module;
    const {
      activityTitle,
      activityState,
      activityInstructions,
      activitySequenceText,
    } = questQaMultipleChoice[moduleId] || {};

    return (
      <div className="quest-qa-multiple-choice">
        <QuestStepModuleHeader
          title={activityTitle}
          completed={activityState === ACTIVITY_STATES.complete}
          sequenceText={activitySequenceText}
        />

        <div className="quest-qa-instructions">{activityInstructions}</div>

        <QuestQaAnswerForm
          moduleData={questQaMultipleChoice[moduleId] || {}}
          onClick={this.setQaMultipleChoice}
          readOnly={readOnly}
          qaMultipleChoice
        />
      </div>
    );
  }
}
