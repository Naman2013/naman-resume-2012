import React from 'react';
import { shallow } from 'enzyme';
import BobbieTile from './BobbieTile';

describe('BobbieTile', () => {
  const shallowWrapper = shallow(<BobbieTile HTMLBlob="<h1>Hello world...</h1>" />);
  it('should render correctly', () => {
    expect(shallowWrapper).toMatchSnapshot();
  });
});
