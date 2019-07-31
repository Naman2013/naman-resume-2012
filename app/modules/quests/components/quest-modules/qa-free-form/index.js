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
    const { module, questId, getQaFreeForm, stepData } = this.props;
    const { questUUID } = stepData;
    const { moduleId, moduleUUID } = module;
    if (questId && moduleId) {
      getQaFreeForm({ questId, moduleId, moduleUUID, questUUID });
    }
  };

  getAllQaFreeFormModules = () => {
    const { questQaFreeForm, questId, getQaFreeForm } = this.props;
    const modules = Object.keys(questQaFreeForm);

    for (let i = 0; i < modules.length; i++) {
      const moduleId = modules[i];
      getQaFreeForm({ questId, moduleId });
    }
  };

  setQaFreeForm = action => {
    const {
      setQaFreeForm,
      questQaFreeForm,
      module,
      getQaFreeForm,
      getQuestStep,
    } = this.props;
    const { moduleId } = module;
    const { questId, questUUID, moduleUUID, answerText } = questQaFreeForm[
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
        getQuestStep(questId, stepModuleId).then(() => {
          this.getAllQaFreeFormModules();
        });
      } else if (refreshModule) {
        getQaFreeForm({ questId, moduleId });
      }
    });
  };

  answerChange = e => {
    const { module, setQaFreeFormAnswer } = this.props;
    const { moduleId } = module;
    setQaFreeFormAnswer({ moduleId, answerText: e.target.value });
  };

  render() {
    const { questQaFreeForm, module } = this.props;
    const { moduleId } = module;
    const { activityTitle, activityState, activityInstructions } =
      questQaFreeForm[moduleId] || {};

    return (
      <div className="quest-qa-free-form">
        <QuestQaHeader
          title={activityTitle}
          completed={activityState === ACTIVITY_STATES.complete}
        />

        <div className="quest-qa-instructions">{activityInstructions}</div>

        <QuestQaAnswerForm
          moduleData={questQaFreeForm[moduleId] || {}}
          onClick={this.setQaFreeForm}
          onChange={this.answerChange}
        />
      </div>
    );
  }
}
