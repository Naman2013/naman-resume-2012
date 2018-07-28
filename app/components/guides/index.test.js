import React from 'react';
import { shallow } from 'enzyme';
import FeaturedGallery from './FeaturedGallery';
import GuideBodyContent from './GuideBodyContent';
import GuideTopics from './GuideTopics';
import SubjectGuideList from './SubjectGuideList';
import TopicBodyContent from './TopicBodyContent';
import TopicContent from './TopicContent';
import TopicHeading from './TopicHeading';

describe('FeaturedGallery', () => {
  const props = {
    items: [],
  };
  const shallowWrapper = shallow(<FeaturedGallery {...props} />);
  it('should render correctly', () => {
    expect(shallowWrapper).toMatchSnapshot();
  });
});

describe('GuideBodyContent', () => {
  const stubContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
  const shallowWrapper = shallow(<GuideBodyContent content={stubContent} />);
  it('should render correctly', () => {
    expect(shallowWrapper).toMatchSnapshot();
  });
});

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

describe('SubjectGuideList', () => {
  const mockList = [{ title: 'Foo', anchorText: 'Bar', link: '#' }, { title: 'Foo', anchorText: 'Bar', link: '#' }];
  const shallowWrapper = shallow(<SubjectGuideList list={mockList} />);

  it('should render correctly', () => {
    expect(shallowWrapper).toMatchSnapshot();
  });

  it('should paint `LeighTile` for each item provided in the list', () => {
    expect(shallowWrapper.find('LeighTile').length).toEqual(mockList.length);
  });
});

describe('TopicBodyContent', () => {
  const shallowWrapper = shallow(<TopicBodyContent title="Test" content="Some sample content" />);
  it('should render correctly', () => {
    expect(shallowWrapper).toMatchSnapshot();
  });
});

describe('TopicContent', () => {
  const shallowWrapper = shallow(<TopicContent />);
  it('should render correctly', () => {
    expect(shallowWrapper).toMatchSnapshot();
  });
});

describe('TopicHeading', () => {
  const shallowWrapper = shallow(<TopicHeading text="Foo" />);
  it('should render correctly', () => {
    expect(shallowWrapper).toMatchSnapshot();
  });
});
