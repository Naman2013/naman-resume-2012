import React from 'react';
import { shallow } from 'enzyme';
import HorizontalList from './HorizontalList';

describe('HorizontalList', () => {
  const list = ['foo', 'bar'];
  const shallowWrapper = shallow(<HorizontalList list={list} />);
  it('should render correctly', () => {
    expect(shallowWrapper).toMatchSnapshot();
  });
});
