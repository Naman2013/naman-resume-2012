import React from 'react';
import { shallow } from 'enzyme';
import LailaTile from './LailaTile';

describe('LailaTile', () => {
  const shallowWrapper = shallow(<LailaTile />);
  it('should render correctly', () => {
    expect(shallowWrapper).toMatchSnapshot();
  });
});
