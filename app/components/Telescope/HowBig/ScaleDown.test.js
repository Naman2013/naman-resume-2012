import React from 'react';
import { shallow, mount } from 'enzyme';
import ScaleDown from './ScaleDown';
import ObjectFrame from './ReferenceObjects/ObjectFrame';

jest.useFakeTimers();

const initialProps = {
  domain: 'SOLAR_SYSTEM',
  targetObjectURL: 'https://vega.slooh.com/icons/community/human_spirit.svg',
  targetObjectName: 'Test object',
  targetObjectScale: 0.34,
  dimension: 500,
  onComplete: jest.fn(),
};

describe('ScaleDown', () => {
  const spyBeginDelayToShowReference = jest.spyOn(ScaleDown.prototype, 'beginDelayToShowReference');
  const scaleDown = mount(<ScaleDown {...initialProps} />);

  describe('initialization', () => {
    it('should use 1 `FadeSVG` elements', () => {
      expect(scaleDown.find('FadeSVG').length).toEqual(1);
    });

    it('should use 2 `SVGText` components for rendering labels', () => {
      expect(scaleDown.find('SVGText').length).toEqual(2);
    });

    xit('should initialize state with `targetInitialSize`', () => {
      expect(scaleDown.state().targetScale).toEqual(1);
    });

    xit('should initialize state with `referenceOpacity` to 1', () => {
      expect(scaleDown.state().referenceOpacity).toEqual(1);
    });

    xit('should initialize state with `referenceObjectLoaded` and `targetObjectLoaded`', () => {
      expect(scaleDown.state().referenceObjectLoaded).toEqual(false);
      expect(scaleDown.state().targetObjectLoaded).toEqual(false);
    });

    xit('should initialze state with `beginReference` to `false`', () => {
      expect(scaleDown.state().beginReference).toEqual(false);
    });
  });

  describe('during lifecycle methods', () => {
    describe('componentDidMount', () => {
      it('should have called `beginDelayToShowReference`', () => {
        expect(spyBeginDelayToShowReference).toHaveBeenCalledTimes(1);
        spyBeginDelayToShowReference.mockReset();
        spyBeginDelayToShowReference.mockRestore();
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

  describe('the animation workflow', () => {
    describe('the pause before the reference object appears', () => {
      const mockBeginFadeReferenceTimer = jest.spyOn(scaleDown.instance(), 'beginFadeReferenceTimer');
      const mockFadeReference = jest.spyOn(scaleDown.instance(), 'fadeReference');

      jest.runAllTimers();

      it('`beginDelayToShowReference` will create a timer that will set the `beginReference` flag to `true` when completed', () => {
        expect(scaleDown.state().beginReference).toEqual(true);
      });

      it('calls `beginFadeReferenceTimer()`', () => {
        expect(mockBeginFadeReferenceTimer).toHaveBeenCalledTimes(1);
      });

      jest.runAllTimers();

      it('calls `fadeReference()` when `beginFadeReferenceTimer()` completes', () => {
        expect(mockFadeReference).toHaveBeenCalledTimes(1);
      });
    });

    describe('when it completes animating', () => {
      it('should call the onComplete function', () => {
        scaleDown.instance().completeScaleDown();
        expect(initialProps.onComplete).toBeCalled();
      });
    });
  });
});
