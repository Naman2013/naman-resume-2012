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

  setQaFreeForm = (action, answerText) => {
    const { setQaFreeForm, questQaFreeForm, module } = this.props;
    const { moduleId } = module;
    const { questId, questUUID, moduleUUID } = questQaFreeForm[moduleId];

    setQaFreeForm({
      questId,
      questUUID,
      moduleId,
      moduleUUID,
      action,
      answerText,
    });
  };

  render() {
    const { questQaFreeForm, module } = this.props;
    const { moduleId } = module;
    const {
      activityTitle,
      activityState,
      activityInstructions,
      activityPrompt,
      moduleBaseImageURL,
      moduleBaseThumbnailURL,
      textInputReadOnly,
      textInputPlaceholder,
      showSubmitButton,
      submitButtonCaption,
    } = questQaFreeForm[moduleId] || {};

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
          answerFieldPrompt={activityPrompt}
          readOnly={textInputReadOnly}
          placeholder={textInputPlaceholder}
          submitButtonCaption={submitButtonCaption}
          showSubmitButton={showSubmitButton}
          onClick={this.setQaFreeForm}
        />
      </div>
    );
  }
}
