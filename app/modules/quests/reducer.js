import { actions, constants } from 'ducks-helpers';
import { handleActions } from 'redux-actions';

export const TYPE = constants('quests', [
  '~GET_QUESTS',

  // QUEST STEP PAGE
  '~GET_QUEST_STEP',
]);

export const ACTION = actions(TYPE);

const initialState = {
  isFetching: false,
};

export default handleActions(
  {
    [TYPE.GET_QUESTS]: getQuests,
    [TYPE.GET_QUESTS_SUCCESS]: getQuestsSuccess,
    [TYPE.GET_QUESTS_ERROR]: getQuestsError,
  },
  initialState
);

function getQuests(state = initialState) {
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

function getQuestsError(state = initialState) {
  return {
    ...state,
    isFetching: false,
  };
}
