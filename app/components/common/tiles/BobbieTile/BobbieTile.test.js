import React from 'react';
import { shallow } from 'enzyme';
import BobbieTile from './BobbieTile';

describe('BobbieTile', () => {
  const shallowWrapper = shallow(<BobbieTile />);
  it('should render correctly', () => {
    expect(shallowWrapper).toMatchSnapshot();
  });
});
