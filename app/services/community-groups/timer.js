let topThreadsExpireTimer = null;

export const setupTopThreadsExpireTimer = (expireTime, callback) => {
  topThreadsExpireTimer = setTimeout(callback, expireTime * 1000 - Date.now());
};

export const stopTopThreadsExpireTimer = () => {
  clearTimeout(topThreadsExpireTimer);
};
