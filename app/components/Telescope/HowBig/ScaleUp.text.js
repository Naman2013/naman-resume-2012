import React from 'react';
import { shallow } from 'enzyme';
import ScaleUp from './ScaleUp';

describe('ScaleUp', () => {
  it('should render correctly', () => {
    const scaleUp = shallow(<ScaleUp />);
    expect(scaleUp).toMatchSnapshot();
  });
});
