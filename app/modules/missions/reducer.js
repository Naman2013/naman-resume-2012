import { actions, constants } from 'ducks-helpers';
import { handleActions } from 'redux-actions';

export const TYPE = constants('profile', [
  '~GET_MISSIONS',
  '~GET_MISSION_SLOT',
  'RESET_MISSIONS_DATA',
  '~RESERVE_MISSION_SLOT',
  '~CANCEL_MISSION_SLOT',

  // bySlooh1000 page
  '~GET_BY_SLOOH_1000',
  '~GET_CATEGORY_LIST',
  'SET_CATEGORY',
  '~GET_OBJECT_LIST',
  'SET_OBJECT',
  'SET_PROCESSING_RECIPE',

  // byConstellation page
  '~GET_CONSTELLATION_LIST',
  'SET_CONSTELLATION',
  '~GET_CONSTELLATION_OBJECT_LIST',
  'SET_CONSTELLATION_OBJECT',

  // byCatalog page
  '~GET_CATALOG_LIST',
  'SET_CATALOG',
  'SET_DESIGNATION',
  '~CHECK_CATALOG_VISIBILITY',
  '~CHECK_TARGET_VISIBILITY',
  '~GET_PRESET_OPTIONS',

  // byTelescope page
  '~GET_OBSERVATORY_LIST',
  'SET_TELESCOPE',
  'SET_TELESCOPE_DATE',
  '~GET_MISSION_SLOT_DATES',
  '~GET_MISSION_SLOTS_BY_TELESCOPE',
  '~GET_TELESCOPE_SLOT',
  '~SET_SELECTED_SLOT',
  '~SET_COORDINATES_DATA',
  '~SET_TARGET_NAME',
  '~GET_COORDINATES_CATEGORY_LIST',
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
    reservedMission: {},
  },

  bySlooh1000: {
    bySlooh1000Data: {},
    categoryList: [],
    selectedCategorySlug: null,
    objectList: [],
    objectCount: null,
    objectListExpires: null,
    selectedObjectId: null,
    availableMissionsCount: null,
    missionType: null,
  },

  byConstellation: {
    constellationList: [],
    selectedConstellation: null,
    objectCount: null,
    objectList: [],
    objectListExpires: null,
    selectedObjectId: null,
    availableMissionsCount: null,
    missionType: null,
  },

  byCatalog: {
    catalogList: [],
    selectedCatalog: null,
    designation: '',
    objectData: {},
    telescopeData: {},
    processingRecipe: {},
    missionType: null,
  },

  byCoordinates: {
    coordinatesData: {
      ra_h: 0,
      ra_m: 0,
      ra_s: 0,
      ra: 0,
      dec_d: 90,
      dec_m: 0,
      dec_s: 0,
      dec: 0,
    },
    targetName: '',
    categoryList: [],
  },

  byTelescope: {
    telescopeList: [],
    selectedTelescope: {},
    selectedDate: {},
    dateList: [{}],
    missionList: [],
    missionListRefreshInterval: 0,
    grabedTelescopeSlot: {},
    selectedSlot: {},
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
    [TYPE.RESET_MISSIONS_DATA]: resetMissionsData,
    [TYPE.RESERVE_MISSION_SLOT]: setFetching,
    [TYPE.RESERVE_MISSION_SLOT_SUCCESS]: reserveMissionSlotSuccess,
    [TYPE.RESERVE_MISSION_SLOT_ERROR]: setServerError,
    [TYPE.CANCEL_MISSION_SLOT]: setFetching,
    [TYPE.CANCEL_MISSION_SLOT_SUCCESS]: resetMissionsData,
    [TYPE.CANCEL_MISSION_SLOT_ERROR]: setServerError,

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

    // byConstellation page
    [TYPE.GET_CONSTELLATION_LIST]: setFetching,
    [TYPE.GET_CONSTELLATION_LIST_SUCCESS]: getConstellationListSuccess,
    [TYPE.GET_CONSTELLATION_LIST_ERROR]: setServerError,
    [TYPE.SET_CONSTELLATION]: setConstellation,
    [TYPE.GET_CONSTELLATION_OBJECT_LIST]: setTelescopeFetching,
    [TYPE.GET_CONSTELLATION_OBJECT_LIST_SUCCESS]: getConstellationObjectListSuccess,
    [TYPE.GET_CONSTELLATION_OBJECT_LIST_ERROR]: setServerError,
    [TYPE.SET_CONSTELLATION_OBJECT]: setConstellationObject,

    // byCatalog page
    [TYPE.GET_CATALOG_LIST]: setFetching,
    [TYPE.GET_CATALOG_LIST_SUCCESS]: getCatalogListSuccess,
    [TYPE.GET_CATALOG_LIST_ERROR]: setServerError,
    [TYPE.SET_CATALOG]: setCatalog,
    [TYPE.SET_DESIGNATION]: setDesignation,
    [TYPE.CHECK_CATALOG_VISIBILITY]: checkCatalogVisibility,
    [TYPE.CHECK_CATALOG_VISIBILITY_SUCCESS]: checkCatalogVisibilitySuccess,
    [TYPE.CHECK_CATALOG_VISIBILITY_ERROR]: setServerError,
    [TYPE.CHECK_TARGET_VISIBILITY]: checkCatalogVisibility,
    [TYPE.CHECK_TARGET_VISIBILITY_SUCCESS]: checkCatalogVisibilitySuccess,
    [TYPE.CHECK_TARGET_VISIBILITY_ERROR]: setServerError,
    [TYPE.GET_PRESET_OPTIONS]: setTelescopeFetching,
    [TYPE.GET_PRESET_OPTIONS_SUCCESS]: getPresetOptionsSuccess,
    [TYPE.GET_PRESET_OPTIONS_ERROR]: setServerError,
    [TYPE.SET_PROCESSING_RECIPE]: setProcessingRecipe,

    // byTelescope page
    [TYPE.GET_OBSERVATORY_LIST]: setFetching,
    [TYPE.GET_OBSERVATORY_LIST_SUCCESS]: getObservatoryListSuccess,
    [TYPE.GET_OBSERVATORY_LIST_ERROR]: setServerError,
    [TYPE.SET_TELESCOPE]: setTelescope,
    [TYPE.SET_TELESCOPE_DATE]: setTelescopeDate,
    [TYPE.GET_MISSION_SLOT_DATES]: setFetching,
    [TYPE.GET_MISSION_SLOT_DATES_SUCCESS]: getMissionSlotDatesSuccess,
    [TYPE.GET_MISSION_SLOT_DATES_ERROR]: setServerError,
    [TYPE.GET_MISSION_SLOTS_BY_TELESCOPE]: setFetching,
    [TYPE.GET_MISSION_SLOTS_BY_TELESCOPE_SUCCESS]: getMissionSlotsByTelescopeSuccess,
    [TYPE.GET_MISSION_SLOTS_BY_TELESCOPE_ERROR]: setServerError,
    [TYPE.GET_TELESCOPE_SLOT]: setFetching,
    [TYPE.GET_TELESCOPE_SLOT_SUCCESS]: getTelescopeSlotSuccess,
    [TYPE.GET_TELESCOPE_SLOT_ERROR]: setServerError,
    [TYPE.SET_SELECTED_SLOT]: setSelectedSlot,
    [TYPE.SET_COORDINATES_DATA]: setCoordinatesData,
    [TYPE.SET_TARGET_NAME]: setTargetName,
    [TYPE.GET_COORDINATES_CATEGORY_LIST]: setFetching,
    [TYPE.GET_COORDINATES_CATEGORY_LIST_SUCCESS]: getCoordinatesCategoryListSuccess,
    [TYPE.GET_COORDINATES_CATEGORY_LIST_ERROR]: setServerError,
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
  const telescopeList = action.payload.teleButtonConfig;

  return {
    ...state,
    isFetching: false,
    isLoaded: true,
    pageSetup: action.payload,
    byTelescope: {
      ...state.byTelescope,
      telescopeList,
      selectedTelescope: telescopeList[0],
    },
  };
}

function getMissionSlotSuccess(state, action) {
  return {
    ...state,
    isFetching: false,
    isLoaded: true,
    missions: { ...state.missions, missionList: action.payload.missionList },
    bySlooh1000: {
      ...state.bySlooh1000,
      objectListExpires: null,
    },
    byConstellation: {
      ...state.byConstellation,
      objectListExpires: null,
    },
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
      reservedMission: action.payload,
    },
  };
}

function resetMissionsData(state) {
  return {
    ...state,
    isFetching: false,
    isLoaded: true,
    missions: {
      missionList: [],
      reservedMissionList: [],
    },
    bySlooh1000: {
      ...state.bySlooh1000,
      selectedCategorySlug: null,
      objectList: [],
      objectCount: null,
      objectListExpires: null,
      selectedObjectId: null,
      availableMissionsCount: null,
      missionType: null,
    },
    byConstellation: {
      ...state.byConstellation,
      selectedConstellation: null,
      objectCount: null,
      objectList: [],
      objectListExpires: null,
      selectedObjectId: null,
      availableMissionsCount: null,
      missionType: null,
    },
    byCatalog: {
      ...state.byCatalog,
      selectedCatalog: null,
      designation: '',
      objectData: {},
      telescopeData: {},
      processingRecipe: {},
      missionType: null,
    },
    byCoordinates: {
      coordinatesData: {
        ra_h: 0,
        ra_m: 0,
        ra_s: 0,
        ra: 0,
        dec_d: 90,
        dec_m: 0,
        dec_s: 0,
        dec: 0,
      },
      targetName: '',
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
    bySlooh1000: {
      ...state.bySlooh1000,
      categoryList: action.payload.itemList,
    },
  };
}

function setCategory(state, action) {
  return {
    ...state,
    bySlooh1000: {
      ...state.bySlooh1000,
      selectedCategorySlug: action.payload,
      objectCount: null,
      objectList: [],
      selectedObjectId: null,
      availableMissionsCount: null,
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
      objectList: action.payload.objectList,
      objectCount: action.payload.objectCount,
      objectListExpires: action.payload.expires,
      availableMissionsCount: action.payload.availableMissionsCount,
      missionType: action.payload.missionType,
    },
  };
}

function setObject(state, action) {
  return {
    ...state,
    bySlooh1000: { ...state.bySlooh1000, selectedObjectId: action.payload },
  };
}

// byConstellation
function getConstellationListSuccess(state, action) {
  return {
    ...state,
    isFetching: false,
    isLoaded: true,
    byConstellation: {
      ...state.byConstellation,
      constellationList: action.payload.constellationList,
    },
  };
}

function setConstellation(state, action) {
  return {
    ...state,
    byConstellation: {
      ...state.byConstellation,
      selectedConstellation: action.payload,
      objectCount: null,
      objectList: [],
      selectedObjectId: null,
      availableMissionsCount: null,
    },
  };
}

function getConstellationObjectListSuccess(state, action) {
  return {
    ...state,
    isTelescopeFetching: false,
    isLoaded: true,
    byConstellation: {
      ...state.byConstellation,
      availableMissionsCount: action.payload.availableMissionsCount,
      objectCount: action.payload.objectCount,
      objectList: action.payload.objectList,
      objectListExpires: action.payload.expires,
      missionType: action.payload.missionType,
    },
  };
}

function setConstellationObject(state, action) {
  return {
    ...state,
    byConstellation: {
      ...state.byConstellation,
      selectedObjectId: action.payload,
    },
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

function checkCatalogVisibility(state) {
  return {
    ...state,
    isTelescopeFetching: true,
    isLoaded: false,
    byCatalog: {
      ...state.byCatalog,
      objectData: {},
      telescopeData: {},
      processingRecipe: {},
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
  const telescopeList = getTelescopeListByObservatory(
    action.payload.observatoryList
  );
  return {
    ...state,
    isFetching: false,
    isLoaded: true,
    byTelescope: {
      ...state.byTelescope,
      telescopeList,
      selectedTelescope: telescopeList[0],
    },
  };
}

function setTelescope(state, action) {
  return {
    ...state,
    byTelescope: {
      ...state.byTelescope,
      selectedTelescope: action.payload,
    },
  };
}

function getMissionSlotDatesSuccess(state, action) {
  return {
    ...state,
    byTelescope: {
      ...state.byTelescope,
      dateList: action.payload.dateList,
    },
  };
}

function setTelescopeDate(state, action) {
  return {
    ...state,
    byTelescope: {
      ...state.byTelescope,
      selectedDate: action.payload,
    },
  };
}

function getMissionSlotsByTelescopeSuccess(state, action) {
  return {
    ...state,
    isFetching: false,
    isLoaded: true,
    byTelescope: {
      ...state.byTelescope,
      missionListRefreshInterval: action.payload.refreshIntervalSec,
      missionList: action.payload.missionList,
    },
  };
}

function getTelescopeSlotSuccess(state, action) {
  return {
    ...state,
    isFetching: false,
    isLoaded: true,
    byTelescope: {
      ...state.byTelescope,
      grabedTelescopeSlot: action.payload.missionList[0],
    },
  };
}

function setSelectedSlot(state, action) {
  return {
    ...state,
    byTelescope: {
      ...state.byTelescope,
      selectedSlot: action.payload,
    },
  };
}

// by Coordinates

function getCoordinatesCategoryListSuccess(state, action) {
  return {
    ...state,
    isFetching: false,
    isLoaded: true,
    byCoordinates: {
      ...state.byCoordinates,
      categoryList: action.payload.itemList,
    },
  };
}

function setCoordinatesData(state, action) {
  return {
    ...state,
    byCoordinates: {
      ...state.byCoordinates,
      coordinatesData: action.payload,
    },
  };
}

function setTargetName(state, action) {
  return {
    ...state,
    byCoordinates: {
      ...state.byCoordinates,
      targetName: action.payload,
    },
  }
}
