/** *********************************
 * V4 Shows DetailsTab
 *
 *
 *
 ********************************** */

import RelatedObject from 'app/components/RelatedObject/BootstrappedRelatedObject';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { RELATED_GUIDES, RELATED_SHOWS } from 'app/services/events';
import RelatedGuides from '../../../components/RelatedGuides';
import RelatedShows from '../../../components/RelatedShows';
import RelatedStories from '../../../components/RelatedStories';
import messages from '../Show.messages';

import styles from './MainContent.style';

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
@withTranslation
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
      t,
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
          title={t('.RelatedShows')}
        />

        <RelatedStories
          // serviceURL={RELATED_STORIES}
          user={user}
          showId={showId}
          slugLookupId={slugLookupId}
          maxCount={3}
          isDesktop={isDesktop}
          isScreenLarge={isScreenLarge}
          title={t('.RelatedStories')}
        />

        <RelatedGuides
          serviceURL={RELATED_GUIDES}
          user={user}
          showId={showId}
          slugLookupId={slugLookupId}
          maxCount={3}
          isDesktop={isDesktop}
          isScreenLarge={isScreenLarge}
          title={t('.RelatedGuides')}
        />

        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default injectIntl(DetailsTab);
