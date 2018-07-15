import React from 'react';
import { shallow } from 'enzyme';
import FeaturedGallery from './FeaturedGallery';

describe('FeaturedGallery', () => {
  const props = {
    items: [],
  };
  const shallowWrapper = shallow(<FeaturedGallery {...props} />);
  it('should render correctly', () => {
    expect(shallowWrapper).toMatchSnapshot();
  });

  it('should render a `SterlingTitle`', () => {
    expect(shallowWrapper.find('SterlingTitle').length).toEqual(1);
  });
});
