import { createSelector } from 'reselect';
import { getQuestModuleList } from './utils';

export const selectQuests = state => state.quests;
export const selectQuestsDetails = state => state.questDetails;

export const makeQuestsLoadingSelector = () =>
  createSelector(
    selectQuests,
    state => state.isFetching
  );

// QUEST STEP PAGE
export const makeQuestsStepDataSelector = () =>
  createSelector(
    selectQuests,
    state => state.stepData
  );

export const makeQuestsStepModuleListSelector = () =>
  createSelector(
    makeQuestsStepDataSelector(),
    state => getQuestModuleList(state.stepModuleList) || []
  );

export const makeQuestsDetailsModalSelector = () =>
  createSelector(
    selectQuestsDetails,
    state => state.modal
  );

export const makeQuestOutputSelector = () =>
  createSelector(
    selectQuests,
    state => state.questOutput
  );

export const makeQuestCompletedSelector = () =>
  createSelector(
    selectQuests,
    state => state.questCompletedData
  );

export const makeQuestDataCollectionSelector = () =>
  createSelector(
    selectQuests,
    state => state.questDataCollection
  );

export const makeQuestDataCollectionSlotImagesSelector = () =>
  createSelector(
    selectQuests,
    state => state.questDataCollectionSlotImages
  );
// END: QUEST STEP PAGE

// QUEST QA MODULES
export const makeQuestQaFreeFormSelector = () =>
  createSelector(
    selectQuests,
    state => state.questQaFreeForm
  );

export const makeQuestQaFillBlanksSelector = () =>
  createSelector(
    selectQuests,
    state => state.questQaFillBlanks
  );

export const makeQuestQaMultipleChoiceSelector = () =>
  createSelector(
    selectQuests,
    state => state.questQaMultipleChoice
  );
// END: QUEST QA MODULES

export const makeQuestGuidePanelSelector = () =>
  createSelector(
    selectQuests,
    state => state.questGuidePanel
  );

export const makeCustomerQuestsSelector = () =>
  createSelector(
    selectQuests,
    state => state.customerQuests
  );

// QUEST ANIMATION MODULE
export const makeQuestAnimationSelector = () =>
  createSelector(
    selectQuests,
    state => state.questAnimation
  );
export const makeQuestAnimationFramesSelector = () =>
  createSelector(
    selectQuests,
    state => state.questAnimationFrames
  );
export const makeQuestAnimationActiveFrameSelector = () =>
  createSelector(
    selectQuests,
    state => state.activeFrame
  );
// END: QUEST ANIMATION MODULE

export const richTextInputModulesSelector = () =>
  createSelector(
    selectQuests,
    state => state.richTextInputModules
  );
