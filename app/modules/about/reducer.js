import { actions, constants } from 'ducks-helpers';
import { handleActions } from 'redux-actions';

export const TYPE = constants('about', [
  '~GET_ABOUT_DATA',
  '~GET_SECTION_DATA',
  '~GET_SUB_SECTION_DATA',
]);

export const ACTION = actions(TYPE);

const initialState = {
  isFetching: false,
  aboutData: {},
  sectionData: {},
  subSectionData: {},
  serverError: null,
};

export default handleActions(
  {
    [TYPE.GET_ABOUT_DATA]: start,
    [TYPE.GET_ABOUT_DATA_SUCCESS]: getAboutDataSuccess,
    [TYPE.GET_ABOUT_DATA_ERROR]: error,

    [TYPE.GET_SECTION_DATA]: start,
    [TYPE.GET_SECTION_DATA_SUCCESS]: getSectionDataSuccess,
    [TYPE.GET_SECTION_DATA_ERROR]: error,

    [TYPE.GET_SUB_SECTION_DATA]: start,
    [TYPE.GET_SUB_SECTION_DATA_SUCCESS]: getSubSectionDataSuccess,
    [TYPE.GET_SUB_SECTION_DATA_ERROR]: error,
  },
  initialState
);

function start(state) {
  return {
    ...state,
    isFetching: true,
  };
}

function error(state, { payload }) {
  return {
    ...state,
    isFetching: false,
    serverError: payload,
  };
}

function getAboutDataSuccess(state, { payload }) {
  return {
    ...state,
    isFetching: false,
    aboutData: payload,
  };
}

function getSectionDataSuccess(state, { payload }) {
  return {
    ...state,
    isFetching: false,
    sectionData: payload,
  };
}

function getSubSectionDataSuccess(state, { payload }) {
  return {
    ...state,
    isFetching: false,
    subSectionData: payload,
  };
}
