import { createThread } from 'app/services/discussions/create-thread';
import axios from 'axios/index';
import { fetchAstronomerAnswers } from '../ask-astronomer-answers/actions';

export const FETCH_ASTRONOMER_QUESTIONS_START =
  'FETCH_ASTRONOMER_QUESTIONS_START';
export const FETCH_ASTRONOMER_QUESTIONS_SUCCESS =
  'FETCH_ASTRONOMER_QUESTIONS_SUCCESS';
export const FETCH_ASTRONOMER_QUESTIONS_FAIL =
  'FETCH_ASTRONOMER_QUESTIONS_FAIL';

export const REFETCH_ASTRONOMER_QUESTIONS_START =
  'REFETCH_ASTRONOMER_QUESTIONS_START';
export const REFETCH_ASTRONOMER_QUESTIONS_SUCCESS =
  'REFETCH_ASTRONOMER_QUESTIONS_SUCCESS';
export const REFETCH_ASTRONOMER_QUESTIONS_FAIL =
  'REFETCH_ASTRONOMER_QUESTIONS_FAIL';

export const ASK_QUESTION_START = 'ASK_QUESTION_START';
export const ASK_QUESTION_SUCCESS = 'ASK_QUESTION_SUCCESS';
export const ASK_QUESTION_FAIL = 'ASK_QUESTION_FAIL';

export const CHANGE_ANSWER_STATE = 'CHANGE_ANSWER_STATE';

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

// on AAA page
export const fetchAstronomerQuestions = ({
  answerState = null,
  appendToList = false,
  lang,
  currentPage,
  objectId,
  ver,
  customerUUID,
}) => (dispatch, getState) => {
  const { cid, at, token } = getState().user;
  const { count, questionFilter, page } = getState().astronomerQuestions;
  dispatch(fetchAstronomerQuestionsStart({ appendToList }));
  return axios
    .post('/api/forum/getQuestionsList', {
      appendToList,
      at,
      callSource: 'qanda',
      cid,
      count,
      lang,
      page: currentPage || page,
      token,
      ver,
      objectId,
      answerState: answerState || questionFilter,
      customerUUID,
      questionListType: 'list-page',
    })
    .then(result => {
      return dispatch(
        fetchAstronomerQuestionsSuccess(
          Object.assign(
            {
              page: currentPage || page,
              appendToList,
              answerState: answerState || questionFilter,
            },
            result.data
          )
        )
      );
    })
    .catch(error => dispatch(fetchAstronomerQuestionsFail(error)));
};

// on AAA page
export const refetchAstronomerQuestions = ({
  answerState = null,
  appendToList = false,
  lang,
  currentPage,
  objectId,
  ver,
  threadId,
}) => (dispatch, getState) => {
  const { cid, at, token } = getState().user;
  const { count, questionFilter, page } = getState().astronomerQuestions;
  dispatch({
    type: REFETCH_ASTRONOMER_QUESTIONS_START,
  });
  return axios
    .post('/api/forum/getQuestionsList', {
      at,
      callSource: 'qanda',
      cid,
      count,
      lang,
      page: currentPage || page,
      token,
      ver,
      objectId,
      threadId,
      answerState: answerState || questionFilter,
      questionPageType: 'question-page',
    })
    .then(result => {
      if (result.data.threads.length > 0) {
        result.data.threads.map(thread =>
          dispatch(fetchAstronomerAnswers({ threadId: thread.threadId }))
        );
      }

      return dispatch(
        fetchAstronomerQuestionsSuccess(
          Object.assign(
            {
              page: currentPage || page,
              answerState: answerState || questionFilter,
            },
            result.data
          )
        )
      );
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

export const changeAnswerState = payload => ({
  type: CHANGE_ANSWER_STATE,
  payload,
});
