import React from 'react';
import { mount } from 'enzyme';
import Earth from './Earth';

describe('Earth', () => {
  const earth = mount(<Earth x={20} y={20} r={100} />);
  it('should render correctly', () => {
    expect(earth).toMatchSnapshot();
  });
});
