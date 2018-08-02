import React from 'react';
import Request from 'components/common/network/Request';
import CenterColumn from 'components/common/CenterColumn';
import TiaraTitleSection from 'components/common/TiaraTitleSection';
import GuideSection from 'components/guides/GuideSection';
import GuideBodyContent from 'components/guides/GuideBodyContent';
import GuideContentList from 'components/guides/GuideContentList';
import FeaturedGallery from 'components/guides/FeaturedGallery';
import SterlingTitle from 'components/common/titles/SterlingTitle';
import GuideTopics from 'components/guides/GuideTopics';

import { USE_CASE_3 } from 'content/api-page-guide';

const bodyContent = `Mauris non tempor quam, et lacinia sapien. Mauris accumsan eros eget libero lorem posuere vulputate. Etiam elit elit, elementum sed varius at, adipiscing evitae est. Sed nec felis loren posuere posuere, rutrum eu ipsum. Aliquam eget odio sed ligula dolae iaculis consequat at eget orci. Mauris moleistie sit amet metus loi mass imattis varius Donec sit amet ligula eget nisi sodales lorem a molestie bibendum. Etiam nisi anteni consectetur eget placerat a, tempus a neque. Donec ut elit urna. Etiam venenatis leni eleifend urna eget scelerisqueliquam in nunc.

Donec sit amet ligula eget nisi sodales egestas. Aliquam interdum dolor aliquet dolor  iaculis consequat at eget orci. Mauris moleistie sit amet metus loi mass imattis varius Donec sit amet ligula eget nisi sodales lorem a molestie bibendum. Etiam nisi anteni
posuere vulputate. Etiam elit elit, elementum sed varius at.`;

const stubGuideSectionContent = {
  content: () => <GuideBodyContent title="About this guide" content={bodyContent} />,
  column: () => (<GuideContentList list={['contains 10 objects', 'object type guide', 'beginners and up']} />),
  alignContent: 'right',
};

const stubTileList = [
  { title: 'Venus', iconURL: 'https://vega.slooh.com/icons/home/jupiter-icon.png' },
  { title: 'Mars', iconURL: 'https://vega.slooh.com/icons/home/jupiter-icon.png' },
  { title: 'Saturn', iconURL: 'https://vega.slooh.com/icons/home/jupiter-icon.png' },
  { title: 'Jupiter', iconURL: 'https://vega.slooh.com/icons/home/jupiter-icon.png' },
  { title: 'Uranus', iconURL: 'https://vega.slooh.com/icons/home/jupiter-icon.png' },
  { title: 'Neptune', iconURL: 'https://vega.slooh.com/icons/home/jupiter-icon.png' },
];

const guidePageModel = {
  name: 'GUIDE_PAGE_MODEL',
  model: (resp) => {
    return {
      tiaraTitleProps: {
        preTitle: resp.guideHeader,
        title: resp.guideReferenceTitle,
        iconURL: resp.guideIconURL,
      },
      guideSectionProps: {
        content: () => <GuideBodyContent title="About this guide" content={bodyContent} />,
        column: () => (<GuideContentList list={[resp.guideBulletPoint1, resp.guideBulletPoint2, resp.guideBulletPoint3]} />),
        alignContent: 'right',
      },
      sterlingTitleProps: {
        title: 'Objects within this guide',
        subTitle: 'Select an Object for more information',
      },
      guideTopicsProps: {
        list: resp.chapterNavigationInfo.map(chapter => ({
          title: chapter.guideTitle,
          iconURL: chapter.guideIconURL,
          linkURL: chapter.link,
        })),
      },
    };
  },
};

const Guides = () => (
  <div>
    <TiaraTitleSection
      preTitle="A guide to"
      title="The solar system"
      iconURL="https://vega.slooh.com/icons/home/observatory.png"
    />

    <CenterColumn theme={{ boxShadow: 'rgba(65, 86, 113, 0.2) 0px 3px 8px 1px', marginBottom: '60px' }}>
      <GuideSection {...stubGuideSectionContent} />
    </CenterColumn>

    <FeaturedGallery />

    <SterlingTitle title="Objects within this guide" subTitle="Select an Object for more information" />

    <GuideTopics list={stubTileList} />
  </div>
);

export default Guides;
