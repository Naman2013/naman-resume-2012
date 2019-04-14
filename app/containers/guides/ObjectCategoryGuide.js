import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Request from 'components/common/network/Request';
import InAppNavigation from 'components/common/InAppNavigation';
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
import messages from './ObjectCategoryGuide.messages';

const guidePageModel = {
  name: 'GUIDE_PAGE_MODEL',
  model: resp => ({
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
          list={[resp.guideBulletPoint1, resp.guideBulletPoint2, resp.guideBulletPoint3]}
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
      title: <FormattedMessage {...messages.SterlingTitle} />,
      subTitle: <FormattedMessage {...messages.SterlingSubtitle} />,
    },
    guideTopicsProps: {
      list: resp.chapterNavigationInfo.chapterList.map(chapter => ({
        title: chapter.guideTitle,
        iconURL: chapter.guideIconURL,
        linkURL: chapter.link,
      })),
    },
    navigationProps: {
      title: resp.chapterNavigationInfo.parentInfo.guideTitle,
      contextMenuTitle: resp.topicHeading1,
      contextMenuCount: resp.chapterNavigationInfo.chapterCount,
      backLinkURL: resp.chapterNavigationInfo.parentInfo.link,
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
        render={({ fetchingContent, modeledResponses: { GUIDE_PAGE_MODEL } }) => (
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
                            {...results.modeledResponses.GUIDE_OBJECTS.guideTopicsProps}
                          />
                          <TiaraTitleSection {...GUIDE_PAGE_MODEL.tiaraTitleProps} />

                          <CenterColumn
                            theme={{ boxShadow: 'rgba(65, 86, 113, 0.2) 0px 3px 8px 1px', marginBottom: '60px' }}
                          >
                            <GuideSection {...GUIDE_PAGE_MODEL.guideSectionProps} guideId={guideId} />
                          </CenterColumn>

                          <FeaturedGallery />

                          <GuidePanels guideId={guideId} />

                          <SterlingTitle {...GUIDE_PAGE_MODEL.sterlingTitleProps} />

                          <GuideTopics {...results.modeledResponses.GUIDE_OBJECTS.guideTopicsProps} />
                        </Fragment>)}
                    </div>
                  )
                  }
                />
              </Fragment>
            )}
          </div>
        )}
      />
    );
  }

}