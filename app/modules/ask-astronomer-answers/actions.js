import { getReplies } from '../../services/discussions/get-replies';

export const FETCH_ASTRONOMER_ANSWERS_START = 'FETCH_ASTRONOMER_ANSWERS_START';
export const FETCH_ASTRONOMER_ANSWERS_SUCCESS = 'FETCH_ASTRONOMER_ANSWERS_SUCCESS';
export const FETCH_ASTRONOMER_ANSWERS_FAIL = 'FETCH_ASTRONOMER_ANSWERS_FAIL';
export const UPDATE_TOGGLE_ASK_ASTRONOMER_ANSWER_DISPLAY_LIST = 'UPDATE_TOGGLE_ASK_ASTRONOMER_ANSWER_DISPLAY_LIST';
export const TOGGLE_ALL_ASK_ASTRONOMER_ANSWERS = 'TOGGLE_ALL_ASK_ASTRONOMER_ANSWERS';

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
  dispatch(fetchAstronomerAnswersStart());
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
  .catch(error => dispatch(fetchAstronomerAnswersFail(error)));
};

export const toggleAllAnswers = payload => dispatch => (dispatch({
  type: TOGGLE_ALL_ASK_ASTRONOMER_ANSWERS,
  payload,
}));

export const updateAnswersDisplayList = payload => dispatch => (dispatch({
  type: UPDATE_TOGGLE_ASK_ASTRONOMER_ANSWER_DISPLAY_LIST,
  payload,
}));
