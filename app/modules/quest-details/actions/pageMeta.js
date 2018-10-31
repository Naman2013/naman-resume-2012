import axios from 'axios';

export const FETCH_QUEST_PAGE_META_START = 'FETCH_QUEST_PAGE_META_START';
export const FETCH_QUEST_PAGE_META_SUCCESS = 'FETCH_QUEST_PAGE_META_SUCCESS';
export const FETCH_QUEST_PAGE_META_FAILURE = 'FETCH_QUEST_PAGE_META_FAILURE';

const fetchQuestPageMetaStart = () => ({
  type: FETCH_QUEST_PAGE_META_START,
});

const fetchQuestPageMetaSuccess = payload => ({
  type: FETCH_QUEST_PAGE_META_SUCCESS,
  payload,
});

const fetchQuestPageMetaFailure = payload => ({
  type: FETCH_QUEST_PAGE_META_FAILURE,
  payload,
});

export const fetchQuestPageMeta = ({
  lang,
  ver,
  questId,
}) => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(fetchQuestPageMetaStart());
  return axios.post('/api/quests/getQuest', {
    lang,
    questId,
    ver,
    at,
    token,
    cid,
  })
    .then(result => dispatch(fetchQuestPageMetaSuccess(result.data)))
    .catch(error => dispatch(fetchQuestPageMetaFailure(error)));
};

export default {
  fetchQuestPageMeta,
};
