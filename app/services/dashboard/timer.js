let featuredObjectsExpireTimer = null;

export const setupFeaturedObjectsExpireTimer = (time, callback) => {
  featuredObjectsExpireTimer = setTimeout(callback, time * 1000);
};

export const stopFeaturedObjectsExpireTimer = () => {
  clearTimeout(featuredObjectsExpireTimer);
};
