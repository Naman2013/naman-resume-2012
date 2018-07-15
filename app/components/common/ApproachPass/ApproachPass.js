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

import styles, { profPic } from './ApproachPass.style'

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

class ApproachPass extends Component {

  static propTypes = {
    avatarURL: string.isRequired,
    customerId: oneOfType([number, string]).isRequired,
    displayName: string.isRequired,
    openModal: func,
    freshness: string.isRequired,
    likeHandler: func,
    likeParams: shape(any),
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
      <div className="comment-item" key={uniqueId()}>
        <div className="user-info-container">
          <div className="user-info">
            <div style={profPic(avatarURL)} />
            <div className="display-name" dangerouslySetInnerHTML={{ __html: displayName }} />
          </div>
          <span className="date">{moment(creationDate).fromNow()}</span>
        </div>

        <div className="content" dangerouslySetInnerHTML={{ __html: title || content }} />
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
            <CommentButton onClickEvent={toggleAllComments} count={replyCount} />
          </div>
          <div className="action-right"></div>
          {showAllComments ? renderChildReplies() : null}
        </div>
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default ApproachPass;
