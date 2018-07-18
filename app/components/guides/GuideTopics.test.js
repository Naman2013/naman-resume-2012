import React from 'react';
import { shallow } from 'enzyme';
import GuideTopics from './GuideTopics';

describe('GuideTopics', () => {
  const props = { list: [{ title: 'Saturn', iconURL: 'https://vega.slooh.com/icons/home/observatory.png' }, { title: 'Mars', iconURL: 'https://vega.slooh.com/icons/home/jupiter-icon.png' }] };
  const shallowWrapper = shallow(<GuideTopics {...props} />);
  it('should render correctly', () => {
    expect(shallowWrapper).toMatchSnapshot();
  });

  it('renders a list of `<LailaTile />`s', () => {
    expect(shallowWrapper.find('LailaTile').length).toEqual(props.list.length);
  });
});
