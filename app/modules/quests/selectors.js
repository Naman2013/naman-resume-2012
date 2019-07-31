import { createSelector } from 'reselect';

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
    state => state.stepModuleList || []
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
// END: QUEST QA MODULES
