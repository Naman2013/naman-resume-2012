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
  };
};

describe('ScaleUp', () => {
  jest.useFakeTimers();

  describe('rendering', () => {
    const { shallowWrapper, FadeSVG } = setup();
    it('should render correctly', () => {
      expect(shallowWrapper).toMatchSnapshot();
    });

    it('should have a `FadeSVG` element', () => {
      expect(FadeSVG.length).toEqual(1);
    });
  });

  describe('when the component mounts', () => {
    const spyBeginDelayToShowReference = jest.spyOn(ScaleUp.prototype, 'beginDelayToShowReference');
    const spyPresentReference = jest.spyOn(ScaleUp.prototype, 'presentReference');
    const spyScaleReference = jest.spyOn(ScaleUp.prototype, 'scaleReference');
    let mountedWrapper;

    beforeEach(() => {
      mountedWrapper = setup().mountWrapper();
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

    describe('when reference asset is loaded', () => {
      it('sets `referenceObjectLoaded` to `true`', () => {
        mountedWrapper.instance().handleReferenceObjectLoaded();
        expect(mountedWrapper.state().referenceObjectLoaded).toEqual(true);
      });
    });

    xit('scales the reference down to the target scale provided through props, after the duration ', () => {});

    jest.clearAllMocks();
  });
});
