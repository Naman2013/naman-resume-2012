import React from 'react';
import { shallow } from 'enzyme';
import ContextMenu from './ContextMenu';

describe('ContextMenu', () => {
  const shallowWrapper = shallow(<ContextMenu />);
  it('should render correctly', () => {
    expect(shallowWrapper).toMatchSnapshot();
  });

  describe('clicking the menu button', () => {
    it('initializes with `isOpen` to `false`', () => {
      expect(shallowWrapper.state('isOpen')).toEqual(false);
    });

    it('first click of menu button will toggle `isOpen` to `true`', () => {
      shallowWrapper.find('VanillaButton').dive().find('button').simulate('click');
      expect(shallowWrapper.state('isOpen')).toEqual(true);
    });

    it('second click of menu will toggle `isOpen` back to `false`', () => {
      shallowWrapper.find('VanillaButton').dive().find('button').simulate('click');
      expect(shallowWrapper.state('isOpen')).toEqual(false);
    });
  });
});
