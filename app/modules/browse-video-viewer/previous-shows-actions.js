import axios from 'axios';
import { previousShows } from '../../services/shows/previous-shows';


export const FETCH_PREVIOUS_SHOWS_START = 'FETCH_PREVIOUS_SHOWS_START';
export const FETCH_PREVIOUS_SHOWS_SUCCESS = 'FETCH_PREVIOUS_SHOWS_SUCCESS';
export const FETCH_PREVIOUS_SHOWS_FAIL = 'FETCH_PREVIOUS_SHOWS_FAIL';

const fetchPreviousShowsStart = () => ({
  type: FETCH_PREVIOUS_SHOWS_START,
});

const fetchPreviousShowsSuccess = payload => ({
  type: FETCH_PREVIOUS_SHOWS_SUCCESS,
  payload,
});

const fetchPreviousShowsFail = payload => ({
  type: FETCH_PREVIOUS_SHOWS_FAIL,
  payload,
});

export const fetchPreviousShows = ({
  page,
}) => (dispatch, getState) => {
  const { count } = getState().videoViewerBrowser;
  dispatch(fetchPreviousShowsStart());

  return previousShows({
    count,
    page,
  })
    .then(result => dispatch(fetchPreviousShowsSuccess(Object.assign({ page }, result.data))))
    .catch(error => dispatch(fetchPreviousShowsFail(error)));
};
