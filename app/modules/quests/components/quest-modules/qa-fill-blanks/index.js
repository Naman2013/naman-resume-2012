import React, { PureComponent } from 'react';
import { QuestQaHeader } from '../../quest-qa/quest-qa-header';
import { QuestQaAnswerForm } from '../../quest-qa/quest-qa-answer-form';
import './styles.scss';

const ACTIVITY_STATES = {
  complete: 'complete',
  incomplete: 'incomplete',
};

export class QuestModuleQaFillBlanks extends PureComponent {
  componentDidMount = () => {
    this.getQaFillBlanks();
  };

  getQaFillBlanks = () => {
    const { module, questId, getQaFillBlanks, stepData } = this.props;
    const { questUUID } = stepData;
    const { moduleId, moduleUUID } = module;
    if (questId && moduleId) {
      getQaFillBlanks({ questId, moduleId, moduleUUID, questUUID });
    }
  };

  setQaFillBlanks = action => {
    const {
      setQaFillBlanks,
      questQaFillBlanks,
      module,
      getQaFillBlanks,
      refreshQuestStep,
    } = this.props;
    const { moduleId } = module;
    const { questId, questUUID, moduleUUID, answers } = questQaFillBlanks[
      moduleId
    ];
    const answerList = JSON.stringify(answers.map(answer => {
      return { answerIndex: answer.answerIndex, answerText: answer.answerText };
    }));

    setQaFillBlanks({
      questId,
      questUUID,
      moduleId,
      moduleUUID,
      action,
      answerList,
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
    const { questQaFillBlanks, module, readOnly } = this.props;
    const { moduleId } = module;
    const {
      activityTitle,
      activityState,
      activityInstructions,
      activitySequenceText,
    } = questQaFillBlanks[moduleId] || {};

    return (
      <div className="quest-qa-fill-blanks">
        <QuestQaHeader
          title={activityTitle}
          completed={activityState === ACTIVITY_STATES.complete}
          sequenceText={activitySequenceText}
        />

        <div className="quest-qa-instructions">{activityInstructions}</div>

        <QuestQaAnswerForm
          moduleData={questQaFillBlanks[moduleId] || {}}
          onClick={this.setQaFillBlanks}
          onChange={this.answerChange}
          readOnly={readOnly}
          qaFillBlanks
        />
      </div>
    );
  }
}
