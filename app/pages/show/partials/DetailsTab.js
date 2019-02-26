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
import RelatedShows from '../../../components/RelatedShows';
import RelatedStories from '../../../components/RelatedStories';
import RelatedGuides from '../../../components/RelatedGuides';
import RelatedObject from 'components/RelatedObject/BootstrappedRelatedObject';

import styles from './MainContent.style';
import messages from '../Show.messages';

import {
  RELATED_SHOWS,
  RELATED_STORIES,
  RELATED_GUIDES,
} from 'services/events';
import { CONTENT_RELATED_STORIES } from 'services/content';

const {
  any,
  arrayOf,
  bool,
  func,
  number,
  oneOfType,
  shape,
  string,
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

        <RelatedShows
          serviceURL={RELATED_SHOWS}
          user={user}
          showId={showId}
          slugLookupId={slugLookupId}
          maxCount={3}
          isDesktop={isDesktop}
          isScreenLarge={isScreenLarge}
          title={intl.formatMessage(messages.RelatedShows)}
        />

        <RelatedStories
          serviceURL={RELATED_STORIES}
          user={user}
          showId={showId}
          slugLookupId={slugLookupId}
          maxCount={3}
          isDesktop={isDesktop}
          isScreenLarge={isScreenLarge}
          title={intl.formatMessage(messages.RelatedStories)}
        />

        <RelatedGuides
          serviceURL={RELATED_GUIDES}
          user={user}
          showId={showId}
          slugLookupId={slugLookupId}
          maxCount={3}
          isDesktop={isDesktop}
          isScreenLarge={isScreenLarge}
          title={intl.formatMessage(messages.RelatedGuides)}
        />

        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default injectIntl(DetailsTab);
