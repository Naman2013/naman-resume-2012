import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Request from 'components/common/network/Request';
import InAppNavigation from 'components/common/InAppNavigation';
import TopicContent from 'components/guides/TopicContent';
import GuidePanels from 'components/guides/GuidePanels';
import SubPageNavigation from 'components/common/sub-page-navigation';
import { GUIDE_ENDPOINT_URL } from 'services/guides/guide-data';

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
    subPageNavigationProps: {
      items: [{ title: 'Example title', link: '#' }, { title: 'Example title', link: '#' }, { title: 'Example title', link: '#' }],
    },
    topicContentProps: {
      title: resp.guideTitle,
      topicContentList: [resp.guideBulletPoint1, resp.guideBulletPoint2, resp.guideBulletPoint3],
      aboutTitle: resp.AboutThisTitle,
      aboutContent: resp.AboutThisContent,
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

                <SubPageNavigation {...SUBJECT_GUIDE_MODEL.subPageNavigationProps} />

                <TopicContent {...SUBJECT_GUIDE_MODEL.topicContentProps} />

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
