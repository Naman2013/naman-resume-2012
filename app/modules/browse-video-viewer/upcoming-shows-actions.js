import axios from 'axios';

export const FETCH_UPCOMING_SHOWS_START = 'FETCH_UPCOMING_SHOWS_START';
export const FETCH_UPCOMING_SHOWS_SUCCESS = 'FETCH_UPCOMING_SHOWS_SUCCESS';
export const FETCH_UPCOMING_SHOWS_FAIL = 'FETCH_UPCOMING_SHOWS_FAIL';

const fetchUpcomingShowsStart = () => ({
  type: FETCH_UPCOMING_SHOWS_START,
});

const fetchUpcomingShowsSuccess = payload => ({
  type: FETCH_UPCOMING_SHOWS_SUCCESS,
  payload,
});

const fetchUpcomingShowsFail = payload => ({
  type: FETCH_UPCOMING_SHOWS_FAIL,
  payload,
});

export const fetchUpcomingShows = ({
  page,
}) => (dispatch, getState) => {
  const { count } = getState().videoViewerBrowser;
  dispatch(fetchUpcomingShowsStart());

  return axios.get(' /api/events/upcoming', {
    params: {
      count,
      page,
    },
  })
    .then(result => dispatch(fetchUpcomingShowsSuccess(Object.assign({ page }, result.data))))
    .catch(error => dispatch(fetchUpcomingShowsFail(error)));
};
