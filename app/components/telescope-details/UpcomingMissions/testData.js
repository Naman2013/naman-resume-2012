export default [
  {
    upcomingMissionIndex: 0,
    upcomingMissionAvailable: true,
    upcomingScheduledMissionId: 1621824,
    upcomingStart: 1499570100,
    upcomingTitle: 'Pending: Target name is not yet available',
    upcomingObjectIconURL: 'https://vega.slooh.com/icons/reservations/not_available_w.svg',
  },
  {
    upcomingMissionIndex: 1,
    upcomingMissionAvailable: true,
    upcomingScheduledMissionId: 1621825,
    upcomingStart: 1499570400,
    upcomingTitle: 'Pending: Target name is not yet available',
    upcomingObjectIconURL: 'https://vega.slooh.com/icons/reservations/not_available_w.svg',
  },
];

export const SAMPLE_GET_CURRENT_MISSION = {
  ver: 'v1',
  lang: 'en',
  timestamp: 1479505537,
  obsId: 'teide',
  domeId: 2,
  telescopeId: 'teide2',
  format: 'full',
  onlineStatus: 'online',
  apiError: false,
  errorCode: 0,
  errorMsg: '',
  statusCode: 200,
  firstMissionTimestamp: 1479496020,
  lastMissionTimestamp: 1479537420,
  debugFirstMissionDateTime: '2016-11-18 19:07',
  debugLastMissionDateTime: '2016-11-19 06:37',
  missionCount: 1,
  missionList: [
    {
      missionIndex: 0,
      missionAvailable: true,
      missionObjective: '',
      missionLikeCount: 0,
      missionStart: 1479505320,
      durationSec: 300,
      expires: 1479505620,
      scheduledMissionId: 1478560,
      objectId: 0,
      objectTitle: '2016 LX48 Celestial Coordinates - RA: 1.77722 Dec: 27.8008',
      objectIconURL: 'https://webassets.slooh.com/images/placeholders/Jupiter.svg',
      objectDescription:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut mattis et nisl vitae tempus. Nulla nec est non massa dictum tincidunt. Fusce sed porta nisl. Quisque sit amet dui dolor. Sed a suscipit velit. Nunc accumsan, odio nec imperdiet semper, massa ipsum ornare nunc, quis gravida quam lectus nec dui. Quisque auctor luctus massa, sed consequat arcu luctus at. Curabitur rhoncus enim sit amet ipsum tempus, vitae rutrum tellus efficitur.',
      objectRA: '1.77722',
      objectDec: '27.8008',
      objectConstellation: '---',
      objectMagnitude: '0',
      objectSizeArcMinutes: 0,
      objectDistance: '---',
      objectRiseTime: '---',
      objectTransitTime: '---',
      objectSetTime: '---',
      objectMoonProximity: '---',
      objectMoonAltitude: '-9',
      objectMoonIllumination: '75',
      nextMissionAvailable: true,
      nextScheduledMissionId: '1478561',
      nextStart: 1479505620,
      nextTitle: 'Target name is not available',
      nextObjectIconURL: 'https://webassets.slooh.com/images/placeholders/Jupiter.svg',
      ownerId: '187161',
      ownerLocation: '',
      ownerDisplayName: 'WayneC.140428',
      ownerMembershipType: 'Astronomer',
      ownerGuardianFlag: false,
      ownerMemberSince: '2014',
      ownerAvatarType: 'dummy',
      ownerAvatarURL: 'http://images-account.slooh.com/avatar-dummy.png',
    },
  ],
};
