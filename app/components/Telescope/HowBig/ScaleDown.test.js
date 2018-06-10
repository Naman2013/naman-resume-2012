import React from 'react';
import { shallow } from 'enzyme';
import ScaleDown from './ScaleDown';

describe('ScaleDown', () => {
  const initialProps = {
    referenceObject: 'SOLAR_SYSTEM',
    targetObjectURL: '',
  };
  const scaleDown = shallow(<ScaleDown />);
  it('should render correctly', () => {
    expect(scaleDown).toMatchSnapshot();
  });

  describe('when provided a target domain/reference', () => {
    it('will render the appropriate domain/reference', () => {

    });
  });
});
