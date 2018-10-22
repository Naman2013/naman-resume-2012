import React from 'react';
import { shallow } from 'enzyme';
import Medallion from './Medallion';

const setup = (customProps) => {
  const props = Object.assign({ iconURL: '' }, customProps);
  const shallowWrapper = shallow(<Medallion {...props} />);
  return {
    shallowWrapper,
  };
};

describe('Medallion', () => {
  it('should render correctly', () => {
    expect(setup().shallowWrapper).toMatchSnapshot();
  });
});
