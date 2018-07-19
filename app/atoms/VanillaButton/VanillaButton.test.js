import React from 'react';
import { shallow } from 'enzyme';
import VanillaButton from './VanillaButton';

describe('VanillaButton', () => {
  const shallowWrapper = shallow(<VanillaButton />);
  it('should render correctly', () => {
    expect(shallowWrapper).toMatchSnapshot();
  });
});
