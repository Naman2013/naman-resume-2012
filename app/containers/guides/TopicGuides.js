import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Request from 'app/components/common/network/Request';
import InAppNavigation from 'app/components/common/InAppNavigation';
import TopicContent from 'app/components/guides/TopicContent';
import GuidePanels from 'app/components/guides/GuidePanels';
import { GUIDE_ENDPOINT_URL } from 'app/services/guides/guide-data';

const subjectGuideModel = {
  name: 'SUBJECT_GUIDE_MODEL',
  model: resp => ({
    inAppNavigationProps: {
      title: resp.chapterNavigationInfo.parentInfo.guideTitle,
      contextMenuTitle: resp.topicHeading1,
      contextMenuCount: resp.chapterNavigationInfo.chapterCount,
      list: resp
        .chapterNavigationInfo
        .chapterList
        .map(chapter => ({ title: chapter.guideTitle, linkURL: chapter.link })),
      backLinkURL: resp.chapterNavigationInfo.parentInfo.link,
    },
    topicContentProps: {
      title: resp.guideTitle,
      topicContentList: [resp.guideBulletPoint1, resp.guideBulletPoint2, resp.guideBulletPoint3],
      showContentList: resp.showBulletPoints,
      aboutTitle: resp.AboutThisTitle,
      readingListType: resp.readingListType,
      aboutContent: resp.AboutThisContent || '',
      topicActionProps: {
        followButtonText: resp.readingListPrompt,
        followButtonIconURL: resp.promptIconUrl,
        showActions: resp.toggleReadingListFlag,
      },
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
                  menuTopAdjustment={0}
                  {...SUBJECT_GUIDE_MODEL.inAppNavigationProps}
                />

                <TopicContent
                  {...SUBJECT_GUIDE_MODEL.topicContentProps}
                  guideId={guideId}
                />

                <GuidePanels guideId={guideId} />

              </Fragment>
          }
        </Fragment>
      )}
    />
  </div>
);

TopicGuides.propTypes = {
  params: PropTypes.shape({
    guideId: PropTypes.string.isRequired,
  }).isRequired,
};

export default TopicGuides;
