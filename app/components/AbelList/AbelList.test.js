import React from 'react';
import { shallow } from 'enzyme';
import AbelList from './';

describe('AbelList', () => {
  const sampleList = ['Contains 10 objects', 'category guide', 'beginners and up'];
  const shallowWrapper = shallow(<AbelList list={sampleList} />);

  it('should render correctly', () => {
    expect(shallowWrapper).toMatchSnapshot();
  });
});
