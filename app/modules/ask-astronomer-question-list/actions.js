import axios from 'axios';

export const FETCH_ASTRONOMER_QUESTION_LIST_START = 'FETCH_ASTRONOMER_QUESTION_LIST_START';
export const FETCH_ASTRONOMER_QUESTION_LIST_SUCCESS = 'FETCH_ASTRONOMER_QUESTION_LIST_SUCCESS';
export const FETCH_ASTRONOMER_QUESTION_LIST_FAIL = 'FETCH_ASTRONOMER_QUESTION_LIST_FAIL';

const fetchAstronomerQuestionListStart = payload => ({
  type: FETCH_ASTRONOMER_QUESTION_LIST_START,
  payload,
});

const fetchAstronomerQuestionListSuccess = payload => ({
  type: FETCH_ASTRONOMER_QUESTION_LIST_SUCCESS,
  payload,
});

const fetchAstronomerQuestionListFail = payload => ({
  type: FETCH_ASTRONOMER_QUESTION_LIST_SUCCESS,
  payload,
});

export const fetchAstronomerQuestionList = ({
  appendToList = false,
  at,
  cid,
  count,
  lang,
  page,
  token,
  ver,
  answerState,
}) => (dispatch, getState) => {
  const { cid, at, token } = getState().user;
  const { count } = getState().astronomerQuestionList;
  dispatch(fetchAstronomerQuestionListStart({ appendToList }));
  return axios.post('/api/forum/getQuestionsList', {
    appendToList,
    at,
    answerState,
    callSource: 'qanda',
    cid,
    count,
    lang,
    page,
    token,
    ver,
  })
.then(result => dispatch(fetchAstronomerQuestionListSuccess(
      Object.assign({
        page,
        appendToList,
      }, result.data))))
.catch(error => dispatch(fetchAstronomerQuestionListFail(error)));
};
