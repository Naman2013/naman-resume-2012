import React, { Fragment } from 'react';
import Request from 'components/common/network/Request';
import TiaraTitleSection from 'components/common/TiaraTitleSection';
import CenterColumn from 'components/common/CenterColumn';
import GuideSection from 'components/guides/GuideSection';
import GuideBodyContent from 'components/guides/GuideBodyContent';
import GuideContentList from 'components/guides/GuideContentList';
import SubjectGuideList from 'components/guides/SubjectGuideList';
import SterlingTitle from 'components/common/titles/SterlingTitle';
import { GUIDE_ENDPOINT_URL } from 'services/guides/guide-data';

const bodyContent = `Mauris non tempor quam, et lacinia sapien. Mauris accumsan eros eget libero lorem posuere vulputate. Etiam elit elit, elementum sed varius at, adipiscing evitae est. Sed nec felis loren posuere posuere, rutrum eu ipsum. Aliquam eget odio sed ligula dolae iaculis consequat at eget orci. Mauris moleistie sit amet metus loi mass imattis varius Donec sit amet ligula eget nisi sodales lorem a molestie bibendum. Etiam nisi anteni consectetur eget placerat a, tempus a neque. Donec ut elit urna. Etiam venenatis leni eleifend urna eget scelerisqueliquam in nunc.

Donec sit amet ligula eget nisi sodales egestas. Aliquam interdum dolor aliquet dolor  iaculis consequat at eget orci. Mauris moleistie sit amet metus loi mass imattis varius Donec sit amet ligula eget nisi sodales lorem a molestie bibendum. Etiam nisi anteni
posuere vulputate. Etiam elit elit, elementum sed varius at.`;

const subjectGuideModel = {
  name: 'SUBJECT_GUIDE_MODEL',
  model: resp => ({
    tiaraTitleSectionProps: {
      preTitle: resp.guideHeader,
      title: resp.guideReferenceTitle,
      iconURL: resp.guideIconURL,
    },
    guideSectionProps: {
      content: () => <GuideBodyContent title="About this guide" content={bodyContent} />,
      column: () => (
        <GuideContentList
          list={[
            resp.guideBulletPoint1,
            resp.guideBulletPoint2,
            resp.guideBulletPoint3,
          ]}
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

const SubjectGuides = () => (
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
                <TiaraTitleSection {...SUBJECT_GUIDE_MODEL.tiaraTitleSectionProps} />

                <CenterColumn theme={{ boxShadow: 'rgba(65, 86, 113, 0.2) 0px 3px 8px 1px', marginBottom: '60px' }}>
                  <GuideSection {...SUBJECT_GUIDE_MODEL.guideSectionProps} />
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

export default SubjectGuides;
