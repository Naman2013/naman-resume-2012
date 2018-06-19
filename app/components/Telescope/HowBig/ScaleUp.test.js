import React from 'react';
import { shallow } from 'enzyme';
import ScaleUp from './ScaleUp';
import fauxMissions from 'content/fauxMissions';

const setup = (customProps) => {
  const props = Object.assign({}, fauxMissions.scaleUp, customProps);
  const wrapper = shallow(<ScaleUp {...props} />);

  return {
    wrapper,
  };
};

describe('ScaleUp', () => {
  it('should render correctly', () => {
    expect(setup().wrapper).toMatchSnapshot();
  });
});
