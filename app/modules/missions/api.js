import axios from 'axios';

export const getMissionsApi = data => axios.post('/api/page/missions', data);
export const getCategoryListApi = data =>
  axios.post('/api/reservation/getPopularCategoryList', data);
export const getObjectListApi = data =>
  axios.post('/api/reservation/getPopularObjectList', data);
/*

const response = {
  ver: 'v1',
  lang: 'en',
  apiError: false,
  errorCode: 0,
  errorMsg: '',
  statusCode: 200,
  pageIconURL: 'https://vega.slooh.com/assets/v4/dashboard/icon_missions.svg',
  pageTitle: 'MISSION SETUP',
  navigationConfig: [
    { title: 'BY SLOOH 1000', linkURL: '/missions/bySlooh1000' },
    { title: 'BY CATALOG', linkURL: '/missions/byCatalog' },
    { title: 'BY TELESCOPE', linkURL: '/missions/byTelescope' },
  ],
};
*/
