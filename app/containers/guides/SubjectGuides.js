import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Request from 'app/components/common/network/Request';
import TiaraTitleSection from 'app/components/common/TiaraTitleSection';
import CenterColumn from 'app/components/common/CenterColumn';
import GuideSection from 'app/components/guides/GuideSection';
import GuideBodyContent from 'app/components/guides/GuideBodyContent';
import GuideContentList from 'app/components/guides/GuideContentList';
import SubjectGuideList from 'app/components/guides/SubjectGuideList';
import SterlingTitle from 'app/components/common/titles/SterlingTitle';
import GuidePanels from 'app/components/guides/GuidePanels';
import { GUIDE_ENDPOINT_URL } from 'app/services/guides/guide-data';
import { validateResponseAccess } from 'app/modules/authorization/actions';
import messages from './SubjectGuides.messages';

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
          showShareButton={resp.showGoogleClassroomShareIcon}
          topicActionProps={{
            followButtonIconURL: resp.promptIconUrl,
            followButtonText: resp.readingListPrompt,
            showActions: resp.toggleReadingListFlag,
            readingListType: resp.readingListType,
          }}
          guideId={guideId}
        />
      ),
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
            showActions: resp.toggleReadingListFlag,
            readingListType: resp.readingListType,
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
      list:
        resp.myTopicsNavigationInfo &&
        resp.myTopicsNavigationInfo.topicsList.map(
          ({ topicHeading, topicTitle, link }) => ({
            link,
            title: topicTitle,
            anchorText: topicHeading,
          })
        ),
    },
  }),
};

const SubjectGuides = ({ params: { guideId } }) => (
  <div className="lightgray-background">
    <Request
      serviceURL={GUIDE_ENDPOINT_URL}
      model={subjectGuideModel}
      requestBody={{ guideId }}
      validateResponseAccess={validateResponseAccess}
      render={({
        fetchingContent,
        modeledResponses: { SUBJECT_GUIDE_MODEL },
      }) => (
        <Fragment>
          {!fetchingContent && (
            <Fragment>
              <TiaraTitleSection
                {...SUBJECT_GUIDE_MODEL.tiaraTitleSectionProps}
              />

              <CenterColumn
                theme={{
                  boxShadow: 'rgba(65, 86, 113, 0.2) 0px 3px 8px 1px',
                  marginBottom: '60px',
                }}
              >
                <GuideSection
                  {...SUBJECT_GUIDE_MODEL.guideSectionProps}
                  guideId={guideId}
                />
              </CenterColumn>
              <GuidePanels guideId={guideId} />

              {Array.isArray(SUBJECT_GUIDE_MODEL.subjectGuideListProps.list) &&
                SUBJECT_GUIDE_MODEL.subjectGuideListProps.list.length > 0 && (
                  <SterlingTitle {...SUBJECT_GUIDE_MODEL.sterlingTitleProps} />
                )}

              <CenterColumn>
                <SubjectGuideList
                  {...SUBJECT_GUIDE_MODEL.subjectGuideListProps}
                />
              </CenterColumn>
            </Fragment>
          )}
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
