/***********************************
* V4 Shows DetailsTab
*
*
*
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LikeSomethingButton from 'components/common/LikeSomethingButton';
import { romance } from 'styles/variables/colors_tiles_v4';
import BlueLineDrop from 'components/common/BlueLineDrop';
import RelatedShows from 'components/RelatedShows';
import RelatedStories from 'components/RelatedStories';
import RelatedGuides from 'components/RelatedGuides';
import RelatedObject from 'components/RelatedObject';
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
  };

  static defaultProps = {

  };

  state = {

  }



  render() {
    const {
      content,
      discussionForumId,
      discussionThreadId,
      discussionTopicId,
      isDesktop,
      isScreenMedium,
      isScreenLarge,
      slugLookupId,
      relatedObject,
      showId,
      user,
    } = this.props;

    return (
      <div>
        <RelatedObject {...relatedObject} user={user} />
        <BlueLineDrop
          title="Related Shows"
          isDesktop={isDesktop}
          theme={{ margin: isScreenLarge ? '25px 0' : '25px' }}
          render={() => (
            <RelatedShows showId={showId} />
          )}
        />
        <BlueLineDrop
          title="Related Stories"
          isDesktop={isDesktop}
          theme={{ margin: isScreenLarge ? '25px 0' : '25px' }}
          render={() => (
            <RelatedStories showId={showId} />
          )}
        />
        <BlueLineDrop
          title="Related Guides"
          isDesktop={isDesktop}
          theme={{ margin: isScreenLarge ? '25px 0' : '25px' }}
          render={() => (
            <RelatedGuides showId={showId} />
          )}
        />

        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default DetailsTab;
