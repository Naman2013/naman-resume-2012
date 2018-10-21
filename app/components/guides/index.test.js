import React from 'react';
import { shallow } from 'enzyme';
import FeaturedGallery from './FeaturedGallery';
import GuideBodyContent from './GuideBodyContent';
import GuideTopics from './GuideTopics';
import SubjectGuideList from './SubjectGuideList';
import TopicBodyContent from './TopicBodyContent';
import TopicContent from './TopicContent';
import TopicHeading from './TopicHeading';
import TopicList from './TopicList';
import { SAMPLE_IMAGE_HTML_BLOB, SAMPLE_VIDEO_HTML_BLOB } from '../../../stories/content/getGuidesPanels';

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
  const shallowWrapper = shallow(<TopicBodyContent
    topicActionProps={{
      followButtonText: 'test',
      followButtonIconURL: '',
      showActions: true,
    }}
    title="Test"
    content="Some sample content"
    guideID="37"
  />);
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

describe('TopicList', () => {
  const TEST_PANEL_LIST = [
    {
      guidePanelId: '12345',
      displayOrder: '10',
      title: 'Not a real title',
      authorName: 'Made Up Dude',
      readDuration: '10',
      content: SAMPLE_VIDEO_HTML_BLOB,
    },
    {
      guidePanelId: '3232',
      displayOrder: '2',
      title: 'Not a real title',
      authorName: 'Made Up Dude',
      readDuration: '10',
      content: SAMPLE_IMAGE_HTML_BLOB,
    },
  ];
  const shallowWrapper = shallow(<TopicList
    list={TEST_PANEL_LIST}
    topicActionProps={{
      followButtonText: 'Test',
      followButtonIconURL: '',
      showActions: true,
    }}
    guideID="37"
  />);
  it('should render correctly', () => {
    expect(shallowWrapper).toMatchSnapshot();
  });

  it('renders BobbieTiles for each topic presented', () => {
    expect(shallowWrapper.find('BobbieTile').length).toEqual(2);
  });
});
