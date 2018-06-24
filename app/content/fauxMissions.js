import eskimoNebula from '../components/Telescope/HowBig/ReferenceObjects/svg/howbig-eskimo-nebula.svg';
import jupiter from '../components/Telescope/HowBig/ReferenceObjects/svg/howbig-jupiter.svg';
import earth from '../components/Telescope/HowBig/ReferenceObjects/svg/howbig-earth.svg';
import milkyWay from '../components/Telescope/HowBig/ReferenceObjects/svg/howbig-milky-way-galaxy.svg';

export default {
  nonMission: { missionTargetID: 0 },
  scaleDown: {
    key: 'scaleDown',
    missionTargetID: 1,
    referenceObjectScale: 1,
    referenceObjectURL: milkyWay,
    referenceObjectName: 'Milky Way',
    targetObjectScale: 0.34,
    targetObjectURL: eskimoNebula,
    targetObjectName: 'Eskimo Nebula',
  },
  scaleUp: {
    key: 'scaleUp',
    missionTargetID: 2,
    referenceObjectScale: 0.34,
    referenceObjectURL: earth,
    referenceObjectName: 'Earth',
    targetObjectScale: 1,
    targetObjectURL: jupiter,
    targetObjectName: 'Jupiter',
  },
};
