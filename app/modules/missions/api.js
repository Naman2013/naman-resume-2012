import { API } from 'app/api';

export const getMissionsApi = data => API.post('/api/page/missions', data);
export const grabMissionSlotApi = data =>
  API.post('/api/reservation/grabMissionSlot', data);
export const reserveMissionSlotApi = data =>
  API.post('/api/reservation/reserveMissionSlot', data);
export const cancelMissionSlotApi = data =>
  API.post('/api/reservation/cancelMissionSlot', data);
export const getMissionListApi = data =>
  API.post('/api/reservation/getMissionList', data);
export const cancelReservationApi = data =>
  API.post('/api/reservation/cancelReservation', data);

// bySlooh1000 page
export const getBySlooh1000Api = data =>
  API.post('/api/missions/getBySlooh1000', data);
export const getCategoryListApi = data =>
  API.post('/api/reservation/getSlooh1000CategoryList', data);
export const getObjectListApi = data =>
  API.post('/api/reservation/getSlooh1000ObjectList', data);

// byConstellation
export const getConstellationListApi = data =>
  API.post('/api/reservation/getConstellationList', data);
export const getConstellationObjectListApi = data =>
  API.post('/api/reservation/getConstellationObjectList', data);

// byCatalog page
export const getByCatalogApi = data =>
  API.post('/api/missions/getByCatalog', data);
export const getCatalogListApi = data =>
  API.post('/api/reservation/getCatalogList', data);
export const checkCatalogVisibilityApi = data =>
  API.post('/api/reservation/checkCatalogVisibility', data);
export const getPresetOptionsApi = data =>
  API.post('/api/reservation/getPresetOptions', data);
export const checkTargetVisibilityApi = data =>
  API.post('/api/reservation/checkTargetVisibility', data);

// byTelescope page
export const getObservatoryListApi = data => API.post('/api/obs/list', data);
export const getMissionSlotDatesApi = data =>
  API.post('/api/reservation/getMissionSlotDates', data);
export const getMissionSlotsByTelescopeApi = data =>
  API.post('/api/reservation/getMissionSlotsByTelescope', data);
export const getTelescopeSlotApi = data =>
  API.post('/api/reservation/grabTelescopeSlot', data);
export const getCoordinatesCategoryListApi = data =>
  API.post('/api/reservation/getCoordinatesCategoryList', data);

// Pyggyback missions
export const grabPiggybackApi = data =>
  API.post('/api/reservation/grabPiggyback', data);
export const reservePiggybackApi = data =>
  API.post('/api/reservation/reservePiggyback ', data);
export const cancelPiggybackApi = data =>
  API.post('/api/reservation/cancelPiggyback', data);

// Edit coordinates
export const getMissionSlotApi = data =>
  API.post('/api/reservation/getMissionSlot', data);
export const grabUpdatedSlotApi = data =>
  API.post('/api/reservation/grabUpdatedSlot', data);
export const updateMissionSlotApi = data =>
  API.post('/api/reservation/updateMissionSlot', data);
