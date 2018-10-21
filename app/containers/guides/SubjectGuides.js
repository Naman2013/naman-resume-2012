import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Request from 'components/common/network/Request';
import TiaraTitleSection from 'components/common/TiaraTitleSection';
import CenterColumn from 'components/common/CenterColumn';
import GuideSection from 'components/guides/GuideSection';
import GuideBodyContent from 'components/guides/GuideBodyContent';
import GuideContentList from 'components/guides/GuideContentList';
import SubjectGuideList from 'components/guides/SubjectGuideList';
import SterlingTitle from 'components/common/titles/SterlingTitle';
import { GUIDE_ENDPOINT_URL } from 'services/guides/guide-data';

const subjectGuideModel = {
  name: 'SUBJECT_GUIDE_MODEL',
  model: resp => ({
    tiaraTitleSectionProps: {
      preTitle: resp.guideHeader,
      title: resp.guideReferenceTitle,
      iconURL: resp.guideIconURL,
    },
    guideSectionProps: {
      content: ({ guideId }) => (
        <GuideBodyContent
          title={resp.AboutThisTitle}
          content={resp.AboutThisContent}
          topicActionProps={{
            followButtonIconURL: resp.promptIconUrl,
            followButtonText: resp.readingListPrompt,
          }}
          guideId={guideId}
        />),
      column: ({ guideId }) => (
        <GuideContentList
          list={[
            resp.guideBulletPoint1,
            resp.guideBulletPoint2,
            resp.guideBulletPoint3,
          ]}
          topicActionProps={{
            followButtonIconURL: resp.promptIconUrl,
            followButtonText: resp.readingListPrompt,
          }}
          guideId={guideId}
        />
      ),
      alignContent: 'right',
    },
    sterlingTitleProps: {
      title: 'Topics within this guide',
      subTitle: 'Select a Topic for more information',
    },
    subjectGuideListProps: {
      list: resp.myTopicsNavigationInfo.topicsList.map(({ topicHeading, topicTitle, link }) => ({
        link,
        title: topicHeading,
        anchorText: topicTitle,
      })),
    },
  }),
};

const SubjectGuides = ({ params: { guideId } }) => (
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
                <TiaraTitleSection {...SUBJECT_GUIDE_MODEL.tiaraTitleSectionProps} />

                <CenterColumn theme={{ boxShadow: 'rgba(65, 86, 113, 0.2) 0px 3px 8px 1px', marginBottom: '60px' }}>
                  <GuideSection {...SUBJECT_GUIDE_MODEL.guideSectionProps} guideId={guideId} />
                </CenterColumn>

                <SterlingTitle {...SUBJECT_GUIDE_MODEL.sterlingTitleProps} />

                <CenterColumn>
                  <SubjectGuideList {...SUBJECT_GUIDE_MODEL.subjectGuideListProps} />
                </CenterColumn>
              </Fragment>
          }
        </Fragment>
      )}
    />
  </div>
);

SubjectGuides.propTypes = {
  params: PropTypes.shape({
    guideId: PropTypes.string.isRequired,
  }).isRequired,
};

export default SubjectGuides;
