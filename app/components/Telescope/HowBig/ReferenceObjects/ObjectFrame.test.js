import React from 'react';
import { shallow } from 'enzyme';
import ObjectFrame from './ObjectFrame';

describe('ObjectFrame', () => {
  const defaultProps = {
    svgURL: 'https://vega.slooh.com/icons/community/science_log.svg',
    onLoadCallback: jest.fn(),
  };
  const objectFrame = shallow(<ObjectFrame {...defaultProps} />);
  it('should render correctly', () => {
    expect(objectFrame).toMatchSnapshot();
  });

  describe('when it loads an image', () => {
    it('calls the provided onLoad callback when an image has finished loading', () => {
      objectFrame.find('.object-frame-image').simulate('load');
      expect(defaultProps.onLoadCallback).toHaveBeenCalled();
    });
  });
});
