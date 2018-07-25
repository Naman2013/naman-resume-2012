import React from 'react';
import { shallow } from 'enzyme';
import TopicHeading from './TopicHeading';

describe('TopicHeading', () => {
  const shallowWrapper = shallow(<TopicHeading text="Foo" />);
  it('should render correctly', () => {
    expect(shallowWrapper).toMatchSnapshot();
  });
});
