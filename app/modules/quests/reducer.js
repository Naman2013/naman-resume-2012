import { actions, constants } from 'ducks-helpers';
import { handleActions } from 'redux-actions';

export const TYPE = constants('quests', [
  '~GET_QUESTS',

  // QUEST STEP PAGE
  '~GET_QUEST_STEP',
  '~GET_QUEST_OUTPUT',
]);

export const ACTION = actions(TYPE);

const initialState = {
  isFetching: false,

  stepData: {},
};

export default handleActions(
  {
    [TYPE.GET_QUESTS]: start,
    [TYPE.GET_QUESTS_SUCCESS]: getQuestsSuccess,
    [TYPE.GET_QUESTS_ERROR]: error,

    [TYPE.GET_QUEST_STEP]: start,
    [TYPE.GET_QUEST_STEP_SUCCESS]: getStepSuccess,
    [TYPE.GET_QUEST_STEP_ERROR]: error,
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
