import React from 'react';
import { shallow } from 'enzyme';
import Earth from './Earth';
import MilkyWay from './MilkyWay';
import SolarSystem from './SolarSystem';
import Sun from './Sun';

describe('Earth', () => {
  const earth = shallow(<Earth x={20} y={20} />);
  it('should render correctly', () => {
    expect(earth).toMatchSnapshot();
  });
});

describe('MilkyWay', () => {
  const milkyWay = shallow(<MilkyWay />);
  it('should render correctly', () => {
    expect(milkyWay).toMatchSnapshot();
  });
});

describe('SolarSystem', () => {
  const solarSystem = shallow(<SolarSystem />);
  it('should render correctly', () => {
    expect(solarSystem).toMatchSnapshot();
  });
});

describe('Sun', () => {
  const sun = shallow(<Sun />);
  it('should render correctly', () => {
    expect(sun).toMatchSnapshot();
  });
});
