import React from 'react';
import { shallow } from 'enzyme';
import QuestDetailsTitleSection from './title-section';

const setup = (customProps = {}) => {
  const defaultProps = { preTitle: 'Test', title: 'Test', iconURL: 'foo.com' };
  const props = Object.assign({}, defaultProps, customProps);
  const shallowWrapper = shallow(<QuestDetailsTitleSection {...props} />);

  return {
    shallowWrapper,
  };
};

describe('QuestDetailsTitleSection', () => {
  const defaultProps = {
    iconURL: 'foo.com',
    preTitle: 'A guide to',
    title: 'The solar system',
  };

  it('should render correctly', () => {
    expect(setup(defaultProps).shallowWrapper).toMatchSnapshot();
  });
});
