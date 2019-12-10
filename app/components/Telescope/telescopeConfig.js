import first from 'lodash/first';

const telescopeConfig = {
  '1ff72faa-7909-11e6-a635-0eb2b1774883': {
    key: 'CANARY_ONE_HALF_METER',
    name: 'Canary One Half Meter',
    topName: 'Canary One',
    bottomName: 'Half Meter',
    instrumentID: '76de934d-7909-11e6-a635-0eb2b1774883',
    directionMarkerLengthArcMinutes: 3,
    FOV: {
      horizontal: 37,
      vertical: 37,
    },
    PORTAL: {
      horizontal: 37,
      vertical: 37,
    },
  },
  '2590c3fd-7909-11e6-a635-0eb2b1774883': {
    key: 'CANARY_TWO_WIDE_FIELD',
    name: 'Canary Two Wide Field',
    topName: 'Canary Two',
    bottomName: 'Wide-Field',
    instrumentID: '8032dfaf-7909-11e6-a635-0eb2b1774883',
    directionMarkerLengthArcMinutes: 3,
    FOV: {
      horizontal: 43,
      vertical: 43,
    },
    PORTAL: {
      horizontal: 43,
      vertical: 43,
    },
  },
  CANARY_TWO_ULTRA_WIDE_FIELD: {
    key: 'CANARY_TWO_ULTRA_WIDE_FIELD',
    name: 'Canary Two Ultra Wide Field',
    topName: 'Canary Two',
    bottomName: 'Ultra-Wide-Field',
    instrumentID: '88814408-7909-11e6-a635-0eb2b1774883',
    directionMarkerLengthArcMinutes: 6,
    FOV: {
      horizontal: 107,
      vertical: 72,
    },
    PORTAL: {
      horizontal: 72,
      vertical: 72,
    },
  },
  '3686b322-7909-11e6-a635-0eb2b1774883': {
    key: 'CANARY_THREE_DEEP_SKY',
    name: 'Canary Three Deep Sky',
    topName: 'Canary Three',
    bottomName: 'Deep Sky',
    instrumentID: '905f9d8d-7909-11e6-a635-0eb2b1774883',
    directionMarkerLengthArcMinutes: 6,
    FOV: {
      horizontal: 99,
      vertical: 75,
    },
    PORTAL: {
      horizontal: 75,
      vertical: 75,
    },
  },
  '3db71869-7909-11e6-a635-0eb2b1774883': {
    key: 'CANARY_FOUR_SOLAR_SYSTEM',
    name: 'Canary Four Solar System',
    topName: 'Canary Four',
    bottomName: 'Solar System',
    instrumentID: '97f58d52-7909-11e6-a635-0eb2b1774883',
    directionMarkerLengthArcMinutes: 1,
    FOV: {
      horizontal: 16,
      vertical: 12,
    },
    PORTAL: {
      horizontal: 12,
      vertical: 12,
    },
  },
  '54accc1d-7909-11e6-a635-0eb2b1774883': {
    key: 'CANARY_FIVE_SOLAR',
    name: 'Canary Five Solar',
    instrumentID: 'b0b33e71-7909-11e6-a635-0eb2b1774883',
    directionMarkerLengthArcMinutes: 2,
    FOV: {
      horizontal: 37,
      vertical: 21,
    },
    PORTAL: {
      horizontal: 21,
      vertical: 21,
    },
  },
  '4624887a-7909-11e6-a635-0eb2b1774883': {
    key: 'CHILE_ONE_WIDE_FIELD',
    name: 'Chile One Wide Field',
    topName: 'Chile One',
    bottomName: ' Wide-Field',
    instrumentID: 'cd31c5c9-7909-11e6-a635-0eb2b1774883',
    directionMarkerLengthArcMinutes: 2,
    FOV: {
      horizontal: 31,
      vertical: 21,
    },
    PORTAL: {
      horizontal: 21,
      vertical: 21,
    },
  },
  '6acfb8cd-7909-11e6-a635-0eb2b1774883': {
    key: 'CHILE_ONE_ULTRA_WIDE_FIELD',
    name: 'Chile One Ultra Wide Field',
    topName: 'Chile One',
    bottomName: 'Ultra-Wide-Field',
    instrumentID: 'd3ca2e16-7909-11e6-a635-0eb2b1774883',
    directionMarkerLengthArcMinutes: 5,
    FOV: {
      horizontal: 82,
      vertical: 60,
    },
    PORTAL: {
      horizontal: 60,
      vertical: 60,
    },
  },
  '8bc4567f-c9f4-11e6-86df-0eb2b1774883': {
    key: 'CHILE_TWO_WIDE_FIELD',
    name: 'Chile Two Wide Field',
    topName: 'Chile Two',
    bottomName: 'Wide-Field',
    instrumentID: '9cf72bb2-34ad-11e7-970a-0eb2b1774883',
    directionMarkerLengthArcMinutes: 3,
    FOV: {
      horizontal: 43,
      vertical: 43,
    },
    PORTAL: {
      horizontal: 43,
      vertical: 43,
    },
  },
};

export default telescopeConfig;

export function getTelescope(instrumentID) {
  const telescopeNames = Object.keys(telescopeConfig);
  const selectedTelescope = first(telescopeNames.filter(telescope => telescopeConfig[telescope].instrumentID === instrumentID));
  return telescopeConfig[selectedTelescope];
}
