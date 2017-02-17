import axios from 'axios';
import _ from 'lodash';

export const FETCH_FEATURED_START = 'FETCH_FEATURED_START';
export const FETCH_FEATURED_SUCCESS = 'FETCH_FEATURED_SUCCESS';
export const FETCH_FEATURED_FAIL = 'FETCH_FEATURED_FAIL';

const fetchFeaturedStart = () => ({
  type: FETCH_FEATURED_START,
});

const fetchFeaturedSuccess = (payload) => ({
  type: FETCH_FEATURED_SUCCESS,
  payload,
});

const fetchFeaturedFail = (payload) => ({
  type: FETCH_FEATURED_FAIL,
  payload,
});

export const fetchFeatured = ({
  featuredType = 'moreAbout',
  slugLookupId,
  ignorePostId = 1,
}) => (dispatch, getState) => {
  const { cid } = getState().user;

  dispatch(fetchFeaturedStart());

  return axios.post('/api/content/getFeaturedContent', {
    cid,
    slugLookupId,
    featuredType,
    ignorePostId,
  })
    .then((result) => {
      const itemList = _.sortBy(result.data.itemList, [item => (item.displayOrder)]);
      dispatch(fetchFeaturedSuccess(Object.assign({ itemList }, result.data)))
    })
    .catch(error => dispatch(fetchFeaturedFail(error)));
};
