import React from 'react';
import { shallow } from 'enzyme';
import SubjectGuideList from './SubjectGuideList';

describe('SubjectGuideList', () => {
  const createLink = jest.fn();
  const mockList = [{ title: 'Foo', anchorText: 'Bar', createLink }, { title: 'Foo', anchorText: 'Bar', createLink }];
  const shallowWrapper = shallow(<SubjectGuideList list={mockList} />);

  it('should render correctly', () => {
    expect(shallowWrapper).toMatchSnapshot();
  });

  it('should paint `LeighTile` for each item provided in the list', () => {
    expect(shallowWrapper.find('LeighTile').length).toEqual(mockList.length);
  });
});
