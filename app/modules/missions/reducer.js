import { actions, constants } from 'ducks-helpers';
import { handleActions } from 'redux-actions';

export const TYPE = constants('profile', [
  '~GET_MISSIONS',
  '~GET_MISSION_SLOT',

  // bySlooh1000 page
  '~GET_BY_SLOOH_1000',
  '~GET_CATEGORY_LIST',
  'SET_CATEGORY',
  '~GET_OBJECT_LIST',
  'SET_OBJECT',

  // byTelescope page
  '~GET_OBSERVATORY_LIST',
]);
export const ACTION = actions(TYPE);

export const initialState = {
  isFetching: false,
  isLoaded: false,
  serverError: null,

  pageSetup: {
    navigationConfig: [],
  },

  bySlooh1000: {
    bySlooh1000Data: {},
    categoryList: {},
    selectedCategorySlug: null,
    objectList: [],
    selectedObjectSlug: null,
  },

  byTelescope: {
    telescopeList: {},
  },
};

export default handleActions(
  {
    [TYPE.GET_MISSIONS]: setFetching,
    [TYPE.GET_MISSIONS_SUCCESS]: getMissionsSuccess,
    [TYPE.GET_MISSIONS_ERROR]: setServerError,
    [TYPE.GET_MISSION_SLOT]: setFetching,
    [TYPE.GET_MISSION_SLOT_SUCCESS]: getMissionSlotSuccess,
    [TYPE.GET_MISSION_SLOT_ERROR]: setServerError,

    // bySlooh1000 page
    [TYPE.GET_BY_SLOOH_1000]: setFetching,
    [TYPE.GET_BY_SLOOH_1000_SUCCESS]: getBySlooh1000Success,
    [TYPE.GET_BY_SLOOH_1000_ERROR]: setServerError,
    [TYPE.GET_CATEGORY_LIST]: setFetching,
    [TYPE.GET_CATEGORY_LIST_SUCCESS]: getCategoryListSuccess,
    [TYPE.GET_CATEGORY_LIST_ERROR]: setServerError,
    [TYPE.SET_CATEGORY]: setCategory,
    [TYPE.GET_OBJECT_LIST]: setFetching,
    [TYPE.GET_OBJECT_LIST_SUCCESS]: getObjectListSuccess,
    [TYPE.GET_OBJECT_LIST_ERROR]: setServerError,
    [TYPE.SET_OBJECT]: setObject,

    // byTelescope page
    [TYPE.GET_OBSERVATORY_LIST]: setFetching,
    [TYPE.GET_OBSERVATORY_LIST_SUCCESS]: getObservatoryListSuccess,
    [TYPE.GET_OBSERVATORY_LIST_ERROR]: setServerError,
  },
  initialState
);

function setFetching(state) {
  return { ...state, isFetching: true, isLoaded: false };
}

function setServerError(state, action) {
  return {
    ...state,
    isFetching: false,
    serverError: action.payload,
    isLoaded: false,
  };
}

function getMissionsSuccess(state, action) {
  return {
    ...state,
    isFetching: false,
    isLoaded: true,
    pageSetup: action.payload,
  };
}

function getMissionSlotSuccess(state, action) {
  console.log(action.payload);
  return {
    ...state,
    isFetching: false,
    isLoaded: true,
    //pageSetup: action.payload,
  };
}

function getBySlooh1000Success(state, action) {
  return {
    ...state,
    isFetching: false,
    isLoaded: true,
    bySlooh1000: { ...state.bySlooh1000, bySlooh1000Data: action.payload },
  };
}

function getCategoryListSuccess(state, action) {
  return {
    ...state,
    isFetching: false,
    isLoaded: true,
    bySlooh1000: { ...state.bySlooh1000, categoryList: action.payload },
  };
}

function setCategory(state, action) {
  return {
    ...state,
    bySlooh1000: {
      ...state.bySlooh1000,
      selectedCategorySlug: action.payload,
      objectList: [],
    },
  };
}

function getObjectListSuccess(state, action) {
  return {
    ...state,
    isFetching: false,
    isLoaded: true,
    bySlooh1000: {
      ...state.bySlooh1000,
      objectList: action.payload.categoryList[0].categoryTopicList,
    },
  };
}

function setObject(state, action) {
  return {
    ...state,
    bySlooh1000: { ...state.bySlooh1000, selectedObjectSlug: action.payload },
  };
}

function getTelescopeListByObservatory(observatoryList) {
  return observatoryList.reduce((telescopeList, observatory) => {
    return [
      ...telescopeList,
      ...observatory.obsTelescopes.map(telescope => {
        return { ...telescope, obsId: observatory.obsId };
      }),
    ];
  }, []);
}

function getObservatoryListSuccess(state, action) {
  return {
    ...state,
    isFetching: false,
    isLoaded: true,
    byTelescope: {
      ...state.byTelescope,
      telescopeList: getTelescopeListByObservatory(
        action.payload.observatoryList
      ),
    },
  };
}
