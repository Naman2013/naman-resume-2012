import React from 'react';
import { shallow } from 'enzyme';
import CenterColumn from './CenterColumn';

describe('CenterColumn', () => {
  const shallowWrapper = shallow(<CenterColumn><div /></CenterColumn>);
  it('should render correctly', () => {
    expect(shallowWrapper).toMatchSnapshot();
  });
});
