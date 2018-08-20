/***********************************
* V4 Shows Main Container
* This will show the video on desktop
* on tablet and mobile, it will hold the content
* associated with the three tabbed nav.
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { romance } from 'styles/variables/colors_tiles_v4';
import LabeledTitleTiles from 'components/common/style/LabeledTitleTiles';
import LikeSomethingButton from 'components/common/LikeSomethingButton';
import UpcomingShowCountdown from 'components/UpcomingShowCountdown';
import DescriptionContainer from './DescriptionContainer';
import like from 'services/events/like';
import AboutTab from './AboutTab';
import CommentsTab from './CommentsTab';
import DetailsTab from './DetailsTab';
import styles from './MainContainerWithDiscussions.style';

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

class MainContainerWithDiscussions extends Component {
  static propTypes = {
    aboutIsActive: bool.isRequired,
    commentsIsActive: bool.isRequired,
    content: string,
    detailsIsActive: bool.isRequired,
    headerLabel: string,
    hasDiscussionThread: bool,
    isDesktop: bool.isRequired,
    isScreenMedium: bool.isRequired,
    likePrompt: string,
    likesCount: number,
    showId: string.isRequired,
    showLikePrompt: bool,
    user: shape({
      at: oneOfType([number, string]),
      token: oneOfType([number, string]),
      cid: oneOfType([number, string]),
    }).isRequired,
  };

  static defaultProps = {
    content: '',
    headerLabel: '',
    hasDiscussionThread: false,
    likePrompt: '',
    likesCount: 0,
    showInfoTiles: {},
    showLikePrompt: false,
  };

  state = {

  }



  render() {
    const {
      aboutIsActive,
      commentsIsActive,
      content,
      detailsIsActive,
      isDesktop,
      hasDiscussionThread,
      likePrompt,
      likesCount,
      serverTime,
      startDate,
      showId,
      showLikePrompt,
      user,
    } = this.props;

    const likeParams = {
      likeId: showId,
      likeType: 'show',
    };

    const contentFooter = () => (
      <div>
        <LikeSomethingButton
          likeHandler={like}
          likesCount={likesCount}
          likePrompt={likePrompt}
          likeParams={likeParams}
          showLikePrompt={showLikePrompt}
          user={user}
          customerId={user.cid}
        />
      </div>
    );

    return (
      <div className="root">
        {isDesktop ? (
          <div className="main-content-container">
            <div>
              {Number(serverTime) < Number(startDate) ? <UpcomingShowCountdown
                eventStartTime={Number(startDate)}
                eventId={showId}
                serverTime={serverTime}
              /> : null}
            </div>
            <div className="shadowed">
              <DescriptionContainer title="" content={content} theme={{ backgroundColor: romance }} footer={contentFooter} />
            </div>
            <div className="comment-container">
              {hasDiscussionThread ? <CommentsTab {...this.props} /> : null}
            </div>
          </div>
        ) : (
          <div>
            {aboutIsActive ?
              <AboutTab {...this.props} /> :
            null}
            {commentsIsActive ?
              <CommentsTab {...this.props} /> :
            null}
            {detailsIsActive ?
              <DetailsTab {...this.props} /> :
            null}
          </div>
        )}
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default MainContainerWithDiscussions;
