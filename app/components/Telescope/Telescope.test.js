import React from 'react';
import { shallow, mount } from 'enzyme';
import Telescope from './Telescope';
import telescopeConfig from './telescopeConfig';

describe('Telescope interface', () => {
  const activeTelescope = telescopeConfig.CANARY_ONE_HALF_METER;
  const previousTelescope = telescopeConfig.CANARY_TWO_WIDE_FIELD;

  const shallowTelescope = shallow(<Telescope
    activeInstrumentID={activeTelescope.instrumentID}
    previousInstrumentID={previousTelescope.instrumentID}
    increment={5}
  />);

  const mountedTelescope = mount(<Telescope
    activeInstrumentID={activeTelescope.instrumentID}
    previousInstrumentID={previousTelescope.instrumentID}
    increment={5}
  />);

  describe('initialization', () => {
    it('should render correctly', () => {
      expect(shallowTelescope).toMatchSnapshot();
    });

    describe('`props`', () => {
      it('initializes with a `missionTargetID` of 0', () => {
        const initializingMissionMeta = { missionTargetID: 0 };
        expect(mountedTelescope.props().missionMetaData).toEqual(initializingMissionMeta);
      });
    });

    describe('`state`', () => {
      it('sets `awaitingMission` when `props.missionMetaData.missionTargetID` is `0`', () => {
        expect(mountedTelescope.state().awaitingMission).toEqual(true);
      });

      it('initializes `transitionScale` to `false`', () => {
        expect(mountedTelescope.state().transitionScale).toEqual(false);
      });
    });
  });

  describe('when updating with new mission information', () => {
    const nonMission = { missionTargetID: 0 };
    const realMission = { missionTargetID: 1 };
    const realMission2 = { missionTarget: 2 };

    beforeEach(() => {
      mountedTelescope.setProps({ missionMetaData: nonMission });
    });

    describe('when the incoming ID is `0`', () => {
      beforeEach(() => {
        mountedTelescope.setProps({ missionMetaData: nonMission });
      });

      it('sets `awaitingMission` to `true`', () => {
        expect(mountedTelescope.state().awaitingMission).toEqual(true);
      });

      it('sets `transitionScale` to `false`', () => {
        expect(mountedTelescope.state().transitionScale).toEqual(false);
      });
    });

    describe('when the incoming ID is non-`0`', () => {
      beforeEach(() => {
        mountedTelescope.setProps({ missionMetaData: realMission });
      });

      it('sets `awaitingMission` to `false` when a real mission arrives', () => {
        expect(mountedTelescope.state().awaitingMission).toEqual(false);
      });

      describe('when a new `missionTargetID` arrives', () => {
        it('sets `transitionScale` to `true` when first non-`0` appears', () => {
          expect(mountedTelescope.state().transitionScale).toEqual(true);
        });

        it('sets `transitionScale` to `true` when new `missionTargetID` arrives', () => {
          mountedTelescope.setProps({ missionMetaData: realMission2 });
          expect(mountedTelescope.state().transitionScale).toEqual(true);
        });

        it('`transitionScale` remains `false` when seeing the same mission appear twice', () => {
          mountedTelescope.setProps({ missionMetaData: realMission2 });
          mountedTelescope.instance().handleCompleteHowBigAnimation();
          mountedTelescope.setProps({ missionMetaData: realMission2 });
          expect(mountedTelescope.state().transitionScale).toEqual(false);
        });
      });
    });

    describe('when `HowBig` animation is completed', () => {
      beforeEach(() => {
        mountedTelescope.instance().handleCompleteHowBigAnimation();
      });

      it('sets `transitionScale` to `false`', () => {
        expect(mountedTelescope.state().transitionScale).toEqual(false);
      });
    });
  });
});
