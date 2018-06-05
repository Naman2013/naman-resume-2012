import React from 'react';
import { mount } from 'enzyme';
import Earth from './Earth';

describe('Earth', () => {
  const earth = mount(<Earth x={20} y={20} r={100} />);
  it('should render correctly', () => {
    expect(earth).toMatchSnapshot();
  });

  it('sets `x` `y` `r` props', () => {
    expect(earth.props().x).toBe(20);
    expect(earth.props().y).toBe(20);
    expect(earth.props().r).toBe(100);
  });
});
