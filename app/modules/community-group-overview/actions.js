import axios from 'axios';

export const FETCH_GROUP_OVERVIEW_START = 'FETCH_GROUP_OVERVIEW_START';
export const FETCH_GROUP_OVERVIEW_SUCCESS = 'FETCH_GROUP_OVERVIEW_SUCCESS';
export const FETCH_GROUP_OVERVIEW_FAIL = 'FETCH_GROUP_OVERVIEW_FAIL';
export const FETCH_GROUP_OVERVIEW_PAGE_META_START = 'FETCH_GROUP_OVERVIEW_PAGE_META_START';
export const FETCH_GROUP_OVERVIEW_PAGE_META_SUCCESS = 'FETCH_GROUP_OVERVIEW_PAGE_META_SUCCESS';
export const FETCH_GROUP_OVERVIEW_PAGE_META_FAIL = 'FETCH_GROUP_OVERVIEW_PAGE_META_FAIL';

const fetchGroupOverviewPageMetaStart = payload => ({
  type: FETCH_GROUP_OVERVIEW_PAGE_META_START,
  payload,
});

const fetchGroupOverviewPageMetaSuccess = payload => ({
  type: FETCH_GROUP_OVERVIEW_PAGE_META_SUCCESS,
  payload,
});

const fetchGroupOverviewPageMetaFail = payload => ({
  type: FETCH_GROUP_OVERVIEW_PAGE_META_FAIL,
  payload,
});

export const fetchGroupOverviewPageMeta = ({
  lang,
  ver,
  discussionGroupId,
}) => (dispatch, getState) => {
  const { cid, at, token } = getState().user;
  dispatch(fetchGroupOverviewPageMetaStart());
  return axios.post('/api/page/discussionGroupPage', {
    at,
    cid,
    lang,
    token,
    ver,
    discussionGroupId,
  })
  .then((result) => {
    const informationMap = {
      showGroupInformation: 'full',
      showGroupOverview: 'short',
    };

    if (!result.data.apiError) {
      const display = (result.data.showGroupInformation &&  informationMap.showGroupInformation) || (result.data.showGroupOverview && informationMap.showGroupOverview);
      dispatch(fetchGroupOverview({
        discussionGroupId,
        informationView: display
      }));
    }
    return dispatch(fetchGroupOverviewPageMetaSuccess(result.data));
  })
  .catch(error => dispatch(fetchGroupOverviewPageMetaFail(error)));
};

const fetchGroupOverviewStart = payload => ({
  type: FETCH_GROUP_OVERVIEW_START,
  payload,
});

const fetchGroupOverviewSuccess = payload => ({
  type: FETCH_GROUP_OVERVIEW_SUCCESS,
  payload,
});

const fetchGroupOverviewFail = payload => ({
  type: FETCH_GROUP_OVERVIEW_FAIL,
  payload,
});

export const fetchGroupOverview = ({
  discussionGroupId,
  informationView,
  lang,
  page,
  ver,
}) => (dispatch, getState) => {
  const { cid, at, token } = getState().user;
  dispatch(fetchGroupOverviewStart());
  return axios.post('/api/discussiongroups/getGroupInformation', {
    at,
    cid,
    discussionGroupId,
    lang,
    page,
    informationView,
    token,
    ver,
  })
  .then(result => dispatch(fetchGroupOverviewSuccess(result.data)))
  .catch(error => dispatch(fetchGroupOverviewFail(error)));
};
