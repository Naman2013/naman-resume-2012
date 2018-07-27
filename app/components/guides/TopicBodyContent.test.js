import React from 'react';
import { shallow } from 'enzyme';
import TopicBodyContent from './TopicBodyContent';

describe('TopicBodyContent', () => {
  const shallowWrapper = shallow(<TopicBodyContent />);
  it('should render correctly', () => {
    expect(shallowWrapper).toMatchSnapshot();
  });
});
