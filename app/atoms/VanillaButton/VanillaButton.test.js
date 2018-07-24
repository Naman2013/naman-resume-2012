import React from 'react';
import { shallow } from 'enzyme';
import VanillaButton from './VanillaButton';

describe('VanillaButton', () => {
  const mockHandleClick = jest.fn();
  const shallowWrapper = shallow(<VanillaButton handleClick={mockHandleClick}><div /></VanillaButton>);
  it('should render correctly', () => {
    expect(shallowWrapper).toMatchSnapshot();
  });

  describe('when clicked', () => {
    shallowWrapper.find('button').simulate('click');
    expect(mockHandleClick.mock.calls.length).toEqual(1);
  });
});
