import React from 'react';
import { shallow } from 'enzyme';
import LargeScreenTopicContent from './LargeScreenTopicContent';

describe('LargeScreenTopicContent', () => {
  const shallowWrapper = shallow(<LargeScreenTopicContent />);
  it('should render correctly', () => {
    expect(shallowWrapper).toMatchSnapshot();
  });
});
