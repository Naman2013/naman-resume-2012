import axios from 'axios';
import { fetchGroupActivity } from '../community-group-activity-list/actions';

export const FETCH_GROUP_OVERVIEW_START = 'FETCH_GROUP_OVERVIEW_START';
export const FETCH_GROUP_OVERVIEW_SUCCESS = 'FETCH_GROUP_OVERVIEW_SUCCESS';
export const FETCH_GROUP_OVERVIEW_FAIL = 'FETCH_GROUP_OVERVIEW_FAIL';
export const FETCH_GROUP_OVERVIEW_PAGE_META_START =
  'FETCH_GROUP_OVERVIEW_PAGE_META_START';
export const FETCH_GROUP_OVERVIEW_PAGE_META_SUCCESS =
  'FETCH_GROUP_OVERVIEW_PAGE_META_SUCCESS';
export const FETCH_GROUP_OVERVIEW_PAGE_META_FAIL =
  'FETCH_GROUP_OVERVIEW_PAGE_META_FAIL';
export const FETCH_GROUP_MEMBERS_START = 'FETCH_GROUP_MEMBERS_START';
export const FETCH_GROUP_MEMBERS_SUCCESS = 'FETCH_GROUP_MEMBERS_SUCCESS';
export const FETCH_GROUP_MEMBERS_FAIL = 'FETCH_GROUP_MEMBERS_FAIL';
export const GROUP_MEMBERS_CHANGE_SORT = 'GROUP_MEMBERS_CHANGE_SORT';
export const GROUP_DESCRIPTION_CHANGE_START = 'GROUP_DESCRIPTION_CHANGE_START';
export const GROUP_DESCRIPTION_CHANGE_SUCCESS =
  'GROUP_DESCRIPTION_CHANGE_SUCCESS';
export const GROUP_DESCRIPTION_CHANGE_FAIL = 'GROUP_DESCRIPTION_CHANGE_FAIL';
export const FETCH_GROUP_INVITATION_PANEL_START =
  'FETCH_GROUP_INVITATION_PANEL_START';
export const FETCH_GROUP_INVITATION_PANEL_SUCCESS =
  'FETCH_GROUP_INVITATION_PANEL_SUCCESS';
export const FETCH_GROUP_INVITATION_PANEL_FAIL =
  'FETCH_GROUP_INVITATION_PANEL_FAIL';

export const SORT_AZ = 'atoz';
export const SORT_ZA = 'ztoa';
export const SORT_RANK = 'rank';
export const SORT_DATE = 'date';

const fetchGroupInvitationPanelStart = payload => ({
  type: FETCH_GROUP_INVITATION_PANEL_START,
  payload,
});

const fetchGroupInvitationPanelSuccess = payload => ({
  type: FETCH_GROUP_INVITATION_PANEL_SUCCESS,
  payload,
});

const fetchGroupInvitationPanelFail = payload => ({
  type: FETCH_GROUP_INVITATION_PANEL_FAIL,
  payload,
});

export const fetchGroupInvitationPanel = groupId => (dispatch, getState) => {
  const { cid, at, token } = getState().user;
  dispatch(fetchGroupInvitationPanelStart());
  return axios
    .post('/api/classroom/getGroupInvitationPanel', {
      at,
      cid,
      token,
      groupId,
    })
    .then(result => dispatch(fetchGroupInvitationPanelSuccess(result.data)))
    .catch(error => dispatch(fetchGroupInvitationPanelFail(error)));
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
  return axios
    .post('/api/discussiongroups/getGroupInformation', {
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
const fetchGroupMembersStart = payload => ({
  type: FETCH_GROUP_MEMBERS_START,
  payload,
});

const fetchGroupMembersSuccess = payload => ({
  type: FETCH_GROUP_MEMBERS_SUCCESS,
  payload,
});

const fetchGroupMembersFail = payload => ({
  type: FETCH_GROUP_MEMBERS_FAIL,
  payload,
});

export const fetchGroupMembers = ({
  discussionGroupId,
  sortBy,
  lang,
  page,
  ver,
}) => (dispatch, getState) => {
  const { cid, at, token } = getState().user;
  dispatch(fetchGroupMembersStart());
  return axios
    .post('/api/discussiongroups/getGroupMembers', {
      at,
      cid,
      discussionGroupId,
      sortBy,
      lang,
      page,
      token,
      ver,
    })
    .then(result =>
      dispatch(fetchGroupMembersSuccess(Object.assign({ sortBy }, result.data)))
    )
    .catch(error => dispatch(fetchGroupMembersFail(error)));
};

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
  return axios
    .post('/api/page/discussionGroupPage', {
      at,
      cid,
      lang,
      token,
      ver,
      discussionGroupId,
    })
    .then(result => {
      const { membersSort } = getState().communityGroupOverview;
      const informationMap = {
        showGroupInformation: 'full',
        showGroupOverview: 'short',
      };
      dispatch(
        fetchGroupMembers({
          discussionGroupId,
          sortBy: membersSort,
        })
      );
      if (!result.data.apiError) {
        const display =
          (result.data.showGroupInformation &&
            informationMap.showGroupInformation) ||
          (result.data.showGroupOverview && informationMap.showGroupOverview);

        dispatch(
          fetchGroupOverview({
            discussionGroupId,
            informationView: display,
          })
        );
      }
      return dispatch(fetchGroupOverviewPageMetaSuccess(result.data));
    })
    .catch(error => dispatch(fetchGroupOverviewPageMetaFail(error)));
};

const groupDescriptionChangeStart = payload => ({
  type: GROUP_DESCRIPTION_CHANGE_START,
  payload,
});

const groupDescriptionChangeSuccess = payload => ({
  type: GROUP_DESCRIPTION_CHANGE_SUCCESS,
  payload,
});

const groupDescriptionChangeFail = payload => ({
  type: GROUP_DESCRIPTION_CHANGE_FAIL,
  payload,
});

export const changeGroupDescription = ({ groupId, groupDescription }) => (
  dispatch,
  getState
) => {
  const { cid, at, token } = getState().user;
  dispatch(groupDescriptionChangeStart);
  return axios
    .post('/api/classroom/setGroupDescription', {
      at,
      cid,
      token,
      groupId,
      groupDescription,
    })
    .then(result => dispatch(groupDescriptionChangeSuccess(groupDescription)))
    .catch(error => dispatch(groupDescriptionChangeFail(error)));
};
