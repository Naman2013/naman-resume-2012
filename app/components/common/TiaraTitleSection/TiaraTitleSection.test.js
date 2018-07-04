import React from 'react';
import { shallow } from 'enzyme';
import TiaraTitleSection from './TiaraTitleSection';
import alienHeadIcon from '../../../../assets/icons/alien-head.png';

const setup = (customProps = {}) => {
  const props = Object.assign({}, customProps);
  const shallowWrapper = shallow(<TiaraTitleSection {...props} />);

  return {
    shallowWrapper,
  };
};

describe('TiaraTitleSection', () => {
  const defaultProps = {
    iconURL: alienHeadIcon,
    preTitle: 'A guide to',
    title: 'The solar system',
  };

  it('should render correctly', () => {
    expect(setup(defaultProps).shallowWrapper).toMatchSnapshot();
  });
});
