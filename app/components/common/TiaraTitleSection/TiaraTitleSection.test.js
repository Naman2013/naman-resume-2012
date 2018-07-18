import React from 'react';
import { shallow } from 'enzyme';
import TiaraTitleSection from './TiaraTitleSection';
import alienHeadIcon from '../../../../assets/icons/alien-head.png';

const setup = (customProps = {}) => {
  const defaultProps = { preTitle: 'Test', title: 'Test', iconURL: 'foo.com' };
  const props = Object.assign({}, defaultProps, customProps);
  const shallowWrapper = shallow(<TiaraTitleSection {...props} />);

  return {
    shallowWrapper,
  };
};

describe('TiaraTitleSection', () => {
  const defaultProps = {
    iconURL: 'foo.com',
    preTitle: 'A guide to',
    title: 'The solar system',
  };

  it('should render correctly', () => {
    expect(setup(defaultProps).shallowWrapper).toMatchSnapshot();
  });
});
