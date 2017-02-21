import axios from 'axios';
import { fetchAppConfig } from '../app-config/actions';

export const MENU_SUBMENU_ACTIVATE = 'MENU_SUBMENU_ACTIVATE';
export const MENU_SUBMENU_DEACTIVATE = 'MENU_SUBMENU_DEACTIVATE';
export const MENU_LOAD_NAV = 'MENU_LOAD_NAV';
export const MENU_LOAD_NAV_START = 'MENU_LOAD_NAV_START';
export const MENU_LOAD_NAV_SUCCESS = 'MENU_LOAD_NAV_SUCCESS';
export const MENU_LOAD_NAV_FAILURE = 'MENU_LOAD_NAV_FAILURE';

export const fetchMenuList = ({ lang, ver }) => (dispatch, getState) => {
  dispatch(menuLoadStart());
  dispatch(fetchAppConfig({}));
  return axios.post('/api/app/getNavMenu', {
    data: {
      lang,
      ver,
    }
  })
    .then(result => dispatch(menuLoadSuccess(result.data)))
    .catch(error => dispatch(menuLoadFailure(error)));
};

const menuLoadStart = () => ({
  type: MENU_LOAD_NAV_START,
});

const menuLoadSuccess = payload => ({
  type: MENU_LOAD_NAV_SUCCESS,
  payload,
});

const menuLoadFailure = payload => ({
  type: MENU_LOAD_NAV_FAILURE,
  payload,
});

export const activateMenu = index => (dispatch) => {
  if(index === 0) {
    dispatch(deactivateMenu());
  } else {
    dispatch({
      type: MENU_SUBMENU_ACTIVATE,
      index,
    });
  }
};

export const deactivateMenu = (index) => (dispatch) => {
  dispatch({
    type: MENU_SUBMENU_DEACTIVATE,
    index,
  });
};
