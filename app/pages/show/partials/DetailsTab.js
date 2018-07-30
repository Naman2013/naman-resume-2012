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
import RelatedShows from 'components/RelatedShows';
import RelatedStories from 'components/RelatedStories';
import RelatedGuides from 'components/RelatedGuides';
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
      showId,
      user,
    } = this.props;

    return (
      <div>
        <RelatedShows showId={showId} />
        <RelatedStories showId={showId} />
        <RelatedGuides showId={showId} />
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default DetailsTab;
