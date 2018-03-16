import { getReplies } from '../../services/discussions/get-replies';

export const FETCH_ASTRONOMER_ANSWERS_START = 'FETCH_ASTRONOMER_ANSWERS_START';
export const FETCH_ASTRONOMER_ANSWERS_SUCCESS = 'FETCH_ASTRONOMER_ANSWERS_SUCCESS';
export const FETCH_ASTRONOMER_ANSWERS_FAIL = 'FETCH_ASTRONOMER_ANSWERS_FAIL';

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
