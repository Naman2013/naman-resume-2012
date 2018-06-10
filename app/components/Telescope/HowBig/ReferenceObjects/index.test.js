import React from 'react';
import { shallow } from 'enzyme';
import ObjectFrame from './ObjectFrame';

describe('ObjectFrame', () => {
  const defaultProps = { svgURL: 'https://vega.slooh.com/icons/community/science_log.svg' };
  const objectFrame = shallow(<ObjectFrame {...defaultProps} />);
  it('should render correctly', () => {
    expect(objectFrame).toMatchSnapshot();
  });
});
