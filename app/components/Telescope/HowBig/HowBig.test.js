import React from 'react';
import { shallow } from 'enzyme';
import HowBig from './HowBig';
import ScaleDown from './ScaleDown';
import ScaleUp from './ScaleUp';

describe('HowBig', () => {
  const props = {
    dimension: 100,
    referenceObjectScale: 1,
    referenceObject: 'SOLAR_SYSTEM',
    targetObjectScale: 1,
    targetObjectURL: 'https://vega.slooh.com/icons/community/human_spirit.svg',
    onComplete: jest.fn(),
  };
  const howBig = shallow(<HowBig {...props} />);

  it('should render correctly', () => {
    expect(howBig).toMatchSnapshot();
  });

  describe('when given reference and target scale', () => {
    const targetLargerProps = { referenceObjectScale: 0.34, targetObjectScale: 1 };
    const targetSmallerProps = { referenceObjectScale: 1, targetObjectScale: 0.34 };
    it('should render `<ScaleDown />` when target is smaller than the reference', () => {
      howBig.setProps(targetSmallerProps);
      expect(howBig.find(ScaleDown).length).toEqual(1);
    });

    it('should render `<ScaleUp />` when the target is larger than the reference', () => {
      howBig.setProps(targetLargerProps);
      expect(howBig.find(ScaleUp).length).toEqual(1);
    });
  });

  describe('when completing an animation', () => {
    xit('calls the `onComplete` callback provided', () => {
      expect(props.onComplete).toBeCalled();
    });
  });
});
