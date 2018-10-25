import { getReplies } from '../../services/discussions/get-replies';
import { submitReply } from '../../services/discussions/submit-reply';

export const FETCH_ASTRONOMER_ANSWERS_START = 'FETCH_ASTRONOMER_ANSWERS_START';
export const FETCH_ASTRONOMER_ANSWERS_SUCCESS = 'FETCH_ASTRONOMER_ANSWERS_SUCCESS';
export const FETCH_ASTRONOMER_ANSWERS_FAIL = 'FETCH_ASTRONOMER_ANSWERS_FAIL';
export const UPDATE_TOGGLE_ASK_ASTRONOMER_ANSWER_DISPLAY_LIST = 'UPDATE_TOGGLE_ASK_ASTRONOMER_ANSWER_DISPLAY_LIST';
export const TOGGLE_ALL_ASK_ASTRONOMER_ANSWERS = 'TOGGLE_ALL_ASK_ASTRONOMER_ANSWERS';
export const SUBMIT_ANSWER_FOR_ASTRONOMER_QUESTION_START = 'SUBMIT_ANSWER_FOR_ASTRONOMER_QUESTION_START';
export const SUBMIT_ANSWER_FOR_ASTRONOMER_QUESTION_SUCCESS = 'SUBMIT_ANSWER_FOR_ASTRONOMER_QUESTION_SUCCESS';
export const SUBMIT_ANSWER_FOR_ASTRONOMER_QUESTION_FAIL = 'SUBMIT_ANSWER_FOR_ASTRONOMER_QUESTION_FAIL';

const fetchAstronomerAnswersStart = payload => ({
  type: FETCH_ASTRONOMER_ANSWERS_START,
  payload,
});

const fetchAstronomerAnswersSuccess = payload => ({
  type: FETCH_ASTRONOMER_ANSWERS_SUCCESS,
  payload,
});

const fetchAstronomerAnswersFail = payload => ({
  type: FETCH_ASTRONOMER_ANSWERS_SUCCESS,
  payload,
});

export const fetchAstronomerAnswers = ({
  at,
  cid,
  lang,
  token,
  threadId,
  ver,
}) => (dispatch, getState) => {
  const { cid, at, token } = getState().user;
  dispatch(fetchAstronomerAnswersStart({ threadId }));
  return getReplies({
    at,
    callSource: 'qanda',
    cid,
    count: -1,
    lang,
    token,
    threadId,
    replyTo: threadId,
    ver,
  })
  .then(result => dispatch(fetchAstronomerAnswersSuccess(Object.assign({ threadId }, result.data))))
  .catch(error => dispatch(fetchAstronomerAnswersFail(Object.assign({ threadId }, error))));
};

const toggleAllAnswers = payload => ({
    type: TOGGLE_ALL_ASK_ASTRONOMER_ANSWERS,
    payload,
});

export const toggleAllAnswersAndDisplay = payload => (dispatch, getState) => {
  const { threadId, showAllAnswers } = payload;
  const { allAnswers } = getState().astronomerAnswers;
  const threadsAnswers = allAnswers[threadId].replies;
  const displayedAnswers = showAllAnswers ?
    threadsAnswers
      .map(answer => answer.replyId) :
        (threadsAnswers.length > 0 ?
          [threadsAnswers[0].replyId] :
        []);

  dispatch(updateAnswersDisplayList({
    threadId,
    displayedAnswers,
  }));

  dispatch(toggleAllAnswers(payload));
};

export const updateAnswersDisplayList = payload => dispatch => (dispatch({
  type: UPDATE_TOGGLE_ASK_ASTRONOMER_ANSWER_DISPLAY_LIST,
  payload,
}));

const submitAnswerToQuestionStart = payload => ({
  type: SUBMIT_ANSWER_FOR_ASTRONOMER_QUESTION_START,
  payload,
});

const submitAnswerToQuestionSuccess = payload => ({
  type: SUBMIT_ANSWER_FOR_ASTRONOMER_QUESTION_SUCCESS,
  payload,
});

const submitAnswerToQuestionFail = payload => ({
  type: SUBMIT_ANSWER_FOR_ASTRONOMER_QUESTION_FAIL,
  payload,
});

export const submitAnswerToQuestion = ({
  content,
  forumId,
  lang,
  objectId,
  replyTo,
  S3URLs,
  status,
  threadId,
  title,
  topicId,
  ver,
}) => (dispatch, getState) => {
  const { cid, at, token } = getState().user;
  dispatch(submitAnswerToQuestionStart({ threadId }));

  return submitReply({
    at,
    callSource: 'qanda',
    cid,
    content,
    forumId,
    lang,
    objectId,
    replyTo,
    S3URLs,
    status,
    threadId,
    title,
    token,
    topicId,
    ver,
  })
    .then(result => dispatch(submitAnswerToQuestionSuccess(Object.assign({ threadId }, result.data))))
    .catch(error => dispatch(submitAnswerToQuestionFail(error)));
};
