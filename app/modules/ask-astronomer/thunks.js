import { getPageDataApi } from 'app/modules/ask-astronomer/api';
import axios from 'axios';
import { ACTION } from './reducers/reducer';

export const getAllQuestions = ({
  answerState = null,
  appendToList = false,
  lang,
  currentPage,
  objectId,
  ver,
}) => (dispatch, getState) => {
  const { cid, at, token } = getState().user;
  const { count, questionFilter, page } = getState().astronomerQuestions; // todo
  dispatch(ACTION.getAllQuestions());
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
      answerState: answerState || questionFilter,
    })
    .then(result => dispatch(ACTION.getAllQuestionsSuccess(result.data)))
    .catch(error => dispatch(ACTION.getAllQuestionsError(error)));
};

export const getPageData = objectId => (dispatch, getState) => {
  dispatch(ACTION.getPageData());
  return getPageDataApi({ objectId })
    .then(result => dispatch(ACTION.getPageDataSuccess(result.data)))
    .catch(error => dispatch(ACTION.getPageDataError(error)));
};
