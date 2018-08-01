import React from 'react';
import { shallow } from 'enzyme';
import BobbieTile from './BobbieTile';

describe('BobbieTile', () => {
  const shallowWrapper = shallow(<BobbieTile
    title="Check out this tutorial"
    HTMLBlob="<h1>Hello world...</h1>"
    readDuration="30"
    authorName="Paul Cox"
  />);
  it('should render correctly', () => {
    expect(shallowWrapper).toMatchSnapshot();
  });
});
