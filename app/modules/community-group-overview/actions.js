

import { API } from 'app/api';

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
export const FETCH_INVITE_POPUP_CONTENT_START =
  'FETCH_INVITE_POPUP_CONTENT_START';
export const FETCH_INVITE_POPUP_CONTENT_SUCCESS =
  'FETCH_INVITE_POPUP_CONTENT_SUCCESS';
export const FETCH_INVITE_POPUP_CONTENT_FAIL =
  'FETCH_INVITE_POPUP_CONTENT_FAIL';
export const FETCH_GOOGLE_CLASSROOM_STUDENTS_PANEL_START =
  'FETCH_GOOGLE_CLASSROOM_STUDENTS_PANEL_START';
export const FETCH_GOOGLE_CLASSROOM_STUDENTS_PANEL_SUCCESS =
  'FETCH_GOOGLE_CLASSROOM_STUDENTS_PANEL_SUCCESS';
export const FETCH_GOOGLE_CLASSROOM_STUDENTS_PANEL_FAIL =
  'FETCH_GOOGLE_CLASSROOM_STUDENTS_PANEL_FAIL';

export const ADD_EXISTING_USER_START = 'ADD_EXISTING_USER_START';
export const ADD_EXISTING_USER_SUCCESS = 'ADD_EXISTING_USER_SUCCESS';
export const ADD_EXISTING_USER_FAIL = 'ADD_EXISTING_USER_FAIL';

export const ADD_GOOGLE_USER_START = 'ADD_GOOGLE_USER_START';
export const ADD_GOOGLE_USER_SUCCESS = 'ADD_GOOGLE_USER_SUCCESS';
export const ADD_GOOGLE_USER_FAIL = 'ADD_GOOGLE_USER_FAIL';

export const FETCH_RESTORE_START = 'FETCH_RESTORE_START';
export const FETCH_RESTORE_SUCCESS = 'FETCH_RESTORE_SUCCESS';
export const FETCH_RESTORE_FAIL = 'FETCH_RESTORE_FAIL';



export const FETCH_ARCHIVE_START = 'FETCH_ARCHIVE_START';
export const FETCH_ARCHIVE_SUCCESS = 'FETCH_ARCHIVE_SUCCESS';
export const FETCH_ARCHIVE_FAIL = 'FETCH_ARCHIVE_FAIL';


export const SORT_AZ = 'atoz';
export const SORT_ZA = 'ztoa';
export const SORT_RANK = 'rank';
export const SORT_DATE = 'date';
export const RANK_ASC = 'rankASC';
export const RANK_DESC = 'rankDESC';



const fetchGoogleClassroomStudentsPanelStart = payload => ({
  type: FETCH_GOOGLE_CLASSROOM_STUDENTS_PANEL_START,
  payload,
});

const fetchGoogleClassroomStudentsPanelSuccess = payload => ({
  type: FETCH_GOOGLE_CLASSROOM_STUDENTS_PANEL_SUCCESS,
  payload,
});

const fetchGoogleClassroomStudentsPanelFail = payload => ({
  type: FETCH_GOOGLE_CLASSROOM_STUDENTS_PANEL_FAIL,
  payload,
});

export const fetchGoogleClassroomStudentsPanel = groupId => (
  dispatch,
  getState
) => {
  const { cid, at, token } = getState().user;
  dispatch(fetchGoogleClassroomStudentsPanelStart());
  return API.post('/api/classroom/google/importGoogleClassroomStudentsPanel', {
    at,
    cid,
    token,
    groupId,
  })
    .then(result =>
      dispatch(fetchGoogleClassroomStudentsPanelSuccess(result.data))
    )
    .catch(error => dispatch(fetchGoogleClassroomStudentsPanelFail(error)));
};

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

/* export const fetchGroupInvitationPanel = groupId => (dispatch, getState) => {
  const { cid, at, token } = getState().user;
  dispatch(fetchGroupInvitationPanelStart());
  return API.post('/api/classroom/getGroupInvitationPanel', {
    at,
    cid,
    token,
    groupId,
  })
    .then(result => dispatch(fetchGroupInvitationPanelSuccess(result.data)))
    .catch(error => dispatch(fetchGroupInvitationPanelFail(error)));
}; */



export const fetchGroupInvitationPanel = ({
  sortBy,
  customerStatus,
  lang,
  page,
  ver,
  discussionGroupId,
  groupId = discussionGroupId,
  searchTerms,
  callSource = 'clubLeaders',
}) => (dispatch, getState) => {
  const { cid, at, token } = getState().user;
  dispatch(fetchGroupInvitationPanelStart());
  return API.post('/api/classroom/getGroupInvitationPanel', {
    at,
    cid,
    groupId,
    sortBy,
    discussionGroupId,
    customerStatus,
    searchTerms,
    lang,
    page,
    token,
    ver,
    callSource,
  })
    .then(result => dispatch(fetchGroupInvitationPanelSuccess(result.data)))
    .catch(error => dispatch(fetchGroupInvitationPanelFail(error)));
};


export const fetchArchiveMember = ({ customerUUID }) => (dispatch, getState) => {
  const { cid, at, token } = getState().user;
  dispatch(fetchArchiveStart());
  return API.post('/api/classroom/archiveClubMember', {
    cid,
    token,
    at,
    customerUUID
  })
    .then(result => dispatch(fetchArchiveSuccess(result.data)))
    .catch(error => dispatch(fetchArchiveFail(error)))

}



const fetchArchiveStart = payload => ({
  type: FETCH_ARCHIVE_START,
  payload,
});

const fetchArchiveSuccess = payload => ({
  type: FETCH_ARCHIVE_SUCCESS,
  payload,
});

const fetchArchiveFail = payload => ({
  type: FETCH_ARCHIVE_FAIL,
  payload,
});


export const fetechRestoreMember = ({
  emailaddress
}) => (dispatch, getState) => {
  const { cid, at, token } = getState().user;
  
  dispatch(fetchRestorStart());
  return API.post('/api/classroom/restoreMember', {
    cid,
    token,
    at,
    emailaddress
  })
    .then(result => dispatch(fetchRestorSuccess(result.data)))
    .catch(error => dispatch(fetchRestorFail(error)))
}



const fetchRestorStart = payload => ({
  type: FETCH_RESTORE_START,
  payload,
});

const fetchRestorSuccess = payload => ({
  type: FETCH_RESTORE_SUCCESS,
  payload,
});

const fetchRestorFail = payload => ({
  type: FETCH_RESTORE_FAIL,
  payload,
});









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
  return API.post('/api/discussiongroups/getGroupInformation', {
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
  sortBy,
  customerStatus,
  lang,
  page,
  ver,
  discussionGroupId = '',
  callSource = 'clubLeaders',
}) => (dispatch, getState) => {
  const { cid, at, token } = getState().user;
  dispatch(fetchGroupMembersStart());
  return API.post('/api/discussiongroups/getGroupMembers', {
    at,
    cid,
    discussionGroupId,
    sortBy,
    customerStatus,
    lang,
    page,
    token,
    ver,
    callSource,
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
  return API.post('/api/page/discussionGroupPage', {
    at,
    cid,
    lang,
    token,
    ver,
    discussionGroupId,
  })
    .then(result => {
      const membersSort = 'rankDESC';//getState().communityGroupOverview;
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
  return API.post('/api/classroom/setGroupDescription', {
    at,
    cid,
    token,
    groupId,
    groupDescription,
  })
    .then(result => dispatch(groupDescriptionChangeSuccess(groupDescription)))
    .catch(error => dispatch(groupDescriptionChangeFail(error)));
};

const fetchInvitePopupContentStart = () => ({
  type: FETCH_INVITE_POPUP_CONTENT_START,
});

const fetchInvitePopupContentSuccess = payload => ({
  type: FETCH_INVITE_POPUP_CONTENT_SUCCESS,
  payload,
});

const fetchInvitePopupContentFail = payload => ({
  type: FETCH_INVITE_POPUP_CONTENT_FAIL,
  payload,
});

export const fetchInvitePopupContent = groupId => (dispatch, getState) => {
  const { cid, at, token } = getState().user;
  dispatch(fetchInvitePopupContentStart());
  return API.post('/api/classroom/getGroupInvitationPanel', {
    at,
    cid,
    token,
    groupId,
  })
    .then(res => dispatch(fetchInvitePopupContentSuccess(res.data)))
    .catch(error => dispatch(fetchInvitePopupContentFail(error)));
};

const addExistingUserStart = () => ({
  type: ADD_EXISTING_USER_START,
});

const addExistingUserSuccess = payload => ({
  type: ADD_EXISTING_USER_SUCCESS,
  payload,
});

const addExistingUserFail = payload => ({
  type: ADD_EXISTING_USER_FAIL,
  payload,
});

export const addExistingUser = (user, groupId) => (dispatch, getState) => {
  const { cid, at, token } = getState().user;
  dispatch(addExistingUserStart());
  return API.post('/api/registration/createCustomerLinkInvitation', {
    cid,
    at,
    token,
    groupId,
    inviteeDetails: user,
  })
    .then(res => dispatch(addExistingUserSuccess(res.data)))
    .catch(error => dispatch(addExistingUserFail(error)));
};

const addGoogleUserStart = () => ({
  type: ADD_GOOGLE_USER_START,
});

const addGoogleUserSuccess = payload => ({
  type: ADD_GOOGLE_USER_SUCCESS,
  payload,
});

const addGoogleUserFail = payload => ({
  type: ADD_GOOGLE_USER_FAIL,
  payload,
});

export const addGoogleUser = (user, groupId) => (dispatch, getState) => {
  const { cid, at, token } = getState().user;
  dispatch(addGoogleUserStart());
  return API.post('/api/classroom/google/importGoogleClassroomStudent', {
    cid,
    at,
    token,
    groupId,
    studentAccountDetails: user,
  })
    .then(res => dispatch(addGoogleUserSuccess(res.data)))
    .catch(error => dispatch(addGoogleUserFail(error)));
};
