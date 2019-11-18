import React from 'react';
import {
  IQuestStepModule,
  // ImageorderingModuleResponse,
} from 'app/modules/quests/types';
import './styles.scss';
import { QuestStepModuleHeader } from 'app/modules/quests/components/quest-step-module-header';
import { ACTIVITY_STATES } from 'app/modules/quests/components/quest-modules/qa-free-form';
import { QuestQaAnswerForm } from 'app/modules/quests/components/quest-qa/quest-qa-answer-form';
import { EditMode } from 'app/modules/quests/components/quest-modules/imageordering/edit';
import { FinishMode } from 'app/modules/quests/components/quest-modules/imageordering/finish';
import { PreviewMode } from 'app/modules/quests/components/quest-modules/imageordering/preview';

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

type ModesType = 'edit' | 'preview' | 'finish' | 'review';

type ImageorderingState = {
  mode: ModesType;
};

export class Imageordering extends React.PureComponent<
  ImageorderingProps,
  ImageorderingState
> {
  readonly state: ImageorderingState = {
    mode: 'edit',
  };

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

  onChangeMode = (mode: ModesType = 'edit') => this.setState({ mode });

  goToEditMode = () => this.onChangeMode('edit');

  goToPreviewMode = () => this.onChangeMode('preview');

  goToFinishMode = () => this.onChangeMode('finish');

  goToReviewMode = () => this.onChangeMode('review');

  render() {
    const { mode } = this.state;
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

        {mode === 'edit' && <EditMode goToPreview={this.goToPreviewMode} />}
        {mode === 'preview' && (
          <PreviewMode
            goToEdit={this.goToEditMode}
            goToFinish={this.goToFinishMode}
          />
        )}
        {mode === 'finish' && <FinishMode goToReview={this.goToReviewMode} />}
        {mode === 'review' && <EditMode readonly />}

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
