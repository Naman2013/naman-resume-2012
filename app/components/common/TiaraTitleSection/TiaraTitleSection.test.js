import React from 'react';
import { shallow } from 'enzyme';
import TiaraTitleSection from './TiaraTitleSection';

const setup = (customProps = {}) => {
  const props = Object.assign({}, customProps);
  const shallowWrapper = shallow(<TiaraTitleSection {...props} />);

  return {
    shallowWrapper,
  };
};

describe('TiaraTitleSection', () => {
  it('should render correctly', () => {
    expect(setup().shallowWrapper).toMatchSnapshot();
  });
});
