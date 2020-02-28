let missionListTimer: number = null;

export const setupLiveActivityTimer = (time: number, callback: Function) => {

  missionListTimer = setTimeout(callback, time);
};

export const stopLiveActivityTimer = () => {
  clearTimeout(missionListTimer);
};
