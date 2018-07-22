import React from 'react';
import { shallow } from 'enzyme';
import InAppNavigation from './InAppNavigation';

describe('InAppNavigation', () => {
  const props = { previousText: 'guide', title: 'topic 1: stuff...' };
  const shallowWrapper = shallow(<InAppNavigation {...props} />);

  it('should render correctly', () => {
    expect(shallowWrapper).toMatchSnapshot();
  });

  it('should render "back to pageName" when `previousText` is provided', () => {
    expect(shallowWrapper.find('.back-text').text()).toBe('back to guide');
  });

  it('should render "back" as the text in the back button when no back page is provided', () => {
    shallowWrapper.setProps({ previousText: '' });
    expect(shallowWrapper.find('.back-text').text()).toBe('back');
  });

  it('displays the page title', () => {
    expect(shallowWrapper.find('.title').text()).toBe(props.title);
  });
});
