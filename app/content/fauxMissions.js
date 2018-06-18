export default {
  nonMission: { missionTargetID: 0 },
  scaleDown: {
    key: 'scaleDown',
    missionTargetID: 1,
    referenceObjectScale: 1,
    referenceObject: 'SOLAR_SYSTEM',
    targetObjectScale: 0.34,
    targetObjectURL: 'https://vega.slooh.com/icons/nav/Galaxy_nav_w.svg',
    targetObjectName: 'Test object',
  },
  scaleUp: {
    key: 'scaleUp',
    missionTargetID: 2,
    referenceObjectScale: 0.34,
    referenceObject: 'SOLAR_SYSTEM',
    targetObjectScale: 1,
    targetObjectURL: 'https://vega.slooh.com/icons/nav/menu-help.svg',
    targetObjectName: 'Test object',
  },
};
