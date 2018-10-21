import React from 'react';
import { shallow } from 'enzyme';
import DisplayAtBreakpoint from './DisplayAtBreakpoint';

describe('DisplayAtBreakpoint', () => {
  const wrapper = shallow(<DisplayAtBreakpoint><div /></DisplayAtBreakpoint>);
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
