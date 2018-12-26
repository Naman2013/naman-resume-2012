/***********************************
* V4 Object Details : Stories
*   Markdown support on elements????
*   UTF-8 support....
*   Multi-National Languages.....
***********************************/

import React, { Component, Fragment} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { intlShape, injectIntl, FormattedMessage } from 'react-intl';
import GenericLoadingBox from 'components/common/loading-screens/generic-loading-box';
import DeviceProvider from 'providers/DeviceProvider';
import has from 'lodash/has';
import ObjectDetailsSectionTitle from 'components/object-details/ObjectDetailsSectionTitle';
import CenterColumn from 'components/common/CenterColumn';
import Request from 'components/common/network/Request';
import StoryTile from 'components/common/tiles/StoryTile';

import { OBJECT_STORIES } from 'services/objects';

import {
  fetchObjectDetailsAction,
  fetchObjectDataAction,
} from 'modules/object-details/actions';
import messages from './ObjectDetails.messages';


const mapStateToProps = ({ objectDetails, objectPostList, appConfig, user }) => ({
  objectDetails: objectDetails.objectDetails,
  objectData: objectDetails.objectData,
  slugLookupId: objectDetails.objectData.slugLookupId,
  appConfig,
  user,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchObjectDetailsAction,
    fetchObjectDataAction,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)

class Stories extends Component {


  render() {
    const {
      params: {
        objectId,
      },
      objectDetails,
      slugLookupId,
      actions: {
      },
      intl,
    } = this.props;

    const sId = slugLookupId;
    const slugId = toString(sId);

    //console.log (this.props);

    return (
      <Fragment>
        <DeviceProvider>
          <ObjectDetailsSectionTitle title={objectDetails.objectTitle + "'s"} subTitle={intl.formatMessage(messages.RelatedStories)} />
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
            render={({
              fetchingContent,
              serviceResponse,
            }) => (
              <div className="root">
                {serviceResponse.relatedStoriesCount > 0 && has(serviceResponse, 'relatedStoriesList') ? serviceResponse.relatedStoriesList.map(story => (
                  <StoryTile
                    iconURL={story.iconUrl}
                    title={story.title}
                    author={story.author}
                    linkUrl={story.linkUrl}
                  />
                )) : (
                  <p>
                    <FormattedMessage
                      {...messages.NoStories}
                      values={{ objectTitle: objectDetails.objectTitle }}
                    />
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
    )
  }
}

Stories.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(Stories);
