import { push } from 'react-router-redux';
import MENU_INTERFACE from 'app/components/GlobalNavigation/Menus/MenuInterface';
import {
  toggleGlobalNavMenu,
  openUpsellModal,
} from 'app/modules/global-navigation/actions';
import { fetchHandleErrors } from '../../services/authorization/handle-error';
import { getUserInfo, destroySession, removeUser } from '../User';
import SETTINGS from '../../config/config';

export const FETCH_ERRORS_START = 'FETCH_ERRORS_START';
export const FETCH_ERRORS_SUCCESS = 'FETCH_ERRORS_SUCCESS';

export const CAPTURE_ERROR_STATE = 'CAPTURE_ERROR_STATE';
export const RESET_ERROR_STATE = 'RESET_ERROR_STATE';

export const VALIDATE_RESPONSE = 'VALIDATE_RESPONSE';

// URL to return to when the user successfully signs in
export const SET_SIGN_IN_RETURN_URL = 'SET_SIGN_IN_RETURN_URL';

export const SHOW_ISSUE_WITH_USER_ACCOUNT_MODAL =
  'SHOW_ISSUE_WITH_USER_ACCOUNT_MODAL';
export const HIDE_ISSUE_WITH_USER_ACCOUNT_MODAL =
  'HIDE_ISSUE_WITH_USER_ACCOUNT_MODAL';

const setSignInReturnURL = signInReturnURL => ({
  type: SET_SIGN_IN_RETURN_URL,
  signInReturnURL,
});

const resetErrorState = () => ({
  type: RESET_ERROR_STATE,
});

const fetchErrorsStart = () => ({
  type: FETCH_ERRORS_START,
});

const fetchErrorsSuccess = payload => ({
  type: FETCH_ERRORS_SUCCESS,
  payload,
});

export const showIssueWithUserAccountModal = (payload, upsellCallSource, upsellReturnLinkLabel, upsellReturnLinkType, upsellReturnLinkUrl) => ({
  type: SHOW_ISSUE_WITH_USER_ACCOUNT_MODAL,
  payload,
  upsellCallSource,
  upsellReturnLinkLabel, 
  upsellReturnLinkType, 
  upsellReturnLinkUrl
});

export const hideIssueWithUserAccountModal = () => ({
  type: HIDE_ISSUE_WITH_USER_ACCOUNT_MODAL,
});

export const captureErrorState = ({
  apiError,
  errorCode,
  statusCode,
  currentPageID,
  loginError,
}) => ({
  type: CAPTURE_ERROR_STATE,
  apiError,
  errorCode,
  statusCode,
  currentPageID,
  loginError,
});

export const fetchErrors = () => (dispatch, getState) => {
  dispatch(fetchErrorsStart());
  const { cid, token, at } = getState().user;
  const { activeLeft } = getState().globalNavigation;
  const {
    apiError,
    errorCode,
    statusCode,
    signInReturnURL,
  } = getState().authorization;
  if (!apiError || !errorCode || !statusCode) {
    dispatch(push('/'));
  } else {
    return fetchHandleErrors({
      cidCheck: cid,
      atCheck: at,
      tokenCheck: token,
      apiErrorCheck: apiError,
      errorCodeCheck: errorCode,
      statusCodeCheck: statusCode,
      currentPageId: signInReturnURL.split('?')[0],
    }).then(result => {
      dispatch(fetchErrorsSuccess(result.data));

      const MEMBER_UPSELL = 'memberUpsell';
      const GOTO_HOMEPAGE = 'gotoHomePage';
      const LOGIN_UPSELL = 'loginUpsell';
      const GOTO_PAGE_ID = 'gotoPageId';
      const GOTO_URL = 'gotoURL';
      const GOTO_URL_NEW_TAB = 'gotoURLNewTab';
      const POPUP_MESSAGE = 'popupMessage';
      const IGNORE = 'ignore';

      const { responseType, responseURL } = result.data;

      if (responseType === MEMBER_UPSELL) {
        dispatch(push('/'));
        dispatch(openUpsellModal());
      }

      if (responseType === GOTO_HOMEPAGE) {
        dispatch(push('/'));
      }

      if (responseType === LOGIN_UPSELL) {
        destroySession();
        dispatch(removeUser());
        dispatch(push('/'));
        dispatch(
          toggleGlobalNavMenu({
            activeMenu: MENU_INTERFACE.PROFILE.name,
            isLeftOpen: false,
            isRightOpen: true,
            activeLeft,
            activeRight: MENU_INTERFACE.PROFILE.name,
            isNotificationMenuOpen: false,
          })
        );
      }

      if (responseType === GOTO_URL) {
        window.location.href = decodeURIComponent(responseURL);
      }

      // TODO: this may need to happen during other parts of resolution
      dispatch(resetErrorState());
    });
  }
};

export const validateResponseAccess = apiResponse => (dispatch, getState) => {
  const { handlingScenario } = getState().authorization;
  const user = getUserInfo();

  /*****************************************
   * POSSIBLE HTTP RESPONSE CODES....
   *	401 - Unauthorized, Login Issues
   *	402 - Credentials Required to verify account access
   *    418 - Expired
   *    421 - Expired Recently
   *	419 - Forced Slooh Crew
   *	420 - Upsell Flow
   *****************************************/

  const REDIRECT_CONFIRMATION_PATH = '/redirect-confirmation';
  const UNAUTHORIZED_STATUS_CODE = 401;
  const UNAUTHORIZED_CREDSREQD_STATUS_CODE = 402;
  const EXPIRED_ACCOUNT_STATUS_CODE = 418;
  const EXPIRED_RECENTLY_ACCOUNT_STATUS_CODE = 421;
  const FORCED_SLOOH_CREW_STATUS_CODE = 419;
  const UPSELL_STATUS_CODE = 420;

  const { apiError, errorCode, statusCode, loginError, upsellCallSource, upsellReturnLinkLabel, upsellReturnLinkType, upsellReturnLinkUrl } = apiResponse;
  let subscriptionPlansCallSource = '';
  let triggerUserAccountIssueModal = false;

  if (statusCode === UNAUTHORIZED_STATUS_CODE) {
    //session issues....send the user to the homepage, they likely tried accessing on a second device.
    triggerUserAccountIssueModal = false;

    destroySession();
    dispatch(removeUser());
    dispatch(push('/'));
    dispatch(window.location.reload());
  } else if (statusCode === UNAUTHORIZED_CREDSREQD_STATUS_CODE) {
    //paywall
    triggerUserAccountIssueModal = false;

    destroySession();
    dispatch(removeUser());
    dispatch(push('/join/step1'));
    dispatch(window.location.reload());
  } else if (statusCode === FORCED_SLOOH_CREW_STATUS_CODE) {
    subscriptionPlansCallSource = 'forcedsloohcrew';
    triggerUserAccountIssueModal = true;
  } else if (statusCode === UPSELL_STATUS_CODE) {
    subscriptionPlansCallSource = 'upsell';
    triggerUserAccountIssueModal = true;
  } else if (statusCode === EXPIRED_ACCOUNT_STATUS_CODE) {
    subscriptionPlansCallSource = 'expired';
    triggerUserAccountIssueModal = true;
  } else if (statusCode === EXPIRED_RECENTLY_ACCOUNT_STATUS_CODE) {
    subscriptionPlansCallSource = 'expiredrecently';
    triggerUserAccountIssueModal = true;
  }

  if (triggerUserAccountIssueModal == true) {
    if (SETTINGS.isHashHistory()) {
      dispatch(setSignInReturnURL(window.location.hash));
    } else {
      dispatch(setSignInReturnURL(window.location.pathname));
    }
    dispatch(
      captureErrorState({
        apiError,
        errorCode,
        statusCode,
        loginError,
      })
    );

    dispatch(showIssueWithUserAccountModal(subscriptionPlansCallSource, upsellCallSource, upsellReturnLinkLabel, upsellReturnLinkType, upsellReturnLinkUrl, user));
    return false;
  }

  return true;
};