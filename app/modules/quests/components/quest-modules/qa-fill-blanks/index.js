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

  answerChange = e => {
    const { module, setQaFreeFormAnswer } = this.props;
    const { moduleId } = module;
    setQaFreeFormAnswer({ moduleId, answerText: e.target.value });
  };

  render() {
    const { questQaFillBlanks, module } = this.props;
    const { moduleId } = module;
    const { activityTitle, activityState, activityInstructions } =
      questQaFillBlanks[moduleId] || {};

    return (
      <div className="quest-qa-free-form">
        <QuestQaHeader
          title={activityTitle}
          completed={activityState === ACTIVITY_STATES.complete}
        />

        <div className="quest-qa-instructions">{activityInstructions}</div>

        <QuestQaAnswerForm
          moduleData={questQaFillBlanks[moduleId] || {}}
          onClick={this.setQaFreeForm}
          onChange={this.answerChange}
          qaFillBlanks
        />
      </div>
    );
  }
}
