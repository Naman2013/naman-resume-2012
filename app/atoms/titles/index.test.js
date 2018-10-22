import React from 'react';
import { shallow } from 'enzyme';
import RubyTitle from './RubyTitle';

describe('RubyTitle', () => {
  const shallowWrapper = shallow(<RubyTitle text="Test" />);
  it('should render correctly', () => {
    expect(shallowWrapper).toMatchSnapshot();
  });
});
