import React from 'react';
import { shallow } from 'enzyme';
import AutoFadeSVG from './AutoFadeSVG';

describe('AutoFadeSVG', () => {
  const autoFadeSVG = shallow(<AutoFadeSVG><g className="test-container" /></AutoFadeSVG>);

  it('should render correctly', () => {
    expect(autoFadeSVG).toMatchSnapshot();
  });

  it('should render children', () => {
    expect(autoFadeSVG.find('.test-container').length).toEqual(1);
  });
});
