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
import ReplyForm from 'components/common/DiscussionsBoard/ReplyForm';
import ReplyButton from 'components/common/DiscussionsBoard/ReplyButton';
import Button from 'components/common/style/buttons/Button';
import ViewImagesButton from 'components/common/style/buttons/ViewImagesButton';
import styles, { profPic } from './DiscussionsCardSimple.style'

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

class DiscussionsCardSimple extends Component {

  static propTypes = {
    avatarURL: string.isRequired,
    displayName: string.isRequired,
    openModal: func,
    freshness: string.isRequired,
    likeHandler: func,
    likeParams: shape({}),
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
    submitReply: func,
    showLikePrompt: bool.isRequired,
  };

  static defaultProps = {
    likeHandler: null,
    likeParams: {},
    openModal: null,
    S3Files: [],
  };

  state = {
  };


  render () {
    const {
      avatarURL,
      content,
      displayName,
      isDesktop,
      likeHandler,
      likeParams,
      likePrompt,
      likesCount,
      openModal,
      showLikePrompt,
      title,
      user,
    } = this.props;

    const {
    } = this.state;

    const {
    } = this;
    return (
      <div className="root" key={uniqueId()}>
        <div className="comment-item">
          <div className="user-info-container">
            <div className="user-info">
              <div style={profPic(avatarURL)} />
              <div className="display-name" dangerouslySetInnerHTML={{ __html: displayName }} />
            </div>
          </div>

          <div className="content" dangerouslySetInnerHTML={{ __html: title || content }} />

        </div>
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default DiscussionsCardSimple;
