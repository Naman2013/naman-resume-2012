import React from 'react';
import { shallow } from 'enzyme';
import SterlingTitle from './SterlingTitle';

describe('SterlingTitle', () => {

  const setup = () => {
    const props = { title: 'Foo', subTitle: 'Bar' };
    const shallowWrapper = shallow(<SterlingTitle {...props} />);
    return {
      shallowWrapper,
      subTitle: shallowWrapper.find('.sub-title'),
    };
  };

  it('should render correctly', () => {
    expect(setup().shallowWrapper).toMatchSnapshot();
  });

  describe('when providing a subTitle', () => {
    it('should render a subTitle when it is provided', () => {
      expect(setup().subTitle.length).toEqual(1);
    });

    it('should not render a sub title when NOT provided', () => {
      expect(setup().shallowWrapper.setProps({ subTitle: '' }).find('.sub-title').length).toEqual(0);
    });
  });
});
