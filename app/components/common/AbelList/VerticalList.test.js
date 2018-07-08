import React from 'react';
import { shallow } from 'enzyme';
import VerticalList from './VerticalList';

describe('VerticalList', () => {
  const sampleList = ['foo', 'bar', 'baz'];
  const shallowWrapper = shallow(<VerticalList list={sampleList} />);
  it('should render correctly', () => {
    expect(shallowWrapper).toMatchSnapshot();
  });
});
