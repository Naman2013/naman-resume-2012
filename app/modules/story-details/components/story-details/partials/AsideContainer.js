import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import Host from 'app/components/Host';
import BlueLineDrop from 'app/components/common/BlueLineDrop';
import DisplayAtBreakpoint from 'app/components/common/DisplayAtBreakpoint';
import RelatedShows from 'app/components/RelatedShows';
import RelatedStories from 'app/components/RelatedStories';
import RelatedGuides from 'app/components/RelatedGuides';
import RelatedObject from 'app/components/RelatedObject';
import { CONTENT_RELATED_GUIDES,  CONTENT_RELATED_STORIES, CONTENT_RELATED_SHOWS} from 'app/services/content';
import messages from './AsideContainer.messages';


const {
  arrayOf,
  bool,
  number,
  oneOfType,
  shape,
  string,
} = PropTypes;

const MAX_COUNT = 3;

const AsideContainer = ({
  authorInfo,
  isDesktop,
  isMobile,
  isScreenLarge,
  relatedObject,
  slugLookupId,
  postId,
  user,
  intl,
}) => (
  <div>
    <DisplayAtBreakpoint
      screenLarge
      screenXLarge
    >
      <Host
        hostGravity={authorInfo.gravity}
        hostName={authorInfo.displayName}
        hostPhotoURL={authorInfo.iconUrl}
        hostTitle={authorInfo.gravityLabel}
        hostURL={authorInfo.linkUrl}
        isDesktop={isDesktop}
        title={authorInfo.label}
      />
    </DisplayAtBreakpoint>
    
    <RelatedObject slugLookupId={slugLookupId} user={user} isDesktop={isDesktop} />

    <RelatedShows
      serviceURL={CONTENT_RELATED_SHOWS}
      user={user}
      slugLookupId={slugLookupId}
      maxCount={MAX_COUNT}
      isDesktop={isDesktop}
      isScreenLarge={isScreenLarge}
      title={intl.formatMessage(messages.relatedShows)}
    />

    <RelatedStories
      serviceURL={CONTENT_RELATED_STORIES}
      user={user}
      postId={postId}
      slugLookupId={slugLookupId}
      maxCount={MAX_COUNT}
      isDesktop={isDesktop}
      isMobile={isMobile}
      isScreenLarge={isScreenLarge}
      title={intl.formatMessage(messages.relatedStories)}
    />

    <RelatedGuides
      serviceURL={CONTENT_RELATED_GUIDES}
      user={user}
      postId={postId}
      slugLookupId={slugLookupId}
      maxCount={MAX_COUNT}
      isDesktop={isDesktop}
      isScreenLarge={isScreenLarge}
      title={intl.formatMessage(messages.relatedGuides)}
    />
  </div>
);

AsideContainer.propTypes = {
  isDesktop: bool,
  intl: intlShape.isRequired,
};

AsideContainer.defaultProps = {
  isDesktop: true,
};
export default injectIntl(AsideContainer);
