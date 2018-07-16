/***********************************
* V4 Discussions Thread List Item
*
*
*
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';
import moment from 'moment';
import CommentButton from 'components/common/style/buttons/CommentButton';
import LikeSomethingButton from 'components/common/LikeSomethingButton';
import Button from 'components/common/style/buttons/Button';
import styles, { profPic } from './DiscussionsCard.style'

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

class DiscussionsCard extends Component {

  static propTypes = {
    avatarURL: string.isRequired,
    customerId: oneOfType([number, string]).isRequired,
    displayName: string.isRequired,
    openModal: func,
    freshness: string.isRequired,
    likeHandler: func,
    likeParams: shape(any),
    isDesktop: bool.isRequired,
    user: shape({
      at: oneOfType([number, string]),
      token: oneOfType([number, string]),
      cid: oneOfType([number, string]),
    }).isRequired,
    likePrompt: string.isRequired,
    likesCount: number.isRequired,
    replyCount: number.isRequired,
    S3Files: arrayOf(string),
    showLikePrompt: bool.isRequired,
    renderChildReplies: func,
  };

  static defaultProps = {
    likeHandler: null,
    likeParams: {},
    openModal: null,
    S3Files: [],
    renderChildReplies: null,
  };

  state = {
    showAllComments: false,
  };

  toggleAllComments = () => {
    const { showAllComments } = this.state;

    this.setState({
      showAllComments: !showAllComments,
    });
  }

  render () {
    const {
      avatarURL,
      creationDate,
      content,
      customerId,
      displayName,
      isDesktop,
      likeHandler,
      likeParams,
      likePrompt,
      likesCount,
      openModal,
      renderChildReplies,
      replyCount,
      showLikePrompt,
      title,
      user,
    } = this.props;

    const {
      showAllComments,
    } = this.state;

    const {
      toggleAllComments,
    } = this;

    return (
      <div className="root" key={uniqueId()}>
        <div className="comment-item">
          <div className="user-info-container">
            <div className="user-info">
              <div style={profPic(avatarURL)} />
              <div className="display-name" dangerouslySetInnerHTML={{ __html: displayName }} />
            </div>
            <span className="date">{moment(creationDate).fromNow()}</span>
          </div>

          <div className="content" dangerouslySetInnerHTML={{ __html: title || content }} />
          <div className="explainantion-container">
            <div className="explainantion-item">{moment(creationDate).fromNow()}</div>
            <div className="explainantion-item">Likes: {likesCount}     Comments: {replyCount}</div>
          </div>
          <div className="activity-actions">
            <div className="action-left">
              <LikeSomethingButton
                likeHandler={likeHandler}
                likesCount={likesCount}
                likePrompt={likePrompt}
                likeParams={likeParams}
                openModal={openModal}
                showLikePrompt={showLikePrompt}
                user={user}
                customerId={customerId}
              />
              {renderChildReplies ? <CommentButton
                isActive={showAllComments}
                onClickEvent={toggleAllComments}
                count={replyCount}
              /> : null}
            </div>
            <div className="action-right">
              <Button text="Reply" />
            </div>
          </div>
        </div>
        {showAllComments && renderChildReplies ? renderChildReplies() : null}
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default DiscussionsCard;
