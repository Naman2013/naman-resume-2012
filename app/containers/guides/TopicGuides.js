import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
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
      title: resp.guideTitle,
      contextMenuTitle: resp.topicHeading1,
      contextMenuCount: resp.chapterNavigationInfo.chapterCount,
      list: resp
        .chapterNavigationInfo
        .chapterList
        .map(chapter => ({ title: chapter.guideTitle, linkURL: chapter.link })),
    },
    topicContentProps: {
      title: resp.guideTitle,
      topicContentList: [resp.guideBulletPoint1, resp.guideBulletPoint2, resp.guideBulletPoint3],
      aboutTitle: resp.AboutThisTitle,
      aboutContent: resp.AboutThisContent,
    },
    sterlingTitleProps: {
      title: resp.topicHeading1,
      subTitle: resp.topicHeading2,
    },
    topicListProps: {
      list: TEST_PANEL_LIST,
    },
  }),
};

const TopicGuides = ({ params: { guideId } }) => (
  <div>
    <Request
      serviceURL={GUIDE_ENDPOINT_URL}
      model={subjectGuideModel}
      requestBody={{ guideId }}
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

TopicGuides.propTypes = {
  params: {
    guideId: PropTypes.string.isRequired,
  },
};

export default TopicGuides;
