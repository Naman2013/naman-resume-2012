const missionListTimer = null;

export const setupMissionListTimer = (time, callback) => {
  missionListTimer = setTimeout(callback, time);
};

export const stopMissionListTimer = () => {
  clearTimeout(missionListTimer);
};
