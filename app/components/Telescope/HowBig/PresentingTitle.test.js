import React from 'react';
import { shallow } from 'enzyme';
import PresentingTitle from './PresentingTitle';

describe('PresentingTitle', () => {
  it('should render correctly', () => {
    const presentingTitle = shallow(<PresentingTitle dimension={100} />);
    expect(presentingTitle).toMatchSnapshot();
  });
});
