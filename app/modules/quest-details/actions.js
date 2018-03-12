import createReducer from '../utils/createReducer';

// services
import fetchQuestDataService from '../../services/quests/quest-data';

/* getQuestData */
export const FETCH_QUEST_DATA = 'FETCH_QUEST_DATA';
export const FETCH_QUEST_DATA_START = 'FETCH_QUEST_DATA_START';
export const FETCH_QUEST_DATA_FAIL = 'FETCH_QUEST_DATA_FAIL';
export const FETCH_QUEST_DATA_SUCCESS = 'FETCH_QUEST_DATA_SUCCESS';
export const RESET_QUEST_DATA = 'RESET_QUEST_DATA';


export const fetchQuestDataAction = (questId) => (dispatch, getState) => {
  dispatch(fetchQuestDataActionStart());

  const { token, at, cid } = getState().user;

  return fetchQuestDataService({
    token,
    at,
    cid,
    questId,
  }).then(
    result => {
      dispatch(fetchQuestDataActionSuccess(result.data));
    }
  );
};

export const resetQuestData = () => ({
  type: RESET_QUEST_DATA,
});

const fetchQuestDataActionStart = () => ({
  type: FETCH_QUEST_DATA_START,
});

const fetchQuestDataActionSuccess = (payload) => ({
    type: FETCH_QUEST_DATA_SUCCESS,
    payload,
});

const fetchQuestDataActionError = payload => ({
  type: FETCH_QUEST_DATA_FAIL,
  payload,
});
