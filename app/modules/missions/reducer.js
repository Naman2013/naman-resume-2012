import { actions, constants } from 'ducks-helpers';
import { handleActions } from 'redux-actions';

export const TYPE = constants('profile', [
  '~GET_MISSIONS',
  '~GET_MISSION_SLOT',
  'RESET_MISSIONS_DATA',
  '~RESERVE_MISSION_SLOT',

  // bySlooh1000 page
  '~GET_BY_SLOOH_1000',
  '~GET_CATEGORY_LIST',
  'SET_CATEGORY',
  '~GET_OBJECT_LIST',
  'SET_OBJECT',
  'SET_PROCESSING_RECIPE',

  // byCatalog page
  '~GET_CATALOG_LIST',
  'SET_CATALOG',
  'SET_DESIGNATION',
  '~CHECK_CATALOG_VISIBILITY',
  '~GET_PRESET_OPTIONS',

  // byTelescope page
  '~GET_OBSERVATORY_LIST',
]);
export const ACTION = actions(TYPE);

export const initialState = {
  isFetching: false,
  isTelescopeFetching: false,
  isLoaded: false,
  serverError: null,

  pageSetup: {
    navigationConfig: [],
  },

  missions: {
    missionList: [],
    reservedMissionList: [],
  },

  bySlooh1000: {
    bySlooh1000Data: {},
    categoryList: {},
    selectedCategorySlug: null,
    objectList: [],
    selectedObjectId: null,
  },

  byCatalog: {
    catalogList: [],
    selectedCatalog: null,
    designation: '',
    objectData: {},
    telescopeData: {},
    processingRecipe: {},
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
    [TYPE.GET_MISSION_SLOT]: setTelescopeFetching,
    [TYPE.GET_MISSION_SLOT_SUCCESS]: getMissionSlotSuccess,
    [TYPE.GET_MISSION_SLOT_ERROR]: setServerError,
    [TYPE.RESET_MISSIONS_DATA]: resetMissionsData,
    [TYPE.RESERVE_MISSION_SLOT]: setFetching,
    [TYPE.RESERVE_MISSION_SLOT_SUCCESS]: reserveMissionSlotSuccess,
    [TYPE.RESERVE_MISSION_SLOT_ERROR]: setServerError,

    // bySlooh1000 page
    [TYPE.GET_BY_SLOOH_1000]: setFetching,
    [TYPE.GET_BY_SLOOH_1000_SUCCESS]: getBySlooh1000Success,
    [TYPE.GET_BY_SLOOH_1000_ERROR]: setServerError,
    [TYPE.GET_CATEGORY_LIST]: setFetching,
    [TYPE.GET_CATEGORY_LIST_SUCCESS]: getCategoryListSuccess,
    [TYPE.GET_CATEGORY_LIST_ERROR]: setServerError,
    [TYPE.SET_CATEGORY]: setCategory,
    [TYPE.GET_OBJECT_LIST]: setTelescopeFetching,
    [TYPE.GET_OBJECT_LIST_SUCCESS]: getObjectListSuccess,
    [TYPE.GET_OBJECT_LIST_ERROR]: setServerError,
    [TYPE.SET_OBJECT]: setObject,

    // byCatalog page
    [TYPE.GET_CATALOG_LIST]: setFetching,
    [TYPE.GET_CATALOG_LIST_SUCCESS]: getCatalogListSuccess,
    [TYPE.GET_CATALOG_LIST_ERROR]: setServerError,
    [TYPE.SET_CATALOG]: setCatalog,
    [TYPE.SET_DESIGNATION]: setDesignation,
    [TYPE.CHECK_CATALOG_VISIBILITY]: setTelescopeFetching,
    [TYPE.CHECK_CATALOG_VISIBILITY_SUCCESS]: checkCatalogVisibilitySuccess,
    [TYPE.CHECK_CATALOG_VISIBILITY_ERROR]: setServerError,
    [TYPE.GET_PRESET_OPTIONS]: setTelescopeFetching,
    [TYPE.GET_PRESET_OPTIONS_SUCCESS]: getPresetOptionsSuccess,
    [TYPE.GET_PRESET_OPTIONS_ERROR]: setServerError,
    [TYPE.SET_PROCESSING_RECIPE]: setProcessingRecipe,

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

function setTelescopeFetching(state) {
  return { ...state, isTelescopeFetching: true, isLoaded: false };
}

function setServerError(state, action) {
  return {
    ...state,
    isFetching: false,
    isTelescopeFetching: false,
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
  return {
    ...state,
    isTelescopeFetching: false,
    isLoaded: true,
    missions: { ...state.missions, missionList: action.payload.missionList },
  };
}

function reserveMissionSlotSuccess(state, action) {
  return {
    ...state,
    isFetching: false,
    isLoaded: true,
    missions: {
      ...state.missions,
      reservedMissionList: action.payload.missionList,
    },
  };
}

function resetMissionsData(state) {
  return {
    ...state,
    missions: {
      missionList: [],
      reservedMissionList: [],
    },
    bySlooh1000: {
      ...state.bySlooh1000,
      selectedCategorySlug: null,
      objectList: [],
      selectedObjectId: null,
    },
    byCatalog: {
      ...state.byCatalog,
      selectedCatalog: null,
      designation: '',
      objectData: {},
      telescopeData: {},
      processingRecipe: {},
    },
  };
}

// bySlooh1000
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
      selectedObjectId: null,
    },
  };
}

function getObjectListSuccess(state, action) {
  return {
    ...state,
    isTelescopeFetching: false,
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
    bySlooh1000: { ...state.bySlooh1000, selectedObjectId: action.payload },
  };
}

// byCatalog
function getCatalogListSuccess(state, action) {
  return {
    ...state,
    isFetching: false,
    isLoaded: true,
    byCatalog: { ...state.byCatalog, catalogList: action.payload.catalogList },
  };
}

function setCatalog(state, action) {
  return {
    ...state,
    byCatalog: {
      ...state.byCatalog,
      selectedCatalog: action.payload,
      designation: '',
      objectData: {},
      telescopeData: {},
      processingRecipe: {},
    },
  };
}

function setDesignation(state, action) {
  return {
    ...state,
    byCatalog: {
      ...state.byCatalog,
      designation: action.payload,
    },
  };
}

function checkCatalogVisibilitySuccess(state, action) {
  return {
    ...state,
    isTelescopeFetching: false,
    isLoaded: true,
    byCatalog: { ...state.byCatalog, objectData: action.payload },
  };
}

function getPresetOptionsSuccess(state, action) {
  return {
    ...state,
    isTelescopeFetching: false,
    isLoaded: true,
    byCatalog: {
      ...state.byCatalog,
      telescopeData: action.payload.telescopeList[0],
    },
  };
}

function setProcessingRecipe(state, action) {
  return {
    ...state,
    byCatalog: {
      ...state.byCatalog,
      processingRecipe: action.payload,
    },
  };
}

// byTelescope
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
