import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Request from 'components/common/network/Request';
import CenterColumn from 'components/common/CenterColumn';
import TiaraTitleSection from 'components/common/TiaraTitleSection';
import SterlingTitle from 'components/common/titles/SterlingTitle';
import GuideSection from 'components/guides/GuideSection';
import GuideBodyContent from 'components/guides/GuideBodyContent';
import GuideContentList from 'components/guides/GuideContentList';
import FeaturedGallery from 'components/guides/FeaturedGallery';
import GuideTopics from 'components/guides/GuideTopics';
import GuidePanels from 'components/guides/GuidePanels';
import { GUIDE_ENDPOINT_URL, GUIDE_OBJECTS_ENDPOINT_URL } from 'services/guides/guide-data';

const guidePageModel = {
  name: 'GUIDE_PAGE_MODEL',
  model: resp => ({
    tiaraTitleProps: {
      preTitle: resp.guideHeader,
      title: resp.guideReferenceTitle,
      iconURL: resp.guideIconURL,
    },
    guideSectionProps: {
      content: () => (
        <GuideBodyContent title={resp.AboutThisTitle} content={resp.AboutThisContent} />
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
          }}
          guideId={guideId}
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

const guideObjectsModel = {
  name: 'GUIDE_OBJECTS',
  model: resp => ({
    guideTopicsProps: {
      list: resp.objectList.map(spaceObject => ({
        title: spaceObject.popularName,
        iconURL: spaceObject.iconURL,
        linkURL: spaceObject.link,
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
                <GuideSection {...GUIDE_PAGE_MODEL.guideSectionProps} guideId={guideId} />
              </CenterColumn>

              <FeaturedGallery />

              <GuidePanels guideId={guideId} />

              <SterlingTitle {...GUIDE_PAGE_MODEL.sterlingTitleProps} />
              <Request
                serviceURL={GUIDE_OBJECTS_ENDPOINT_URL}
                model={guideObjectsModel}
                requestBody={{ guideId }}
                render={results => (
                  <Fragment>
                    {
                      !results.fetchingContent &&
                        <GuideTopics {...results.modeledResponses.GUIDE_OBJECTS.guideTopicsProps} />
                    }
                  </Fragment>

                )}
              />
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
