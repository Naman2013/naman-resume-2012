import React from 'react';
import {
  IQuestStepModule,
  RichTextInputModuleResponse,
} from 'app/modules/quests/types';
import './styles.scss';
import { QuestQaHeader } from 'app/modules/quests/components/quest-qa/quest-qa-header';
import { ACTIVITY_STATES } from 'app/modules/quests/components/quest-modules/qa-free-form';
import { QuestQaAnswerForm } from 'app/modules/quests/components/quest-qa/quest-qa-answer-form';

type RichTextInputProps = {
  module: IQuestStepModule;
  readOnly: boolean;
  routeParams: any;
  stepData: any;
  questId: string;
  navigateToNextStep: Function;
  getRichTextInputModule: Function;
  setRichTextInputModule: Function;
  refreshQuestStep: Function;

  richTextInputModule: RichTextInputModuleResponse;
};

export class RichTextInput extends React.PureComponent<RichTextInputProps> {
  componentDidMount(): void {
    const { module, questId, stepData, getRichTextInputModule } = this.props;
    const { questUUID } = stepData;
    const { moduleId, moduleUUID } = module;

    getRichTextInputModule({
      questId,
      questUUID,
      moduleId,
      moduleUUID,
    });
  }

  onAction = (action: string, answerText: string) => {
    const {
      setRichTextInputModule,
      module,
      richTextInputModule,
      refreshQuestStep,
    } = this.props;
    const { moduleId } = module;
    const { questId, questUUID, moduleUUID } = richTextInputModule;

    setRichTextInputModule({
      questId,
      questUUID,
      moduleId,
      moduleUUID,
      action,
      answerText,
    }).then((action: any) => {
      const { refreshModule, refreshStep, stepModuleId } = action.payload;

      if (refreshStep) {
        refreshQuestStep();
      } else if (refreshModule) {
        console.log('refresh module!!!!');
        // getQaFreeForm({ questId, moduleId });
      }
    });
  };

  render() {
    const { module, richTextInputModule, readOnly } = this.props;
    const {
      activityTitle,
      activityState,
      activitySequenceText,
      activityInstructions,
    } = richTextInputModule;

    return (
      <div className="rich-text-module quest-qa-free-form">
        <QuestQaHeader
          title={activityTitle}
          completed={activityState === ACTIVITY_STATES.complete}
          sequenceText={activitySequenceText}
        />

        <div className="quest-qa-instructions">{activityInstructions}</div>

        <QuestQaAnswerForm
          moduleData={richTextInputModule || {}}
          onClick={this.onAction}
          readOnly={readOnly}
          richTextEditor
        />
      </div>
    );
  }
}
