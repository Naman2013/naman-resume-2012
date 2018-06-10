import React from 'react';
import { shallow } from 'enzyme';
import HowBig from './HowBig';
import ScaleDown from './ScaleDown';
import ScaleUp from './ScaleUp';

describe('HowBig', () => {
  const vanillaProps = { dimension: 100, referenceScale: 1, targetScale: 1 };
  const howBig = shallow(<HowBig {...vanillaProps} />);

  it('should render correctly', () => {
    expect(howBig).toMatchSnapshot();
  });

  describe('when given reference and target scale', () => {
    const targetLargerProps = { referenceScale: 0.34, targetScale: 1 };
    const targetSmallerProps = { referenceScale: 1, targetScale: 0.34 };
    it('should render `<ScaleDown />` when target is smaller than the reference', () => {
      howBig.setProps(targetSmallerProps);
      expect(howBig.find(ScaleDown).length).toEqual(1);
    });

    it('should render `<ScaleUp />` when the target is larger than the reference', () => {
      howBig.setProps(targetLargerProps);
      expect(howBig.find(ScaleUp).length).toEqual(1);
    });
  });
});
