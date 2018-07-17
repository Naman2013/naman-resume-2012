import React from 'react';
import { shallow } from 'enzyme';
import LeighTile from './LeighTile';

describe('LeighTile', () => {
  const shallowWrapper = shallow(<LeighTile title="Foo" anchorText="Topic 1" />);
  it('should render correctly', () => {
    expect(shallowWrapper).toMatchSnapshot();
  });
});
