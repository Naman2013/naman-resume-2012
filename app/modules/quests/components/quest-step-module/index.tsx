import * as React from 'react';
import { questModuleType } from 'app/modules/quests/data';
import { IQuestStepModule } from 'app/modules/quests/types';
import AnimationModule from 'app/modules/quests/containers/quest-modules/animation';
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
};

export const QuestStepModule: React.FC<QuestStepModuleProps> = React.memo(
  props => {
    const {
      module,
      readOnly,
      routeParams,
      navigateToNextStep,
      refreshQuestStep,
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
          />
        );

      case questModuleType.guidepanel:
        return (
          <QuestModuleGuidePanel
            module={module}
            key={`quest-text-output-${module.moduleId}`}
            readOnly={readOnly}
          />
        );

      case questModuleType.animation:
        return (
          <AnimationModule
            module={module}
            key={module.moduleId}
            readOnly={readOnly}
          />
        );

      default:
        return <React.Fragment />;
    }
  }
);
