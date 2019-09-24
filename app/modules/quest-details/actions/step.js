import { API } from 'app/api';

export const FETCH_QUEST_STEP_START = 'FETCH_QUEST_STEP_START';
export const FETCH_QUEST_STEP_SUCCESS = 'FETCH_QUEST_STEP_SUCCESS';
export const FETCH_QUEST_STEP_FAILURE = 'FETCH_QUEST_STEP_FAILURE';

const fetchQuestStepPageStart = () => ({
  type: FETCH_QUEST_STEP_START,
});

const fetchQuestStepPageSuccess = payload => ({
  type: FETCH_QUEST_STEP_SUCCESS,
  payload,
});

const fetchQuestStepPageFailure = payload => ({
  type: FETCH_QUEST_STEP_FAILURE,
  payload,
});

export const fetchQuestStepPage = ({
  lang,
  questId,
  stepModuleId,
  ver,
}) => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(fetchQuestStepPageStart());
  return API.post('/api/quests/getStep', {
    at,
    cid,
    lang,
    questId,
    stepModuleId,
    token,
    ver,
  })
    .then(result => dispatch(fetchQuestStepPageSuccess(result.data)))
    .catch(error => dispatch(fetchQuestStepPageFailure(error)));
};

export default {
  fetchQuestStepPage,
};
