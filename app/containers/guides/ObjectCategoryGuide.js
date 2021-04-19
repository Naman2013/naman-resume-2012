import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import Request from 'app/components/common/network/Request';
import InAppNavigation from 'app/components/common/InAppNavigation';
import CenterColumn from 'app/components/common/CenterColumn';
import TiaraTitleSection from 'app/components/common/TiaraTitleSection';
import SterlingTitle from 'app/components/common/titles/SterlingTitle';
import GuideSection from 'app/components/guides/GuideSection';
import GuideBodyContent from 'app/components/guides/GuideBodyContent';
import GuideContentList from 'app/components/guides/GuideContentList';
import FeaturedGallery from 'app/components/guides/FeaturedGallery';
import GuideTopics from 'app/components/guides/GuideTopics';
import GuidePanels from 'app/components/guides/GuidePanels';
import {
  GUIDE_ENDPOINT_URL,
  GUIDE_OBJECTS_ENDPOINT_URL,
} from 'app/services/guides/guide-data';

const guidePageModel = {
  name: 'GUIDE_PAGE_MODEL',
  model: resp => (
    console.log('resp::',resp),
    {
    
    tiaraTitleProps: {
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
            readingListType: resp.readingListType,
            showActions: resp.toggleReadingListFlag,
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
            readingListType: resp.readingListType,
            showActions: resp.toggleReadingListFlag,
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
    navigationProps: {
      title: resp.chapterNavigationInfo.parentInfo? resp.chapterNavigationInfo.parentInfo.guideTitle:null,
      contextMenuTitle: resp.topicHeading1,
      contextMenuCount: resp.chapterNavigationInfo.chapterCount,
      backLinkURL: resp.chapterNavigationInfo.parentInfo ? resp.chapterNavigationInfo.parentInfo.link :null,
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
        iconUrl: spaceObject.iconURL,
        linkURL: spaceObject.link,
      })),
    },
  }),
};

@withTranslation()
export default class Guides extends React.Component {
  static propTypes = {
    params: PropTypes.shape({
      guideId: PropTypes.string.isRequired,
    }).isRequired,
  };

  render() {
    const { guideId } = this.props.params;
    return (
      <Request
        serviceURL={GUIDE_ENDPOINT_URL}
        model={guidePageModel}
        requestBody={{ guideId }}
        render={({
          fetchingContent,
          modeledResponses: { GUIDE_PAGE_MODEL },
        }) => (
          <div>
            {!fetchingContent && (
              <Fragment>
                <Request
                  serviceURL={GUIDE_OBJECTS_ENDPOINT_URL}
                  model={guideObjectsModel}
                  requestBody={{ guideId }}
                  render={results => (
                    <div>
                      {!results.fetchingContent && (
                        <Fragment>
                          <InAppNavigation
                            menuTopAdjustment={0}
                            {...GUIDE_PAGE_MODEL.navigationProps}
                            {...results.modeledResponses.GUIDE_OBJECTS
                              .guideTopicsProps}
                          />
                          <TiaraTitleSection
                            {...GUIDE_PAGE_MODEL.tiaraTitleProps}
                          />

                          <CenterColumn
                            theme={{
                              boxShadow:
                                'rgba(65, 86, 113, 0.2) 0px 3px 8px 1px',
                              marginBottom: '60px',
                            }}
                          >
                            <GuideSection
                              {...GUIDE_PAGE_MODEL.guideSectionProps}
                              guideId={guideId}
                            />
                          </CenterColumn>

                          {results.serviceResponse.FeaturedObservations
                            .hasObservations && (
                            <FeaturedGallery
                              imageList={
                                results.serviceResponse.FeaturedObservations
                              }
                            />
                          )}

                          <GuidePanels guideId={guideId} />

                          <SterlingTitle
                            {...GUIDE_PAGE_MODEL.sterlingTitleProps}
                          />

                          <GuideTopics
                            {...results.modeledResponses.GUIDE_OBJECTS
                              .guideTopicsProps}
                          />
                        </Fragment>
                      )}
                    </div>
                  )}
                />
              </Fragment>
            )}
          </div>
        )}
      />
    );
  }
}
