import React, { Fragment } from 'react';
import Request from 'components/common/network/Request';
import InAppNavigation from 'components/common/InAppNavigation';
import TopicContent from 'components/guides/TopicContent';
import SterlingTitle from 'components/common/titles/SterlingTitle';
import TopicList from 'components/guides/TopicList';
import { GUIDE_ENDPOINT_URL } from 'services/guides/guide-data';
import { SAMPLE_IMAGE_HTML_BLOB, SAMPLE_VIDEO_HTML_BLOB } from '../../../stories/content/getGuidesPanels';

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

const subjectGuideModel = {
  name: 'SUBJECT_GUIDE_MODEL',
  model: resp => ({
    inAppNavigationProps: {
      title: 'Topic 1: Astronomical Time',
    },
    topicContentProps: {
      title: resp.guideTitle,
      topicContentList: [resp.guideBulletPoint1, resp.guideBulletPoint2, resp.guideBulletPoint3],
      aboutTitle: 'Stand in title',
      aboutContent: `Mauris non tempor quam, et lacinia sapien. Mauris accumsan eros eget libero lorem posuere vulputate. Etiam elit elit, elementum sed varius at, adipiscing evitae est. Sed nec felis loren posuere posuere, rutrum eu ipsum. Aliquam eget odio sed ligula dolae iaculis consequat at eget orci. Mauris moleistie sit amet metus loi mass imattis varius Donec sit amet ligula eget nisi sodales lorem a molestie bibendum. Etiam nisi anteni consectetur eget placerat a, tempus a neque. Donec ut elit urna. Etiam venenatis leni eleifend urna eget scelerisqueliquam in nunc.

      Donec sit amet ligula eget nisi sodales egestas. Aliquam interdum dolor aliquet dolor  iaculis consequat at eget orci. Mauris moleistie sit amet metus loi mass imattis varius Donec sit amet ligula eget nisi sodales lorem a molestie bibendum. Etiam nisi anteni
      posuere vulputate. Etiam elit elit, elementum sed varius at.`,
    },
    sterlingTitleProps: {
      title: 'Title stub...',
      subTitle: 'Sub title stub...',
    },
    topicListProps: {
      list: TEST_PANEL_LIST,
    },
  }),
};

const TopicGuides = () => (
  <div>
    <Request
      serviceURL={GUIDE_ENDPOINT_URL}
      model={subjectGuideModel}
      requestBody={{ guideId: 39 }}
      render={({
        fetchingContent,
        modeledResponses: { SUBJECT_GUIDE_MODEL },
      }) => (
        <Fragment>
          {
            !fetchingContent &&
              <Fragment>
                <InAppNavigation
                  menuTopAdjustment={162}
                  {...SUBJECT_GUIDE_MODEL.inAppNavigationProps}
                />
                <div
                  style={{
                    backgroundColor: 'aqua',
                    textAlign: 'center',
                    color: 'white',
                    padding: '20px 0',
                  }}
                >
                  TODO - ADD HEADER FROM MATT
                </div>
                <TopicContent {...SUBJECT_GUIDE_MODEL.topicContentProps} />
                <SterlingTitle {...SUBJECT_GUIDE_MODEL.sterlingTitleProps} />
                <TopicList {...SUBJECT_GUIDE_MODEL.topicListProps} />
              </Fragment>
          }
        </Fragment>
      )}
    />
  </div>
);

export default TopicGuides;
