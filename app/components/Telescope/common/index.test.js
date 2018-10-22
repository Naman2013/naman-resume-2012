import React from 'react';
import { shallow } from 'enzyme';
import SVGText from './SVGText';

describe('SVGText', () => {
  it('should render correctly', () => {
    const displayProperties = {
      fill: 'aqua',
      fontFamily: 'helvetica',
      fontSize: '20px',
    };
    const svgText = shallow(<SVGText text="This is a test..." x={100} y={100} displayProperties={displayProperties} />);
    expect(svgText).toMatchSnapshot();
  });
});
