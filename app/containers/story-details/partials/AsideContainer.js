import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import Host from 'components/Host';
import BlueLineDrop from 'components/common/BlueLineDrop';
import DisplayAtBreakpoint from 'components/common/DisplayAtBreakpoint';
import RelatedShows from 'components/RelatedShows';
import RelatedStories from 'components/RelatedStories';
import RelatedGuides from 'components/RelatedGuides';
import RelatedObject from 'components/RelatedObject';
import { CONTENT_RELATED_GUIDES,  CONTENT_RELATED_STORIES, CONTENT_RELATED_SHOWS} from 'services/content';
import messages from './AsideContainer.messages';


const {
  arrayOf,
  bool,
  number,
  oneOfType,
  shape,
  string,
} = PropTypes;

const AsideContainer = ({
  authorInfo,
  isDesktop,
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
    <BlueLineDrop
      title={intl.formatMessage(messages.relatedShows)}
      isDesktop={isDesktop}
      theme={{ margin: isScreenLarge ? '25px 0' : '25px' }}
      render={() => (
        <RelatedShows slugLookupId={slugLookupId} serviceUrl={CONTENT_RELATED_SHOWS} />
      )}
    />
    <BlueLineDrop
      title={intl.formatMessage(messages.relatedStories)}
      isDesktop={isDesktop}
      theme={{ margin: isScreenLarge ? '25px 0' : '25px' }}
      render={() => (
        <RelatedStories postId={postId} slugLookupId={slugLookupId} serviceUrl={CONTENT_RELATED_STORIES} />
      )}
    />
    <BlueLineDrop
      title={intl.formatMessage(messages.relatedGuides)}
      isDesktop={isDesktop}
      theme={{ margin: isScreenLarge ? '25px 0' : '25px' }}
      render={() => (
        <RelatedGuides slugLookupId={slugLookupId} serviceUrl={CONTENT_RELATED_GUIDES} />
      )}
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
