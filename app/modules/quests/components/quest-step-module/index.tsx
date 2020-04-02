import * as React from 'react';
import { questModuleType } from 'app/modules/quests/data';
import { IQuestStepModule, IQuestStep } from 'app/modules/quests/types';
import AnimationModule from 'app/modules/quests/containers/quest-modules/animation';
import RichTextModule from 'app/modules/quests/containers/quest-modules/rich-text-input';
import Imageordering from 'app/modules/quests/containers/quest-modules/imageordering';
import QuestModuleTextOutput from '../../containers/quest-modules/textoutput';
import QuestModuleDataCollection from '../../containers/quest-modules/data-collection';
import QuestModuleQaFreeForm from '../../containers/quest-modules/qa-free-form';
import QuestModuleQaFillBlanks from '../../containers/quest-modules/qa-fill-blanks';
import QuestModuleQaMultipleChoice from '../../containers/quest-modules/qa-multiple-choice';
import QuestModuleGuidePanel from '../../containers/quest-modules/guide-panel';

type QuestStepModuleProps = {
  module: IQuestStepModule;
  readOnly: boolean;
  routeParams: any;
  navigateToNextStep: Function;
  refreshQuestStep: Function;
  handleBacktoQuest: Function;
};

export const QuestStepModule: React.FC<QuestStepModuleProps> = React.memo(
  props => {
    const {
      module,
      readOnly,
      routeParams,
      navigateToNextStep,
      refreshQuestStep,
      handleBacktoQuest,
    } = props;
    const { moduleType } = module;

    switch (moduleType) {
      case questModuleType.datacollectsame:
      case questModuleType.datacollectdifferent:
        return (
          <QuestModuleDataCollection
            module={module}
            key={`quest-data-collection-${module.moduleId}`}
            questId={routeParams.questId}
            navigateToNextStep={navigateToNextStep}
            readOnly={readOnly}
            refreshQuestStep={refreshQuestStep}
          />
        );

      case questModuleType.textoutput:
        return (
          <QuestModuleTextOutput
            module={module}
            key={`quest-text-output-${module.moduleId}`}
            readOnly={readOnly}
          />
        );

      case questModuleType.qafreeform:
        return (
          <QuestModuleQaFreeForm
            module={module}
            key={`quest-qa-freeform-${module.moduleId}`}
            questId={routeParams.questId}
            refreshQuestStep={refreshQuestStep}
            readOnly={readOnly}
          />
        );

      case questModuleType.qafillblanks:
        return (
          <QuestModuleQaFillBlanks
            module={module}
            key={`quest-qa-fillblanks-${module.moduleId}`}
            questId={routeParams.questId}
            refreshQuestStep={refreshQuestStep}
            readOnly={readOnly}
          />
        );

      case questModuleType.qamultiplechoice:
        return (
          <QuestModuleQaMultipleChoice
            module={module}
            key={`quest-qa-multiplechoice-${module.moduleId}`}
            questId={routeParams.questId}
            refreshQuestStep={refreshQuestStep}
            readOnly={readOnly}
          />
        );

      case questModuleType.guidepanel:
        return (
          <QuestModuleGuidePanel
            handleBacktoQuest={handleBacktoQuest}
            module={module}
            key={`quest-text-output-${module.moduleId}`}
            readOnly={readOnly}
          />
        );

      case questModuleType.animation:
        return (
          <AnimationModule
            module={module}
            questId={routeParams.questId}
            key={module.moduleId}
            readOnly={readOnly}
            refreshQuestStep={refreshQuestStep}
          />
        );

      case questModuleType.textinput:
        return (
          <RichTextModule
            module={module}
            moduleId={module.moduleId}
            questId={routeParams.questId}
            key={`rich-text-module-input-${module.moduleId}`}
            readOnly={readOnly}
            refreshQuestStep={refreshQuestStep}
          />
        );

      case questModuleType.imageordering:
        return (
          <Imageordering
            handleBacktoQuest={handleBacktoQuest}
            module={module}
            moduleId={module.moduleId}
            questId={routeParams.questId}
            key={`imageordering-${module.moduleId}`}
            readOnly={readOnly}
            refreshQuestStep={refreshQuestStep}
          />
        );

      default:
        return <React.Fragment />;
    }
  }
);
