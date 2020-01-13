import { actions, constants } from 'ducks-helpers';
import { handleActions } from 'redux-actions';

export const TYPE = constants('about', [
  '~GET_ABOUT_DATA',
  '~GET_SECTION_DATA',
  '~GET_SUB_SECTION_DATA',
  'SET_ACTIVE_SUB_SECTION',
]);

export const ACTION = actions(TYPE);

const initialState = {
  isFetching: false,
  aboutData: {},
  aboutSloohSections: {},
  subSectionData: {},
  activeSubSections: null,
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

    [TYPE.SET_ACTIVE_SUB_SECTION]: setActiveSubSection,
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
  const { aboutSloohSections } = state;
  const { sectionTag } = payload;
  return {
    ...state,
    isFetching: false,
    aboutSloohSections: { ...aboutSloohSections, [sectionTag]: payload },
    activeSubSections: null,
  };
}

function getSubSectionDataSuccess(state, { payload }) {
  return {
    ...state,
    isFetching: false,
    subSectionData: payload,
  };
}

function setActiveSubSection(state, { payload }) {
  return {
    ...state,
    activeSubSections: payload,
  };
}
