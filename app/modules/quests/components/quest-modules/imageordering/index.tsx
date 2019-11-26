import React from 'react';
import {
  IQuestStepModule,
  ImageorderingModuleResponse,
} from 'app/modules/quests/types';
import './styles.scss';
import { QuestStepModuleHeader } from 'app/modules/quests/components/quest-step-module-header';
import { ACTIVITY_STATES } from 'app/modules/quests/components/quest-modules/qa-free-form';
import { QuestQaAnswerForm } from 'app/modules/quests/components/quest-qa/quest-qa-answer-form';
import { EditMode } from 'app/modules/quests/components/quest-modules/imageordering/edit-mode/edit';
import { FinishMode } from 'app/modules/quests/components/quest-modules/imageordering/finish';
import { PreviewMode } from 'app/modules/quests/components/quest-modules/imageordering/preview';

type ImageorderingProps = {
  module: IQuestStepModule;
  readOnly: boolean;
  routeParams: any;
  stepData: any;
  slot?: any;
  questId: string;
  navigateToNextStep: Function;
  getImageorderingModule: Function;
  setImageorderingModule: Function;
  refreshQuestStep: Function;
  imageorderingModule: ImageorderingModuleResponse;
};

enum Mode {
  edit,
  preview,
  finish,
  review,
}

type ImageorderingState = {
  mode: Mode;
};

export class Imageordering extends React.PureComponent<
  ImageorderingProps,
  ImageorderingState
> {
  state = {
    mode: Mode.edit,
  };

  componentDidMount(): void {
    const { module, questId, stepData, getImageorderingModule } = this.props;
    const { questUUID } = stepData;
    const { moduleId, moduleUUID } = module;

    getImageorderingModule({
      questId,
      questUUID,
      moduleId,
      moduleUUID,
    });
  }

  onAction = (action: string, answerText: string) => {
    // const {
    //   setImageorderingModule,
    //   module,
    //   imageOrderingModule,
    //   refreshQuestStep,
    // } = this.props;
    // const { moduleId } = module;
    // const { questId, questUUID, moduleUUID } = imageOrderingModule;
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

  onChangeMode = (mode: Mode): void => this.setState({ mode });

  goToEditMode = (): void => this.onChangeMode(Mode.edit);

  goToPreviewMode = (): void => this.onChangeMode(Mode.preview);

  goToFinishMode = (): void => this.onChangeMode(Mode.finish);

  goToReviewMode = (): void => this.onChangeMode(Mode.review);

  render() {
    const { mode } = this.state;
    const { module, readOnly, imageorderingModule } = this.props;

    // const {
    //   activityTitle,
    //   activityState,
    //   activitySequenceText,
    //   activityInstructions,
    // } = imageorderingModule;

    return (
      <div className="rich-text-module quest-qa-free-form">
        <QuestStepModuleHeader
          title="activityTitle"
          completed //activityState === ACTIVITY_STATES.complete
          sequenceText="activitySequenceText"
        />

        {/*<div className="quest-qa-instructions">activityInstructions</div>*/}

        {mode === Mode.edit && (
          <EditMode
            goToPreview={this.goToPreviewMode}
            imageOrderingModule={imageorderingModule}
          />
        )}
        {mode === Mode.preview && (
          <PreviewMode
            goToEdit={this.goToEditMode}
            goToFinish={this.goToFinishMode}
          />
        )}
        {mode === Mode.finish && (
          <FinishMode goToReview={this.goToReviewMode} />
        )}
        {mode === Mode.review && (
          <EditMode readonly imageOrderingModule={imageorderingModule} />
        )}
      </div>
    );
  }
}
