import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Request from 'components/common/network/Request';
import CenterColumn from 'components/common/CenterColumn';
import TiaraTitleSection from 'components/common/TiaraTitleSection';
import GuideSection from 'components/guides/GuideSection';
import GuideBodyContent from 'components/guides/GuideBodyContent';
import GuideContentList from 'components/guides/GuideContentList';
import FeaturedGallery from 'components/guides/FeaturedGallery';
import SterlingTitle from 'components/common/titles/SterlingTitle';
import GuideTopics from 'components/guides/GuideTopics';
import { GUIDE_ENDPOINT_URL } from 'services/guides/guide-data';

const bodyContent = `Mauris non tempor quam, et lacinia sapien. Mauris accumsan eros eget libero lorem posuere vulputate. Etiam elit elit, elementum sed varius at, adipiscing evitae est. Sed nec felis loren posuere posuere, rutrum eu ipsum. Aliquam eget odio sed ligula dolae iaculis consequat at eget orci. Mauris moleistie sit amet metus loi mass imattis varius Donec sit amet ligula eget nisi sodales lorem a molestie bibendum. Etiam nisi anteni consectetur eget placerat a, tempus a neque. Donec ut elit urna. Etiam venenatis leni eleifend urna eget scelerisqueliquam in nunc.

Donec sit amet ligula eget nisi sodales egestas. Aliquam interdum dolor aliquet dolor  iaculis consequat at eget orci. Mauris moleistie sit amet metus loi mass imattis varius Donec sit amet ligula eget nisi sodales lorem a molestie bibendum. Etiam nisi anteni
posuere vulputate. Etiam elit elit, elementum sed varius at.`;

const guidePageModel = {
  name: 'GUIDE_PAGE_MODEL',
  model: resp => ({
    tiaraTitleProps: {
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
      title: 'Objects within this guide',
      subTitle: 'Select an Object for more information',
    },
    guideTopicsProps: {
      list: resp.chapterNavigationInfo.chapterList.map(chapter => ({
        title: chapter.guideTitle,
        iconURL: chapter.guideIconURL,
        linkURL: chapter.link,
      })),
    },
  }),
};

const Guides = ({ params: { guideId } }) => (
  <Request
    serviceURL={GUIDE_ENDPOINT_URL}
    model={guidePageModel}
    requestBody={{ guideId }}
    render={({
      fetchingContent,
      modeledResponses: { GUIDE_PAGE_MODEL },
    }) => (
      <div>
        {
          !fetchingContent &&
            <Fragment>
              <TiaraTitleSection {...GUIDE_PAGE_MODEL.tiaraTitleProps} />

              <CenterColumn theme={{ boxShadow: 'rgba(65, 86, 113, 0.2) 0px 3px 8px 1px', marginBottom: '60px' }}>
                <GuideSection {...GUIDE_PAGE_MODEL.guideSectionProps} />
              </CenterColumn>

              <FeaturedGallery />

              <SterlingTitle {...GUIDE_PAGE_MODEL.sterlingTitleProps} />

              <GuideTopics {...GUIDE_PAGE_MODEL.guideTopicsProps} />
            </Fragment>
        }
      </div>
    )}
  />
);

Guides.propTypes = {
  params: PropTypes.shape({
    guideId: PropTypes.string.isRequired,
  }).isRequired,
};

export default Guides;
