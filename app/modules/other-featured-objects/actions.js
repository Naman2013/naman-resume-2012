import { getFeaturedContent } from '../../services/featured-content/get-featured-content';

export const OTHER_FEATURED_OBJECTS_START = 'OTHER_FEATURED_OBJECTS_START';
export const OTHER_FEATURED_OBJECTS_SUCCESS = 'OTHER_FEATURED_OBJECTS_SUCCESS';
export const OTHER_FEATURED_OBJECTS_FAIL = 'OTHER_FEATURED_OBJECTS_FAIL';

const fetchOtherFeaturedObjectsStart = () => ({
  type: OTHER_FEATURED_OBJECTS_START,
});

const fetchOtherFeaturedObjectsSuccess = (payload) => ({
  type: OTHER_FEATURED_OBJECTS_SUCCESS,
  payload,
});

const fetchOtherFeaturedObjectsFail = (payload) => ({
  type: OTHER_FEATURED_OBJECTS_FAIL,
  payload,
});

export const fetchOtherFeaturedObjects = ({
  featuredType = 'featuredObjects',
  slugLookupId,
  ignorePostId = 1,
}) => (dispatch, getState) => {
  const { cid } = getState().user;

  dispatch(fetchOtherFeaturedObjectsStart());
  return getFeaturedContent({
    cid,
    slugLookupId,
    featuredType,
    ignorePostId,
  })
    .then((result) => dispatch(fetchOtherFeaturedObjectsSuccess(result.data)))
    .catch(error => dispatch(fetchOtherFeaturedObjectsFail(error)));
};
