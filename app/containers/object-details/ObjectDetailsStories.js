/***********************************
 * V4 Object Details : Stories
 *   Markdown support on elements????
 *   UTF-8 support....
 *   Multi-National Languages.....
 ***********************************/

import React, { Component, Fragment } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import GenericLoadingBox from 'app/components/common/loading-screens/generic-loading-box';
import DeviceProvider from 'providers/DeviceProvider';
import has from 'lodash/has';
import ObjectDetailsSectionTitle from 'app/components/object-details/ObjectDetailsSectionTitle';
import CenterColumn from 'app/components/common/CenterColumn';
import Request from 'app/components/common/network/Request';
import StoryTile from 'app/components/common/tiles/StoryTile';

import { OBJECT_STORIES } from 'app/services/objects';

import {
  fetchObjectDetailsAction,
  fetchObjectDataAction,
} from 'app/modules/object-details/actions';
import messages from './ObjectDetails.messages';

const mapStateToProps = ({
  objectDetails,
  objectPostList,
  appConfig,
  user,
}) => ({
  objectDetails: objectDetails.objectDetails,
  objectData: objectDetails.objectData,
  slugLookupId: objectDetails.objectData.slugLookupId,
  appConfig,
  user,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      fetchObjectDetailsAction,
      fetchObjectDataAction,
    },
    dispatch
  ),
});

@connect(
  mapStateToProps,
  mapDispatchToProps
)
@withTranslation
class Stories extends Component {
  render() {
    const {
      params: { objectId },
      objectDetails,
      slugLookupId,
      actions: {},
      t,
    } = this.props;

    const sId = slugLookupId;
    const slugId = toString(sId);

    //console.log (this.props);

    return (
      <Fragment>
        <DeviceProvider>
          <ObjectDetailsSectionTitle
            title={`${objectDetails.objectTitle}'s`}
            subTitle={t('.RelatedStories')}
          />
        </DeviceProvider>
        <CenterColumn widths={['645px', '965px', '965px']}>
          <Request
            authorizationRedirect
            serviceURL={OBJECT_STORIES}
            method="POST"
            serviceExpiresFieldName="expires"
            requestBody={{
              objectId,
            }}
            render={({ fetchingContent, serviceResponse }) => (
              <div className="root">
                {serviceResponse.relatedStoriesCount > 0 &&
                has(serviceResponse, 'relatedStoriesList') ? (
                  serviceResponse.relatedStoriesList.map(story => (
                    <StoryTile
                      iconURL={story.iconUrl}
                      title={story.title}
                      author={story.author}
                      linkUrl={story.linkUrl}
                    />
                  ))
                ) : (
                  <p>
                    {t('.NoStories', {
                      objectTitle: objectDetails.objectTitle,
                    })}
                  </p>
                )}
              </div>
            )}
          />
        </CenterColumn>
        <style jsx>{`
          .root {
            display: flex;
            flex-wrap: wrap;
          }
        `}</style>
      </Fragment>
    );
  }
}

Stories.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(Stories);
