import React from 'react';
import { shallow } from 'enzyme';
import ScaleDown from './ScaleDown';

describe('ScaleUp', () => {
  it('should render correctly', () => {
    const scaleDown = shallow(<ScaleDown />);
    expect(scaleDown).toMatchSnapshot();
  });
});
