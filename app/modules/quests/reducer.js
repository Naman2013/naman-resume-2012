import { actions, constants } from 'ducks-helpers';
import { handleActions } from 'redux-actions';

export const TYPE = constants('quests', [
  'START_QUEST_FETCHING',
  '~GET_QUESTS',
  '~GET_APPENDIX',

  // QUEST STEP PAGE
  '~GET_QUEST_STEP',
  'CLEAR_QUEST_STEP_DATA',
  '~GET_QUEST_OUTPUT',
  '~GET_QUEST_COMPLETED',
  '~GET_CUSTOMER_QUESTS',

  '~GET_DATA_COLLECTION',
  '~GET_DATA_COLLECTION_SLOT_IMAGES',
  '~SET_DATA_COLLECTION_SLOT_IMAGES',

  '~GET_QA_FREE_FORM',
  '~SET_QA_FREE_FORM',
  'SET_QA_FREE_FORM_ANSWER',
  '~GET_QA_FILL_BLANKS',
  '~SET_QA_FILL_BLANKS',
  'SET_QA_FILL_BLANKS_ANSWER',
  '~GET_QA_MULTIPLE_CHOICE',
  '~SET_QA_MULTIPLE_CHOICE',

  '~GET_QUEST_GUIDE_PANEL',
  '~SET_QUEST_COMPLETED',

  '~GET_ANIMATION',
  '~GET_ANIMATION_FRAMES',
  'SET_ACTIVE_FRAME',
  '~SET_ANIMATION',
  'SET_ANIMATION_DATA',

  '~GET_RICH_TEXT_INPUT_MODULE',
  '~SET_RICH_TEXT_INPUT_MODULE',

  '~GET_IMAGEORDERING_MODULE',
  '~SET_IMAGEORDERING_MODULE',

  'SET_IMAGE_ORDERING_ACTIVITY_STATE',
]);

export const ACTION = actions(TYPE);

const initialState = {
  isFetching: false,

  stepData: {},
  questOutput: {},
  customerQuests: { QuestList: [] },
  questCompletedData: {
    stepsCompletedList: [],
    suggestedQuestsList: [],
  },
  questDataCollection: {
    dotMenu: {
      objectInfo: {},
    },
  },
  questDataCollectionSlotImages: {
    imageList: [],
    firstImageNumber: 1,
    maxImageCount: 9,
    pagingMode: 'api',
  },

  questQaFreeForm: {},
  questQaFillBlanks: {},
  questQaMultipleChoice: {},

  questGuidePanel: {},

  questAnimation: {},
  questAnimationFrames: { frameList: [] },
  activeFrame: {
    frameId: 1,
    caption: 'FRAME 1',
    infoArray: {
      objectName: '',
      imageDate: '',
      imageTime: '',
    },
    frameHeader: '',
    dotMenuFrame: {},
  },
  questAnimationData: { zoom: null },

  richTextInputModules: {},

  imageorderingModules: {},
};

export default handleActions(
  {
    [TYPE.START_QUEST_FETCHING]: start,

    // ABOUT PAGE
    [TYPE.GET_QUESTS]: start,
    [TYPE.GET_QUESTS_SUCCESS]: getQuestsSuccess,
    [TYPE.GET_QUESTS_ERROR]: error,

    [TYPE.GET_APPENDIX]: start,
    [TYPE.GET_APPENDIX_SUCCESS]: getQuestsAppendixSuccess,
    [TYPE.GET_APPENDIX_ERROR]: error,
    // END: ABOUT PAGE

    // STEP PAGE
    [TYPE.GET_QUEST_STEP]: start,
    [TYPE.GET_QUEST_STEP_SUCCESS]: getStepSuccess,
    [TYPE.GET_QUEST_STEP_ERROR]: error,

    [TYPE.CLEAR_QUEST_STEP_DATA]: clearQuestStepData,

    [TYPE.GET_QUEST_OUTPUT]: start,
    [TYPE.GET_QUEST_OUTPUT_SUCCESS]: getQuestOutputSuccess,
    [TYPE.GET_QUEST_OUTPUT_ERROR]: error,

    [TYPE.GET_QUEST_COMPLETED]: start,
    [TYPE.GET_QUEST_COMPLETED_SUCCESS]: getQuestCompletedSuccess,
    [TYPE.GET_QUEST_COMPLETED_ERROR]: error,

    [TYPE.GET_DATA_COLLECTION]: start,
    [TYPE.GET_DATA_COLLECTION_SUCCESS]: getDataCollectionSuccess,
    [TYPE.GET_DATA_COLLECTION_ERROR]: error,

    [TYPE.GET_DATA_COLLECTION_SLOT_IMAGES]: startGetDataCollectionSlotImages,
    [TYPE.GET_DATA_COLLECTION_SLOT_IMAGES_SUCCESS]: getDataCollectionSlotImagesSuccess,
    [TYPE.GET_DATA_COLLECTION_SLOT_IMAGES_ERROR]: error,

    [TYPE.SET_DATA_COLLECTION_SLOT_IMAGES]: start,
    [TYPE.SET_DATA_COLLECTION_SLOT_IMAGES_SUCCESS]: setDataCollectionSlotImagesSuccess,
    [TYPE.SET_DATA_COLLECTION_SLOT_IMAGES_ERROR]: error,
    // END: STEP PAGE

    // QA MODULES
    [TYPE.GET_QA_FREE_FORM]: start,
    [TYPE.GET_QA_FREE_FORM_SUCCESS]: getQaFreeFormSuccess,
    [TYPE.GET_QA_FREE_FORM_ERROR]: error,

    [TYPE.SET_QUEST_COMPLETED]: start,
    [TYPE.SET_QUEST_COMPLETED_SUCCESS]: setQuestCompletedSuccess,
    [TYPE.SET_QUEST_COMPLETED_ERROR]: error,

    [TYPE.SET_QA_FREE_FORM]: start,
    [TYPE.SET_QA_FREE_FORM_SUCCESS]: setQaFreeFormSuccess,
    [TYPE.SET_QA_FREE_FORM_ERROR]: error,

    [TYPE.SET_QA_FREE_FORM_ANSWER]: setQaFreeFormAnswer,

    [TYPE.GET_QA_FILL_BLANKS]: start,
    [TYPE.GET_QA_FILL_BLANKS_SUCCESS]: getQaFillBlanksSuccess,
    [TYPE.GET_QA_FILL_BLANKS_ERROR]: error,

    [TYPE.SET_QA_FILL_BLANKS]: start,
    [TYPE.SET_QA_FILL_BLANKS_SUCCESS]: setQaFillBlanksSuccess,
    [TYPE.SET_QA_FILL_BLANKS_ERROR]: error,

    [TYPE.SET_QA_FILL_BLANKS_ANSWER]: setQaFillBlanksAnswer,

    [TYPE.GET_QA_MULTIPLE_CHOICE]: start,
    [TYPE.GET_QA_MULTIPLE_CHOICE_SUCCESS]: getQaMultipleChoiceSuccess,
    [TYPE.GET_QA_MULTIPLE_CHOICE_ERROR]: error,

    [TYPE.SET_QA_MULTIPLE_CHOICE]: start,
    [TYPE.SET_QA_MULTIPLE_CHOICE_SUCCESS]: setQaMultipleChoiceSuccess,
    [TYPE.SET_QA_MULTIPLE_CHOICE_ERROR]: error,
    // END: QA MODULES

    [TYPE.GET_QUEST_GUIDE_PANEL]: start,
    [TYPE.GET_QUEST_GUIDE_PANEL_SUCCESS]: getQuestGuidePanelSuccess,
    [TYPE.GET_QUEST_GUIDE_PANEL_ERROR]: error,

    [TYPE.GET_CUSTOMER_QUESTS]: start,
    [TYPE.GET_CUSTOMER_QUESTS_SUCCESS]: getCustomerQuestsSuccess,
    [TYPE.GET_CUSTOMER_QUESTS_ERROR]: error,

    // ANIMATION MODULE
    [TYPE.GET_ANIMATION]: start,
    [TYPE.GET_ANIMATION_SUCCESS]: getAnimationSuccess,
    [TYPE.GET_ANIMATION_ERROR]: error,
    [TYPE.GET_ANIMATION_FRAMES]: start,
    [TYPE.GET_ANIMATION_FRAMES_SUCCESS]: getAnimationFramesSuccess,
    [TYPE.GET_ANIMATION_FRAMES_ERROR]: error,
    [TYPE.SET_ANIMATION_ERROR]: error,

    [TYPE.SET_ACTIVE_FRAME]: setActiveFrame,
    [TYPE.SET_ANIMATION_DATA]: setAnimationData,
    // END: ANIMATION MODULE

    [TYPE.GET_RICH_TEXT_INPUT_MODULE]: start,
    [TYPE.GET_RICH_TEXT_INPUT_MODULE_SUCCESS]: getRichTextInputModuleSuccess,
    [TYPE.GET_RICH_TEXT_INPUT_MODULE_ERROR]: error,

    [TYPE.SET_RICH_TEXT_INPUT_MODULE]: setRichTextInputModule,
    [TYPE.SET_RICH_TEXT_INPUT_MODULE_ERROR]: error,

    [TYPE.GET_IMAGEORDERING_MODULE]: start,
    [TYPE.GET_IMAGEORDERING_MODULE_SUCCESS]: getImageorderingModuleSuccess,
    [TYPE.GET_IMAGEORDERING_MODULE_ERROR]: error,

    [TYPE.SET_IMAGEORDERING_MODULE]: start,
    [TYPE.SET_IMAGEORDERING_MODULE_SUCCESS]: end,
    [TYPE.SET_IMAGEORDERING_MODULE_ERROR]: error,
    [TYPE.SET_IMAGE_ORDERING_ACTIVITY_STATE]: setImageOrderingActivityState,
  },
  initialState
);

function start(state = initialState) {
  return {
    ...state,
    isFetching: true,
  };
}

function end(state = initialState) {
  return {
    ...state,
    isFetching: false,
  };
}

function getQuestsSuccess(state = initialState) {
  return {
    ...state,
    isFetching: false,
  };
}

function getQuestsAppendixSuccess(state) {
  return {
    ...state,
    isFetching: false,
  };
}

function error(state = initialState) {
  return {
    ...state,
    isFetching: false,
  };
}

function getStepSuccess(state, { payload }) {
  return {
    ...state,
    isFetching: false,
    stepData: payload,
  };
}

function clearQuestStepData(state) {
  return {
    ...state,
    stepData: {},
  };
}

function getQuestOutputSuccess(state, { payload }) {
  const { questOutput } = state;
  return {
    ...state,
    isFetching: false,
    questOutput: { ...questOutput, [payload.moduleId]: payload },
  };
}

function getQuestCompletedSuccess(state, { payload }) {
  return {
    ...state,
    isFetching: false,
    questCompletedData: {
      ...payload,
    },
  };
}

function getDataCollectionSuccess(state, { payload }) {
  const { questDataCollection } = state;
  return {
    ...state,
    isFetching: false,
    questDataCollection: payload,
  };
}

function startGetDataCollectionSlotImages(state) {
  const { questDataCollectionSlotImages } = state;
  return {
    ...state,
    isFetching: true,
    questDataCollectionSlotImages: {
      ...questDataCollectionSlotImages,
      imageList: [],
    },
  };
}

function getDataCollectionSlotImagesSuccess(state, { payload }) {
  const { questDataCollectionSlotImages } = state;
  return {
    ...state,
    isFetching: false,
    questDataCollectionSlotImages: {
      ...payload,
      imageList: [
        ...questDataCollectionSlotImages.imageList,
        ...payload.imageList,
      ],
    },
  };
}

function setDataCollectionSlotImagesSuccess(state) {
  return {
    ...state,
    isFetching: false,
  };
}

function getQaFreeFormSuccess(state, { payload }) {
  const { questQaFreeForm } = state;
  return {
    ...state,
    isFetching: false,
    questQaFreeForm: { ...questQaFreeForm, [payload.moduleId]: payload },
  };
}

function setQuestCompletedSuccess(state, { payload }) {
  return {
    ...state,
    isFetching: false,
  };
}

function setQaFreeFormSuccess(state, { payload }) {
  return {
    ...state,
    isFetching: false,
  };
}

function setQaFreeFormAnswer(state, { payload }) {
  const { questQaFreeForm } = state;
  const { moduleId, answerText } = payload;
  return {
    ...state,
    isFetching: false,
    questQaFreeForm: {
      ...questQaFreeForm,
      [moduleId]: {
        ...questQaFreeForm[moduleId],
        answerText,
      },
    },
  };
}

function getQaFillBlanksSuccess(state, { payload }) {
  const { questQaFillBlanks } = state;
  return {
    ...state,
    isFetching: false,
    questQaFillBlanks: { ...questQaFillBlanks, [payload.moduleId]: payload },
  };
}

function setQaFillBlanksSuccess(state, { payload }) {
  return {
    ...state,
    isFetching: false,
  };
}

function setQaFillBlanksAnswer(state, { payload }) {
  const { questQaFillBlanks } = state;
  const { moduleId, answerText, questionIndex } = payload;
  const { answers } = questQaFillBlanks[moduleId];
  answers[questionIndex] = { ...answers[questionIndex], answerText };

  return {
    ...state,
    isFetching: false,
    questQaFillBlanks: {
      ...questQaFillBlanks,
      [moduleId]: {
        ...questQaFillBlanks[moduleId],
        answers: [...answers],
      },
    },
  };
}

function getQaMultipleChoiceSuccess(state, { payload }) {
  const { questQaMultipleChoice } = state;
  return {
    ...state,
    isFetching: false,
    questQaMultipleChoice: {
      ...questQaMultipleChoice,
      [payload.moduleId]: payload,
    },
  };
}

function setQaMultipleChoiceSuccess(state, { payload }) {
  return {
    ...state,
    isFetching: false,
  };
}

function getQuestGuidePanelSuccess(state, { payload }) {
  const { questGuidePanel } = state;
  return {
    ...state,
    isFetching: false,
    questGuidePanel: { ...questGuidePanel, [payload.moduleId]: payload },
  };
}

function getCustomerQuestsSuccess(state, { payload }) {
  return {
    ...state,
    isFetching: false,
    customerQuests: {
      ...payload,
    },
  };
}

// ANIMATION MODULE
function getAnimationSuccess(state, { payload }) {
  return {
    ...state,
    isFetching: false,
    questAnimation: {
      ...payload,
    },
  };
}

function getAnimationFramesSuccess(state, { payload }) {
  const firstFrame = payload.frameList[payload.selectedFrameIndex - 1];
  const activeFrame = firstFrame.frameId ? firstFrame : payload.frameList[0];

  return {
    ...state,
    isFetching: false,
    questAnimationFrames: {
      ...payload,
    },
    activeFrame: { ...activeFrame },
    questAnimationData: {
      zoom: Math.round(payload.zoom * 100),
    },
  };
}

function setActiveFrame(state, { payload }) {
  const { frameList } = state.questAnimationFrames;
  frameList[payload.frameIndex - 1] = { ...payload };
  return {
    ...state,
    activeFrame: payload,
    questAnimationFrames: {
      ...state.questAnimationFrames,
      frameList: [...frameList],
    },
  };
}

function setAnimationData(state, { payload }) {
  return {
    ...state,
    questAnimationData: {
      ...state.questAnimationData,
      ...payload,
    },
  };
}
// END: ANIMATION MODULE

// RICH_TEXT_INPUT_MODULE
function setRichTextInputModule(state, { payload }) {
  const { moduleId, answerText } = payload;
  return {
    ...state,
    isFetching: true,
    richTextInputModules: {
      ...state.richTextInputModules,
      [moduleId]: {
        ...state.richTextInputModules[moduleId],
        answerText:
          answerText || state.richTextInputModules[moduleId].answerText,
      },
    },
  };
}

function getRichTextInputModuleSuccess(state, { payload }) {
  return {
    ...state,
    isFetching: false,
    richTextInputModules: {
      ...state.richTextInputModules,
      [payload.moduleId]: payload,
    },
  };
}

function getImageorderingModuleSuccess(state, { payload }) {
  return {
    ...state,
    isFetching: false,
    imageorderingModules: {
      ...state.imageorderingModules,
      [payload.moduleId]: payload,
    },
  };
}

function setImageOrderingActivityState(
  state,
  { payload: { moduleId, activityState } }
) {
  return {
    ...state,
    imageorderingModules: {
      ...state.imageorderingModules,
      [moduleId]: {
        ...state.imageorderingModules[moduleId],
        activityState,
      },
    },
  };
}
