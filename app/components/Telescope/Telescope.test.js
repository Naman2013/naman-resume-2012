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
      it('should start with `missionsViewed` at 0', () => {
        expect(shallowTelescope.state().missionsViewed).toEqual(0);
      });

      it('sets `awaitingMission` when `props.missionMetaData.missionTargetID` is `0`', () => {
        expect(mountedTelescope.state().awaitingMission).toEqual(true);
      });
    });
  });

  describe('when updating with new mission information', () => {
    const nonMission = { missionTargetID: 0 };
    const realMission = { missionTargetID: 1 };
    beforeEach(() => {
      mountedTelescope.setProps({ missionMetaData: nonMission });
    });

    it('sets `state.awaitingMission` to `false` when a real mission arrives', () => {
      mountedTelescope.setProps({ missionMetaData: realMission });
      expect(mountedTelescope.state().awaitingMission).toEqual(false);
    });

    it('sets `state.awaitingMission` to `true` when the incoming ID is `0`', () => {
      mountedTelescope.setProps({ missionMetaData: realMission });
      mountedTelescope.setProps({ missionMetaData: nonMission });
      expect(mountedTelescope.state().awaitingMission).toEqual(true);
    });
  });
});
