import axios from 'axios';
import { getThreadList } from '../../services/discussions/get-thread-list';
import { createThread } from 'services/discussions/create-thread';
import { fetchAstronomerAnswers } from '../ask-astronomer-answers/actions';

export const FETCH_ASTRONOMER_QUESTIONS_START = 'FETCH_ASTRONOMER_QUESTIONS_START';
export const FETCH_ASTRONOMER_QUESTIONS_SUCCESS = 'FETCH_ASTRONOMER_QUESTIONS_SUCCESS';
export const FETCH_ASTRONOMER_QUESTIONS_FAIL = 'FETCH_ASTRONOMER_QUESTIONS_FAIL';

export const ASK_QUESTION_START = 'ASK_QUESTION_START';
export const ASK_QUESTION_SUCCESS = 'ASK_QUESTION_SUCCESS';
export const ASK_QUESTION_FAIL = 'ASK_QUESTION_FAIL';


const fetchAstronomerQuestionsStart = payload => ({
  type: FETCH_ASTRONOMER_QUESTIONS_START,
  payload,
});

const fetchAstronomerQuestionsSuccess = payload => ({
  type: FETCH_ASTRONOMER_QUESTIONS_SUCCESS,
  payload,
});

const fetchAstronomerQuestionsFail = payload => ({
  type: FETCH_ASTRONOMER_QUESTIONS_FAIL,
  payload,
});

export const fetchAstronomerQuestions = ({
  appendToList = false,
  count,
  lang,
  page,
  answerState,
  objectId,
  ver,
}) => (dispatch, getState) => {
  const { cid, at, token } = getState().user;
  const { count } = getState().astronomerQuestions;
  dispatch(fetchAstronomerQuestionsStart({ appendToList }));
  return axios.post('/api/forum/getQuestionsList', {
    appendToList,
    at,
    callSource: 'qanda',
    cid,
    count,
    lang,
    page,
    token,
    ver,
    objectId,
    answerState,
  })
  .then(result => {
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

const askQuestionStart = () => ({
  type: ASK_QUESTION_START,
});

const askQuestionSuccess = payload => ({
  type: ASK_QUESTION_SUCCESS,
  payload,
});

const askQuestionFail = payload => ({
  type: ASK_QUESTION_FAIL,
  payload,
});

export const askQuestion = ({
  content,
  forumId,
  lang,
  objectId,
  S3URLs,
  status,
  title,
  topicId,
  ver,
}) => (dispatch, getState) => {
  dispatch(askQuestionStart());
  const { at, cid, token } = getState().user;
  return createThread({
    at,
    callSource: 'qanda',
    cid,
    content,
    forumId,
    lang,
    objectId,
    S3URLs,
    status,
    title,
    token,
    topicId,
    ver,
  })
    .then(res => dispatch(askQuestionSuccess(res.data)))
    .catch(err => dispatch(askQuestionFail(err)));
};
