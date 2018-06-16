import React from 'react';
import { shallow, mount } from 'enzyme';
import ScaleDown from './ScaleDown';
import ObjectFrame from './ReferenceObjects/ObjectFrame';

const initialProps = {
  referenceObject: 'SOLAR_SYSTEM',
  targetObjectURL: 'https://vega.slooh.com/icons/community/human_spirit.svg',
  targetObjectScale: 0.34,
  dimension: 500,
  onComplete: jest.fn(),
};

describe('ScaleDown', () => {
  const spyBeginDelayToShowReference = jest.spyOn(ScaleDown.prototype, 'beginDelayToShowReference');
  const scaleDown = mount(<ScaleDown {...initialProps} />);

  describe('initialization', () => {
    it('should use 2 `FadeSVG` elements', () => {
      expect(scaleDown.find('FadeSVG').length).toEqual(2);
    });

    it('should initialize state with `targetInitialSize`', () => {
      expect(scaleDown.state().targetCurrentScale).toEqual(1);
    });

    it('should initialize state with `referenceOpacity` to 1', () => {
      expect(scaleDown.state().referenceOpacity).toEqual(1);
    });

    it('should initialize state with `referenceObjectLoaded` and `targetObjectLoaded`', () => {
      expect(scaleDown.state().referenceObjectLoaded).toEqual(false);
      expect(scaleDown.state().targetObjectLoaded).toEqual(false);
    });

    it('should initialze state with `beginReference` to `false`', () => {
      expect(scaleDown.state().beginReference).toEqual(false);
    });

    describe('after mounting', () => {
      it('should have called `beginDelayToShowReference`', () => {
        expect(spyBeginDelayToShowReference).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('when provided a target domain/reference', () => {
    it('will render two `ObjectFrame`s', () => {
      expect(scaleDown.find(ObjectFrame).length).toEqual(2);
    });
  });

  describe('when loading reference and target svg elements', () => {
    beforeEach(() => {
      scaleDown.setState({ targetObjectLoaded: false, referenceObjectLoaded: false });
    });

    it('should set `targetObjectLoaded` to true', () => {
      scaleDown.instance().handleTargetObjectLoaded();
      expect(scaleDown.state().targetObjectLoaded).toEqual(true);
    });

    it('should set `referenceObjectLoaded` to true', () => {
      scaleDown.instance().handleReferenceObjectLoaded();
      expect(scaleDown.state().referenceObjectLoaded).toEqual(true);
    });
  });

  describe('when it completes animating', () => {
    it('should call the onComplete function', () => {
      scaleDown.instance().completeScaleDown();
      expect(initialProps.onComplete).toBeCalled();
    });
  });
});
