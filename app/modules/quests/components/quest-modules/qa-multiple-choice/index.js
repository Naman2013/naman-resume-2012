import React, { PureComponent } from 'react';
import { QuestQaHeader } from '../../quest-qa/quest-qa-header';
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

  setQaFreeForm = action => {
    const {
      setQaFreeForm,
      questQaFillBlanks,
      module,
      getQaFillBlanks,
      getQuestStep,
      refreshQuestStep,
    } = this.props;
    const { moduleId } = module;
    const { questId, questUUID, moduleUUID, answerText } = questQaFillBlanks[
      moduleId
    ];

    setQaFreeForm({
      questId,
      questUUID,
      moduleId,
      moduleUUID,
      action,
      answerText,
    }).then(({ payload }) => {
      const { refreshModule, refreshStep, stepModuleId } = payload;

      if (refreshStep) {
        refreshQuestStep();
      } else if (refreshModule) {
        getQaFillBlanks({ questId, moduleId });
      }
    });
  };

  answerChange = (e, questionIndex) => {
    const { module, setQaFillBlanksAnswer } = this.props;
    const { moduleId } = module;
    setQaFillBlanksAnswer({
      moduleId,
      answerText: e.target.value,
      questionIndex,
    });
  };

  render() {
    const { questQaMultipleChoice, module } = this.props;
    const { moduleId } = module;
    const { activityTitle, activityState, activityInstructions } =
      questQaMultipleChoice[moduleId] || {};

    return (
      <div className="quest-qa-multiple-choice">
        <QuestQaHeader
          title={activityTitle}
          completed={activityState === ACTIVITY_STATES.complete}
        />

        <div className="quest-qa-instructions">{activityInstructions}</div>

        <QuestQaAnswerForm
          moduleData={questQaMultipleChoice[moduleId] || {}}
          onClick={this.setQaFreeForm}
          onChange={this.answerChange}
          qaFillBlanks
        />
      </div>
    );
  }
}
