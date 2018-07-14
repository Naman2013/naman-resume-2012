import React from 'react';
import { shallow } from 'enzyme';
import LailaTile from './LailaTile';

describe('LailaTile', () => {
  const props = { title: 'Test', iconURL: 'https://vega.slooh.com/icons/home/jupiter-icon.png' };
  const shallowWrapper = shallow(<LailaTile {...props} />);
  it('should render correctly', () => {
    expect(shallowWrapper).toMatchSnapshot();
  });
});
