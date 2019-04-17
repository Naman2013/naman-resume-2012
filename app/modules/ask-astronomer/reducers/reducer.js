import { actions, constants } from 'ducks-helpers';
import { handleActions } from 'redux-actions';

export const TYPE = constants('askAstronomer', [
  '~GET_ALL_QUESTIONS',
  '~GET_PAGE_DATA',
]);
export const ACTION = actions(TYPE);

export const initialState = {
  isFetching: false,
  serverError: null,

  questionsData: {
    canAnswerQuestions: false,
    canReplyToAnswers: false,
    threadCount: 5,
    threads: [],
  },
  pageData: {},
};

export default handleActions(
  {
    [TYPE.GET_ALL_QUESTIONS]: setFetching,
    [TYPE.GET_ALL_QUESTIONS_SUCCESS]: getAllQuestionsSuccess,
    [TYPE.GET_ALL_QUESTIONS_ERROR]: setServerError,

    [TYPE.GET_PAGE_DATA]: setFetching,
    [TYPE.GET_PAGE_DATA_SUCCESS]: getPageDataSuccess,
    [TYPE.GET_PAGE_DATA_ERROR]: setServerError,
  },
  initialState
);

function setFetching(state) {
  return { ...state, isFetching: true };
}

function setServerError(state, action) {
  return {
    ...state,
    isFetching: false,
    serverError: action.payload,
  };
}

function getAllQuestionsSuccess(state, action) {
  return {
    ...state,
    isFetching: false,
    questionsData: action.payload,
  };
}

function getPageDataSuccess(state, action) {
  return {
    ...state,
    isFetching: false,
    pageData: action.payload,
  };
}
