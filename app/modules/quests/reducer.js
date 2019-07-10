import { actions, constants } from 'ducks-helpers';
import { handleActions } from 'redux-actions';

export const TYPE = constants('quests', [
  '~GET_QUESTS',

  // QUEST STEP PAGE
  '~GET_QUEST_STEP',
  '~GET_QUEST_OUTPUT',
  '~GET_DATA_COLLECTION',
  '~GET_DATA_COLLECTION_SLOT_IMAGES',
  '~SET_DATA_COLLECTION_IMAGES',
]);

export const ACTION = actions(TYPE);

const initialState = {
  isFetching: false,

  stepData: {},
  questOutput: {},
  questDataCollection: {},
  questDataCollectionSlotImages: {},
};

export default handleActions(
  {
    // ABOUT PAGE
    [TYPE.GET_QUESTS]: start,
    [TYPE.GET_QUESTS_SUCCESS]: getQuestsSuccess,
    [TYPE.GET_QUESTS_ERROR]: error,
    // END: ABOUT PAGE

    // STEP PAGE
    [TYPE.GET_QUEST_STEP]: start,
    [TYPE.GET_QUEST_STEP_SUCCESS]: getStepSuccess,
    [TYPE.GET_QUEST_STEP_ERROR]: error,

    [TYPE.GET_QUEST_OUTPUT]: start,
    [TYPE.GET_QUEST_OUTPUT_SUCCESS]: getQuestOutputSuccess,
    [TYPE.GET_QUEST_OUTPUT_ERROR]: error,

    [TYPE.GET_DATA_COLLECTION]: start,
    [TYPE.GET_DATA_COLLECTION_SUCCESS]: getDataCollectionSuccess,
    [TYPE.GET_DATA_COLLECTION_ERROR]: error,

    [TYPE.GET_DATA_COLLECTION_IMAGES]: start,
    [TYPE.GET_DATA_COLLECTION_SLOT_IMAGES_SUCCESS]: getDataCollectionSlotImagesSuccess,
    [TYPE.GET_DATA_COLLECTION_IMAGES_ERROR]: error,

    [TYPE.SET_DATA_COLLECTION_IMAGES]: start,
    [TYPE.SET_DATA_COLLECTION_IMAGES_SUCCESS]: setDataCollectionImagesSuccess,
    [TYPE.SET_DATA_COLLECTION_IMAGES_ERROR]: error,
    // END: STEP PAGE
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

function getQuestOutputSuccess(state, { payload }) {
  return {
    ...state,
    isFetching: false,
    questOutput: payload,
  };
}

function getDataCollectionSuccess(state, { payload }) {
  return {
    ...state,
    isFetching: false,
    questDataCollection: payload,
  };
}

function getDataCollectionSlotImagesSuccess(state, { payload }) {
  return {
    ...state,
    isFetching: false,
    questDataCollectionSlotImages: payload,
  };
}

function setDataCollectionImagesSuccess(state) {
  return {
    ...state,
    isFetching: false,
  };
}
