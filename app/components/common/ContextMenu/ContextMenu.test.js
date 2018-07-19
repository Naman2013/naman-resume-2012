import React from 'react';
import { shallow } from 'enzyme';
import ContextMenu from './ContextMenu';

describe('ContextMenu', () => {
  const shallowWrapper = shallow(<ContextMenu />);
  it('should render correctly', () => {
    expect(shallowWrapper).toMatchSnapshot();
  });
});
