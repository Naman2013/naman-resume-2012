import { actions, constants } from 'ducks-helpers';
import { handleActions } from 'redux-actions';

export const TYPE = constants('quests', [
  '~GET_QUESTS',
  '~GET_APPENDIX',

  // QUEST STEP PAGE
  '~GET_QUEST_STEP',
  'CLEAR_QUEST_STEP_DATA',
  '~GET_QUEST_OUTPUT',
  '~GET_DATA_COLLECTION',
  '~GET_DATA_COLLECTION_SLOT_IMAGES',
  '~SET_DATA_COLLECTION_SLOT_IMAGES',
  '~GET_QA_FREE_FORM',
  '~SET_QA_FREE_FORM',
  'SET_QA_FREE_FORM_ANSWER',
  '~GET_QA_FILL_BLANKS',
  '~SET_QA_FILL_BLANKS',
]);

export const ACTION = actions(TYPE);

const initialState = {
  isFetching: false,

  stepData: {},
  questOutput: {},
  questDataCollection: {},
  questDataCollectionSlotImages: {
    imageList: [],
    firstImageNumber: 1,
    maxImageCount: 9,
    pagingMode: 'api',
  },

  questQaFreeForm: {},
  questQaFillBlanks: {},
};

export default handleActions(
  {
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
    // END: QA MODULES
  },
  initialState
);

function start(state = initialState) {
  return {
    ...state,
    isFetching: true,
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
