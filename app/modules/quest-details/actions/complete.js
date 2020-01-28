import { API } from 'app/api';

export const FETCH_QUEST_COMPLETE_OVERVIEW_START =
  'FETCH_QUEST_COMPLETE_OVERVIEW_START';
export const FETCH_QUEST_COMPLETE_OVERVIEW_SUCCESS =
  'FETCH_QUEST_COMPLETE_OVERVIEW_SUCCESS';
export const FETCH_QUEST_COMPLETE_OVERVIEW_FAILURE =
  'FETCH_QUEST_COMPLETE_OVERVIEW_FAILURE';

const fetchQuestCompleteOverviewStart = () => ({
  type: FETCH_QUEST_COMPLETE_OVERVIEW_START,
});

const fetchQuestCompleteOverviewSuccess = payload => ({
  type: FETCH_QUEST_COMPLETE_OVERVIEW_SUCCESS,
  payload,
});

const fetchQuestCompleteOverviewFailure = payload => ({
  type: FETCH_QUEST_COMPLETE_OVERVIEW_FAILURE,
  payload,
});

export const fetchQuestCompleteOverview = ({
  lang,
  questId,
  moduleId,
  ver,
}) => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(fetchQuestCompleteOverviewStart());
  return API.post('/api/quests/getQuestCompleted', {
    at,
    cid,
    lang,
    questId,
    moduleId,
    token,
    ver,
  })
    .then(result => dispatch(fetchQuestCompleteOverviewSuccess(result.data)))
    .catch(error => dispatch(fetchQuestCompleteOverviewFailure(error)));
};

export default {
  fetchQuestCompleteOverview,
};
