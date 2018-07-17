import React from 'react';
import { shallow } from 'enzyme';
import InAppNavigation from './InAppNavigation';

describe('InAppNavigation', () => {
  const shallowWrapper = shallow(<InAppNavigation />);
  it('should render correctly', () => {
    expect(shallowWrapper).toMatchSnapshot();
  });
});
