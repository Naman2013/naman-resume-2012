import React from 'react';
import { shallow } from 'enzyme';
import HorizontalScrollMenu from './HorizontalScrollMenu';

describe('HorizontalScrollMenu', () => {
  const wrapper = shallow(<HorizontalScrollMenu />);
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
