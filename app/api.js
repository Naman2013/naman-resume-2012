import axios from 'axios';

const commonData = {
  clientDeviceDetails: {
    platform: window.navigator.platform,
    language: window.navigator.language,
    appCodeName: window.navigator.appCodeName,
    appVersion: window.navigator.appVersion,
    userAgent: window.navigator.userAgent, // browser, OS
    orientationType: window.screen.orientation.type,
    screenResolution: {
      width: window.screen.width,
      height: window.screen.height,
      availHeight: window.screen.availHeight,
      availWidth: window.screen.availWidth,
    },
  },
};

export const API = axios.create({
  transformRequest: [
    (data, headers) => {
      if (headers['Content-Type'] === 'multipart/form-data') {
        return data;
      }
      headers['Content-Type'] = 'application/json';
      const finalData = { ...data, ...commonData };
      return JSON.stringify(finalData);
    },
  ],
});
