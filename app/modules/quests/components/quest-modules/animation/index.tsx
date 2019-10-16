import * as React from 'react';
import { IQuestStepModule } from 'app/modules/quests/types';

type AnimationModuleProps = {
  module: IQuestStepModule;
  readOnly: boolean;
  routeParams: any;
  navigateToNextStep: Function;
  refreshQuestStep: Function;
};

export const AnimationModule: React.FC<AnimationModuleProps> = React.memo(
  props => {
    return <div>TEST</div>;
  }
);
