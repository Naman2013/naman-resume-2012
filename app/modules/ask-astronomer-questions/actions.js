import axios from 'axios';
import { getThreadList } from '../../services/discussions/get-thread-list';
import { fetchAstronomerAnswers } from '../ask-astronomer-answers/actions';

export const FETCH_ASTRONOMER_QUESTIONS_START = 'FETCH_ASTRONOMER_QUESTIONS_START';
export const FETCH_ASTRONOMER_QUESTIONS_SUCCESS = 'FETCH_ASTRONOMER_QUESTIONS_SUCCESS';
export const FETCH_ASTRONOMER_QUESTIONS_FAIL = 'FETCH_ASTRONOMER_QUESTIONS_FAIL';

const fetchAstronomerQuestionsStart = payload => ({
  type: FETCH_ASTRONOMER_QUESTIONS_START,
  payload,
});

const fetchAstronomerQuestionsSuccess = payload => ({
  type: FETCH_ASTRONOMER_QUESTIONS_SUCCESS,
  payload,
});

const fetchAstronomerQuestionsFail = payload => ({
  type: FETCH_ASTRONOMER_QUESTIONS_SUCCESS,
  payload,
});

export const fetchAstronomerQuestions = ({
  appendToList = false,
  at,
  cid,
  count,
  lang,
  page,
  token,
  topicId,
  ver,
}) => (dispatch, getState) => {
  const { cid, at, token } = getState().user;
  const { count } = getState().authorContent;
  dispatch(fetchAstronomerQuestionsStart({ appendToList }));
  return getThreadList({
    appendToList,
    at,
    callSource: 'qanda',
    cid,
    count,
    lang,
    page,
    token,
    topicId,
    ver,
  })
  .then(result => {
    console.log('result.data.threads', result.data.threads)
    if (result.data.threads.length > 0) {
      result.data.threads.forEach(thread => dispatch(fetchAstronomerAnswers({ threadId: thread.threadId })))
    }
    return dispatch(fetchAstronomerQuestionsSuccess(Object.assign({
      page,
      appendToList,
    }, result.data)))
  })
  .catch(error => dispatch(fetchAstronomerQuestionsFail(error)));
};
