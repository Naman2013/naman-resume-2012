import React from 'react';
import { shallow } from 'enzyme';
import TopicContent from './TopicContent';

describe('TopicContent', () => {
  const shallowWrapper = shallow(<TopicContent />);
  it('should render correctly', () => {
    expect(shallowWrapper).toMatchSnapshot();
  });
});
