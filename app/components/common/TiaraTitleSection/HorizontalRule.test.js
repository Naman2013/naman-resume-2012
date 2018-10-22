import React from 'react';
import { shallow } from 'enzyme';
import HorizontalRule from './HorizontalRule';

const setup = () => {
  const shallowWrapper = shallow(<HorizontalRule theme={{ borderTop: '1px' }} />);
  return {
    shallowWrapper,
  };
};

describe('HorizontalRule', () => {
  it('should render correctly', () => {
    expect(setup().shallowWrapper).toMatchSnapshot();
  });
});
