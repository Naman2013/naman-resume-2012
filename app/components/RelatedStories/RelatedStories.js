/** *********************************
 * V4 Related Stories
 *
 *
 *
 ********************************** */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CONTENT_RELATED_STORIES } from '../../services/content';
import Request from '../common/network/Request';
import BlueLineDrop from '../common/BlueLineDrop';
import BootstrappedRelatedStories from './BootstrappedRelatedStories';

const { bool, number, oneOfType, string, shape } = PropTypes;

class RelatedStories extends Component {
  static propTypes = {
    isDesktop: bool,
    postId: oneOfType([string, number]),
    slugLookupId: oneOfType([string, number]),
    showId: oneOfType([string, number]),
    serviceURL: string,
    maxCount: number,
    user: shape({}).isRequired,
    title: string,
  };

  static defaultProps = {
    isDesktop: false,
    postId: null,
    slugLookupId: null,
    showId: null,
    serviceURL: CONTENT_RELATED_STORIES,
    maxCount: 3,
    title: '',
  };

  render() {
    const {
      isDesktop,
      isScreenLarge,
      user,
      showId,
      slugLookupId,
      serviceURL,
      title,
      maxCount,
      postId,
    } = this.props;

    return (
      <Request
        authorizationRedirect
        serviceURL={serviceURL}
        method="POST"
        serviceExpiresFieldName="expires"
        requestBody={{
          cid: user.cid,
          token: user.token,
          at: user.at,
          slugLookupId,
          listType: 'sluglookupids',
          showId,
          maxCount,
          postId,
        }}
        render={({ fetchingContent, serviceResponse }) =>
          !fetchingContent &&
          serviceResponse.relatedStoriesList &&
          serviceResponse.relatedStoriesList.length > 0 && (
            <BlueLineDrop
              title={`${title} (${serviceResponse.relatedStoriesList &&
                serviceResponse.relatedStoriesList.length}) `}
              isDesktop={isDesktop}
              theme={{ margin: isScreenLarge ? '25px 0' : '25px' }}
              render={() => (
                <BootstrappedRelatedStories
                  relatedStoriesList={serviceResponse.relatedStoriesList}
                  serviceResponse={serviceResponse}
                />
              )}
            />
          )
        }
      />
    );
  }
}

export default RelatedStories;
