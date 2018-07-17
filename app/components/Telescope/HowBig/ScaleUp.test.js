import React from 'react';
import { shallow, mount } from 'enzyme';
import ScaleUp from './ScaleUp';
import fauxMissions from 'content/fauxMissions';

const setup = (customProps) => {
  const props = Object.assign({}, fauxMissions.scaleUp, customProps);

  const shallowWrapper = shallow(<ScaleUp {...props} />);
  const mountedWrapper = mount(<ScaleUp {...props} />);

  return {
    mountWrapper: () => (mount(<ScaleUp {...props} />)),
    shallowWrapper,
    mountedWrapper,
    FadeSVG: shallowWrapper.find('FadeSVG'),
    SVGText: shallowWrapper.find('SVGText'),
    ObjectFrame: shallowWrapper.find('ObjectFrame'),
  };
};

describe('ScaleUp', () => {
  jest.useFakeTimers();

  describe('rendering', () => {
    const {
      shallowWrapper,
      FadeSVG,
      SVGText,
      ObjectFrame,
    } = setup();
    it('should render correctly', () => {
      expect(shallowWrapper).toMatchSnapshot();
    });

    it('there are three `FadeSVG` elements included in the design of this component', () => {
      expect(FadeSVG.length).toEqual(3);
    });

    it('should have an `SVGText` element for the reference and the target objects', () => {
      expect(SVGText.length).toEqual(2);
    });

    it('should have an `ObjectFrame` for both the refernce and the target elements', () => {
      expect(ObjectFrame.length).toEqual(2);
    });
  });

  describe('when the component mounts', () => {
    const spyBeginDelayToShowReference = jest.spyOn(ScaleUp.prototype, 'beginDelayToShowReference');
    const spyPresentReference = jest.spyOn(ScaleUp.prototype, 'presentReference');
    const spyScaleReference = jest.spyOn(ScaleUp.prototype, 'scaleReference');
    const spyPrepareToAnimateReferenceLocation = jest.spyOn(ScaleUp.prototype, 'prepareToAnimateReferenceLocation');
    const spyAnimateMoveReference = jest.spyOn(ScaleUp.prototype, 'animateMoveReference');
    const spyAnimateIntroduceTargetObject = jest.spyOn(ScaleUp.prototype, 'animateIntroduceTargetObject');
    const mockOnComplete = jest.fn();
    let mountedWrapper;

    beforeEach(() => {
      mountedWrapper = setup({ onComplete: mockOnComplete }).mountWrapper();
    });

    it('should call `beginDelayToShowReference()`', () => {
      expect(spyBeginDelayToShowReference).toHaveBeenCalled();
    });

    it('should call `presentReference()` when timers are done, then sets `showReference` to `true`', () => {
      jest.runAllTimers();
      expect(spyPresentReference).toHaveBeenCalled();
      expect(mountedWrapper.state().showReference).toEqual(true);
    });

    it('`presentReference()` calls `scaleReference()`', () => {
      mountedWrapper.instance().presentReference();
      jest.runAllTimers();
      expect(spyScaleReference).toHaveBeenCalled();
    });

    // TODO: need to figure out how to test the time after the animation methods are completed
    xit('after `SCALE_DURATION` has completed, the state of the scale should match the `referenceObjectScale` provided via props - then, `prepareToAnimateReferenceLocation()` should be called', () => {
      mountedWrapper.instance().scaleReference();
      expect(mountedWrapper.state('referenceScale'))
        .toEqual(mountedWrapper.props().referenceObjectScale);
      expect(spyPrepareToAnimateReferenceLocation).toHaveBeenCalled();
    });

    describe('when `prepareToAnimateReferenceLocation()` has been called', () => {
      it('when the timer completes, should call `animateMoveReference()`', () => {
        mountedWrapper.instance().prepareToAnimateReferenceLocation();
        jest.runAllTimers();
        expect(spyAnimateMoveReference).toHaveBeenCalled();
      });
    });

    describe('when `prepareToIntroduceTargetObject()` timer completes', () => {
      it('it should call `animateIntroduceTargetObject()` and set `showReferenceText` should be `false`', () => {
        mountedWrapper.instance().prepareToIntroduceTargetObject();
        jest.runAllTimers();
        expect(spyAnimateIntroduceTargetObject).toHaveBeenCalled();
        expect(mountedWrapper.state().showReferenceText).toEqual(false);
      });
    });

    describe('when `animateIntroduceTargetObject` is called', () => {
      xit('should animate the opacity state for the target object to 1', () => {});
    });

    describe('when reference or target asset is loaded', () => {
      it('sets `referenceObjectLoaded` to `true`', () => {
        mountedWrapper.instance().handleReferenceObjectLoaded();
        expect(mountedWrapper.state().referenceObjectLoaded).toEqual(true);
      });

      it('sets state `targetObjectLoaded` to `true`', () => {
        mountedWrapper.instance().handleTargetObjectLoaded();
        expect(mountedWrapper.state().targetObjectLoaded).toEqual(true);
      });
    });

    describe('completing the animation', () => {
      it('should call the `onComplete` method provided by props when the timer expires', () => {
        mountedWrapper.instance().complete();
        jest.runAllTimers();
        expect(mockOnComplete).toHaveBeenCalled();
      });
    });

    jest.clearAllMocks();
  });
});
