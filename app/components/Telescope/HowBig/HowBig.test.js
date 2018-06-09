import React from 'react';
import { shallow } from 'enzyme';
import HowBig from './HowBig';

describe('HowBig', () => {
  const howBig = shallow(<HowBig dimension={100} />);

  it('should render correctly', () => {
    expect(howBig).toMatchSnapshot();
  });
});
