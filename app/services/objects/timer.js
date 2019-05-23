let communityMissionExpireTimer = null;

export const setupCommunityMissionExpireTimer = (time, callback) => {
  communityMissionExpireTimer = setTimeout(callback, time * 1000);
};

export const stopCommunityMissionExpireTimer = () => {
  clearTimeout(communityMissionExpireTimer);
};
