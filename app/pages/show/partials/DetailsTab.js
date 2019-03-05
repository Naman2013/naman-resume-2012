/** *********************************
 * V4 Shows DetailsTab
 *
 *
 *
 ********************************** */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import LikeSomethingButton from 'components/common/LikeSomethingButton';
import Request from 'components/common/network/Request';
import { romance } from 'styles/variables/colors_tiles_v4';
import BlueLineDrop from 'components/common/BlueLineDrop';
import RelatedShows from 'components/RelatedShows';
import RelatedStories from 'components/RelatedStories';
import RelatedGuides from 'components/RelatedGuides';
import RelatedObject from 'components/RelatedObject/BootstrappedRelatedObject';
import styles from './MainContent.style';
import messages from '../Show.messages';

import { RELATED_SHOWS, RELATED_STORIES, RELATED_GUIDES } from 'services/events';
import { CONTENT_RELATED_STORIES } from 'services/content';

const {
  any, arrayOf, bool, func, number, oneOfType, shape, string,
} = PropTypes;

class DetailsTab extends Component {
  static propTypes = {
    showId: oneOfType([number, string]).isRequired,
    isDesktop: bool.isRequired,
    isScreenMedium: bool.isRequired,
    user: shape({
      at: oneOfType([number, string]),
      token: oneOfType([number, string]),
      cid: oneOfType([number, string]),
    }).isRequired,
    intl: intlShape.isRequired,
  };

  static defaultProps = {};

  state = {};

  render() {
    const {
      content,
      discussionForumId,
      discussionThreadId,
      discussionTopicId,
      isDesktop,
      isScreenMedium,
      isScreenLarge,
      hasRelatedObject,
      slugLookupId,
      relatedObject,
      showId,
      user,
      intl,
    } = this.props;

    return (
      <div>
        {hasRelatedObject && <RelatedObject {...relatedObject} user={user} />}
        <Request
          authorizationRedirect
          serviceURL={RELATED_SHOWS}
          method="POST"
          serviceExpiresFieldName="expires"
          requestBody={{
            cid: user.cid,
            token: user.token,
            at: user.at,
            slugLookupId,
            showId,
            maxCount:3,
          }}
          render={({ fetchingContent, serviceResponse }) => (
            <BlueLineDrop
              title={`${intl.formatMessage(messages.RelatedShows)} (${serviceResponse.showCount || 0}) `}
              isDesktop={isDesktop}
              theme={{ margin: isScreenLarge ? '25px 0' : '25px' }}
              render={() => (
                <RelatedShows
                  showId={showId}
                  fetchingContent={fetchingContent}
                  shows={serviceResponse}
                />
              )}
            />
          )}
        />
        <Request
          authorizationRedirect
          serviceURL={CONTENT_RELATED_STORIES}
          method="POST"
          serviceExpiresFieldName="expires"
          requestBody={{
            cid: user.cid,
            token: user.token,
            at: user.at,
            showId,
            slugLookupId,
            listType: 'sluglookupids',
            maxCount:3,
          }}
          render={({ fetchingContent, serviceResponse }) => (
            <BlueLineDrop
              title={`${intl.formatMessage(messages.RelatedStories)} (${serviceResponse.storyCount || 0}) `}
              isDesktop={isDesktop}
              theme={{ margin: isScreenLarge ? '25px 0' : '25px' }}
              render={() => (
                <RelatedStories
                  showId={showId}
                  stories={serviceResponse}
                  fetchingContent={fetchingContent}
                />
              )}
            />
          )}
        />

        <Request
          authorizationRedirect
          serviceURL={RELATED_GUIDES}
          method="POST"
          serviceExpiresFieldName="expires"
          requestBody={{
            cid: user.cid,
            token: user.token,
            at: user.at,
            slugLookupId,
            showId,
            maxCount:3,
          }}
          render={({ fetchingContent, serviceResponse }) => (
            <BlueLineDrop
              title={`${intl.formatMessage(messages.RelatedGuides)} (${serviceResponse.guideCount || 0}) `}
              isDesktop={isDesktop}
              theme={{ margin: isScreenLarge ? '25px 0' : '25px' }}
              render={() => (
                <RelatedGuides
                  showId={showId}
                  fetchingContent={fetchingContent}
                  guides={serviceResponse}
                />
              )}
            />
          )}
        />

        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default injectIntl(DetailsTab);
