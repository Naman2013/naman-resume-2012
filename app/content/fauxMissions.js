import eskimoNebula from '../components/Telescope/HowBig/ReferenceObjects/svg/howbig-eskimo-nebula.svg';
import jupiter from '../components/Telescope/HowBig/ReferenceObjects/svg/howbig-jupiter.svg';
import earth from '../components/Telescope/HowBig/ReferenceObjects/svg/howbig-earth.svg';

export default {
  nonMission: { missionTargetID: 0 },
  scaleDown: {
    key: 'scaleDown',
    missionTargetID: 1,
    referenceObjectScale: 1,
    domain: 'MILKY_WAY',
    targetObjectScale: 0.34,
    targetObjectURL: eskimoNebula,
    targetObjectName: 'Eskimo Nebula',
  },
  scaleUp: {
    key: 'scaleUp',
    missionTargetID: 2,
    referenceObjectScale: 0.09,
    domain: 'SOLAR_SYSTEM',
    targetObjectScale: 1,
    targetObjectURL: jupiter,
    targetObjectName: 'Jupiter',
  },
};
