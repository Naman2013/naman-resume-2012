import axios from 'axios';

export const getMissionsApi = data => axios.post('/api/page/missions', data);
export const getMissionSlotApi = data =>
  axios.post('/api/reservation/grabMissionSlot', data);
export const reserveMissionSlotApi = data =>
  axios.post('/api/reservation/reserveMissionSlot', data);
export const cancelMissionSlotApi = data =>
  axios.post('/api/reservation/cancelMissionSlot', data);
export const getMissionListApi = data =>
  axios.post('/api/reservation/getMissionList', data);

// bySlooh1000 page
export const getBySlooh1000Api = data =>
  axios.post('/api/missions/getBySlooh1000', data);
export const getCategoryListApi = data =>
  axios.post('/api/reservation/getSlooh1000CategoryList', data);
export const getObjectListApi = data =>
  axios.post('/api/reservation/getSlooh1000ObjectList', data);

// byConstellation
export const getConstellationListApi = data =>
  axios.post('/api/reservation/getConstellationList', data);
export const getConstellationObjectListApi = data =>
  axios.post('/api/reservation/getConstellationObjectList', data);

// byCatalog page
export const getByCatalogApi = data =>
  axios.post('/api/missions/getByCatalog', data);
export const getCatalogListApi = data =>
  axios.post('/api/reservation/getCatalogList', data);
export const checkCatalogVisibilityApi = data =>
  axios.post('/api/reservation/checkCatalogVisibility', data);
export const getPresetOptionsApi = data =>
  axios.post('/api/reservation/getPresetOptions', data);
export const checkTargetVisibilityApi = data =>
  axios.post('/api/reservation/checkTargetVisibility', data);

// byTelescope page
export const getObservatoryListApi = data => axios.post('/api/obs/list', data);
export const getMissionSlotDatesApi = data =>
  axios.post('/api/reservation/getMissionSlotDates', data);
export const getMissionSlotsByTelescopeApi = data =>
  axios.post('/api/reservation/getMissionSlotsByTelescope', data);
export const getTelescopeSlotApi = data =>
  axios.post('/api/reservation/grabTelescopeSlot', data);
export const getCoordinatesCategoryListApi = data =>
  axios.post('/api/reservation/getCoordinatesCategoryList', data);

// Pyggyback missions

export const grabPiggybackApi = data =>
  axios.post('/api/reservation/grabPiggyback', data);
export const reservePiggybackApi = data =>
  axios.post('/api/reservation/reservePiggyback ', data);
