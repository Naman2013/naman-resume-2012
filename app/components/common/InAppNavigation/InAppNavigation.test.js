import React from 'react';
import { shallow } from 'enzyme';
import InAppNavigation from './InAppNavigation';

describe('InAppNavigation', () => {
  const shallowWrapper = shallow(<InAppNavigation />);
  it('should render correctly', () => {
    expect(shallowWrapper).toMatchSnapshot();
  });

  it('should render previous page name when provided', () => {
    shallowWrapper.setProps({ previousText: 'guide' });
    expect(shallowWrapper.find('.back-text').text()).toBe('back to guide');
  });

  it('should render back as the text in the back button when no back page is provided', () => {
    shallowWrapper.setProps({ previousText: '' });
    expect(shallowWrapper.find('.back-text').text()).toBe('back');
  });
});
