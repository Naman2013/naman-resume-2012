import axios from 'axios';

export const FETCH_HIGHLIGHTS_SHOWS_START = 'FETCH_HIGHLIGHTS_SHOWS_START';
export const FETCH_HIGHLIGHTS_SHOWS_SUCCESS = 'FETCH_HIGHLIGHTS_SHOWS_SUCCESS';
export const FETCH_HIGHLIGHTS_SHOWS_FAIL = 'FETCH_HIGHLIGHTS_SHOWS_FAIL';

const fetchHighlightsShowsStart = () => ({
  type: FETCH_HIGHLIGHTS_SHOWS_START,
});

const fetchHighlightsShowsSuccess = payload => ({
  type: FETCH_HIGHLIGHTS_SHOWS_SUCCESS,
  payload,
});

const fetchHighlightsShowsFail = payload => ({
  type: FETCH_HIGHLIGHTS_SHOWS_FAIL,
  payload,
});

export const fetchHighlightsShows = ({
  page,
}) => (dispatch, getState) => {
  const { count } = getState().videoViewerBrowser;
  dispatch(fetchHighlightsShowsStart());

  return axios.get(' /api/events/highlighted', {
    params: {
      count,
      page,
    },
  })
    .then(result => dispatch(fetchHighlightsShowsSuccess(Object.assign({ page }, result.data))))
    .catch(error => dispatch(fetchHighlightsShowsFail(error)));
};
