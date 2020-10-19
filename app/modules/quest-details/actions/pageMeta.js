import {
  API
} from 'app/api';

export const FETCH_QUEST_PAGE_META_START = 'FETCH_QUEST_PAGE_META_START';
export const FETCH_QUEST_PAGE_META_SUCCESS = 'FETCH_QUEST_PAGE_META_SUCCESS';
export const FETCH_QUEST_PAGE_META_FAILURE = 'FETCH_QUEST_PAGE_META_FAILURE';

export const FETCH_QUEST_PDF_START = 'FETCH_QUEST_PDF_START';
export const FETCH_QUEST_PDF_SUCCESS = 'FETCH_QUEST_PDF_SUCCESS';
export const FETCH_QUEST_PDF_FAILURE = 'FETCH_QUEST_PDF_FAILURE';

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
  const {
    at,
    token,
    cid
  } = getState().user;
  dispatch(fetchQuestPageMetaStart());
  return API.post('/api/quests/getQuest', {
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


export const downloadQuestReport = ({
  lang,
  ver,
  questId,
  accessorCustomerId,
  requestedCustomerId,
}) => (dispatch, getState) => {
  const {
    at,
    token,
    cid
  } = getState().user;
  
  return API.post('/api/quests/downloadQuestReportPDF', {
      questId,
      lang,
      ver,
      at,
      token,
      cid,
      accessorCustomerId,
      requestedCustomerId

    })
}; 

export default {
  fetchQuestPageMeta,
  downloadQuestReport
};
