import React from 'react';
import {
  IQuestStepModule,
  // ImageorderingModuleResponse,
} from 'app/modules/quests/types';
import './styles.scss';
import { QuestStepModuleHeader } from 'app/modules/quests/components/quest-step-module-header';
import { ACTIVITY_STATES } from 'app/modules/quests/components/quest-modules/qa-free-form';
import { QuestQaAnswerForm } from 'app/modules/quests/components/quest-qa/quest-qa-answer-form';

type ImageorderingProps = {
  module: IQuestStepModule;
  readOnly: boolean;
  routeParams: any;
  stepData: any;
  questId: string;
  navigateToNextStep: Function;
  // getImageorderingModule: Function;
  // setImageorderingModule: Function;
  refreshQuestStep: Function;

  // richTextInputModule: ImageorderingModuleResponse;
};

export class Imageordering extends React.PureComponent<ImageorderingProps> {
  componentDidMount(): void {
    const { module, questId, stepData } = this.props;
    const { questUUID } = stepData;
    const { moduleId, moduleUUID } = module;

    // getImageorderingModule({
    //   questId,
    //   questUUID,
    //   moduleId,
    //   moduleUUID,
    // });
  }

  onAction = (action: string, answerText: string) => {
    // const {
    //   setImageorderingModule,
    //   module,
    //   richTextInputModule,
    //   refreshQuestStep,
    // } = this.props;
    // const { moduleId } = module;
    // const { questId, questUUID, moduleUUID } = richTextInputModule;
    //
    // setImageorderingModule({
    //   questId,
    //   questUUID,
    //   moduleId,
    //   moduleUUID,
    //   action,
    //   answerText,
    // }).then((action: any) => {
    //   const { refreshModule, refreshStep, stepModuleId } = action.payload;
    //
    //   if (refreshStep) {
    //     refreshQuestStep();
    //   } else if (refreshModule) {
    //     console.log('refresh module!!!!');
    //     // getQaFreeForm({ questId, moduleId });
    //   }
    // });
  };

  render() {
    const { module, readOnly } = this.props;
    // const {
    //   activityTitle,
    //   activityState,
    //   activitySequenceText,
    //   activityInstructions,
    // } = richTextInputModule;

    return (
      <div className="rich-text-module quest-qa-free-form">
        <h1>Imageordering</h1>
        <QuestStepModuleHeader
          title="activityTitle"
          completed //activityState === ACTIVITY_STATES.complete
          sequenceText="activitySequenceText"
        />

        <div className="quest-qa-instructions">activityInstructions</div>

        {/*<QuestQaAnswerForm
          moduleData={{}}
          onClick={this.onAction}
          readOnly={readOnly}
          richTextEditor
        />*/}
      </div>
    );
  }
}
