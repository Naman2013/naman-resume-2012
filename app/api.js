/* eslint-disable */
import { projectLocale, projectProductId } from 'app/config/project-config';
import axios from 'axios';
import { getUserInfo } from 'app/modules/User';

const commonData = {
  clientDeviceDetails: {
    platform: window.navigator?.platform,
    language: window.navigator?.language,
    appCodeName: window.navigator?.appCodeName,
    appVersion: window.navigator?.appVersion,
    userAgent: window.navigator?.userAgent, // browser, OS
    orientationType: window.screen?.orientation?.type,
    screenResolution: {
      width: window.screen?.width,
      height: window.screen?.height,
      availHeight: window.screen?.availHeight,
      availWidth: window.screen?.availWidth,
    },
  },
};

export const API = axios.create({
  transformRequest: [
    (data, headers) => {
      if (headers['Content-Type'] === 'multipart/form-data') {
        return data;
      }
      // handle 'application/json'
      headers['Content-Type'] = 'application/json';
      const { _sloohatid, _sloohsstkn, SLOOH_CUSTOM_TESTING_AUTH } = getUserInfo();      
      const finalData = {
        ...data,
        ...commonData,
        locale: projectLocale,
        productId: projectProductId,
        sloohMarketingTrackingId: _sloohatid,
        sloohSiteSessionToken: _sloohsstkn,
        sloohCustomTestingAuth: SLOOH_CUSTOM_TESTING_AUTH
      };
      return JSON.stringify(finalData);
    },
  ],
});
