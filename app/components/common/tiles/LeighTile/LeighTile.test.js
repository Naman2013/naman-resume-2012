import React from 'react';
import { shallow } from 'enzyme';
import LeighTile from './LeighTile';

describe('LeighTile', () => {
  const mockCreateLink = jest.fn();
  const shallowWrapper = shallow(<LeighTile title="Foo" anchorText="Topic 1" createLink={mockCreateLink} />);
  it('should render correctly', () => {
    expect(shallowWrapper).toMatchSnapshot();
  });

  it('should call `createLink`', () => {
    expect(mockCreateLink.mock.calls.length).toEqual(1);
  });
});
