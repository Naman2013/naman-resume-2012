import { API } from 'app/api';

export const FETCH_OBJECT_LIST_PAGE_META_START = 'FETCH_OBJECT_LIST_PAGE_META_START';
export const FETCH_OBJECT_LIST_PAGE_META_SUCCESS = 'FETCH_OBJECT_LIST_PAGE_META_SUCCESS';
export const FETCH_OBJECT_LIST_PAGE_META_FAIL = 'FETCH_OBJECT_LIST_PAGE_META_FAIL';

export const FETCH_OBJECT_ALL_TIME_BEST_START = 'FETCH_OBJECT_ALL_TIME_BEST_START';
export const FETCH_OBJECT_ALL_TIME_BEST_SUCCESS = 'FETCH_OBJECT_ALL_TIME_BEST_SUCCESS';
export const FETCH_OBJECT_ALL_TIME_BEST_FAIL = 'FETCH_OBJECT_ALL_TIME_BEST_FAIL';

export const FETCH_OBJECT_LATEST_CONTENT_START = 'FETCH_OBJECT_LATEST_CONTENT_START';
export const FETCH_OBJECT_LATEST_CONTENT_SUCCESS = 'FETCH_OBJECT_LATEST_CONTENT_SUCCESS';
export const FETCH_OBJECT_LATEST_CONTENT_FAIL = 'FETCH_OBJECT_LATEST_CONTENT_FAIL';

const fetchPageMetaStart = () => ({
  type: FETCH_OBJECT_LIST_PAGE_META_START,
});

const fetchPageMetaSuccess = payload => ({
  type: FETCH_OBJECT_LIST_PAGE_META_SUCCESS,
  payload,
});

const fetchPageMetaFail = payload => ({
  type: FETCH_OBJECT_LIST_PAGE_META_FAIL,
  payload,
});

export const fetchPageMeta = ({ slugLookupId }) => (dispatch) => {
  dispatch(fetchPageMetaStart());
  return API.post('/api/content/getObjectPostListPageLayout', {
    slugLookupId,
  })
  .then((result) => {
    dispatch(fetchPageMetaSuccess(result.data));
  })
  .catch(error => dispatch(fetchPageMetaFail(error)));
};

const fetchObjectAllTimeBestStart = () => ({
  type: FETCH_OBJECT_ALL_TIME_BEST_START,
});

const fetchObjectAllTimeBestSuccess = payload => ({
  type: FETCH_OBJECT_ALL_TIME_BEST_SUCCESS,
  payload,
});

const fetchObjectAllTimeBestFail = payload => ({
  type: FETCH_OBJECT_ALL_TIME_BEST_FAIL,
  payload,
});

export const fetchObjectAllTimeBest = ({
  lang,
  SlugLookupId,
  type,
  ver,
}) => (dispatch, getState) => {
  const { cid } = getState().user;
  dispatch(fetchObjectAllTimeBestStart());

  return API.post('/api/content/getAllTimeBest', {
    cid,
    lang,
    type,
    SlugLookupId,
    ver,
  })
  .then(result => dispatch(fetchObjectAllTimeBestSuccess(Object.assign(result.data, { type }))))
  .catch(error => dispatch(fetchObjectAllTimeBestFail(error)));
};

const fetchObjectLatestContentStart = () => ({
  type: FETCH_OBJECT_LATEST_CONTENT_START,
});

const fetchObjectLatestContentSuccess = payload => ({
  type: FETCH_OBJECT_LATEST_CONTENT_SUCCESS,
  payload,
});

const fetchObjectLatestContentFail = payload => ({
  type: FETCH_OBJECT_LATEST_CONTENT_FAIL,
  payload,
});

export const fetchObjectLatestContent = ({
  count = 10,
  lang,
  objectId,
  page = 1,
  slug,
  SlugLookupId,
  type,
  ver,
}) => (dispatch, getState) => {
  const { cid } = getState().user;
  dispatch(fetchObjectLatestContentStart());

  return API.post('/api/content/getLatestContent', {
    cid,
    count,
    lang,
    objectId,
    page,
    slug,
    slugLookupId: SlugLookupId,
    type,
    ver,
  })
  .then(result => dispatch(fetchObjectLatestContentSuccess(Object.assign({ count, page }, result.data))))
  .catch(error => dispatch(fetchObjectLatestContentFail(error)));
};

/**
  @param params: {
    entryType: determines which API source to use

    type: [type] |
    passes through to the API to set the type of posts we are interested in DIY for example

    SlugLookupId: example 6, the slug lookup ID of a specific object
  }
  */
export const fetchObjectPosts = params => (dispatch, getState) => {
  if (params.entryType === 'all-time-best') {
    dispatch(fetchObjectAllTimeBest(params));
  } else {
    dispatch(fetchObjectLatestContent(params));
  }
};
