/***********************************
* V4 Discussions Comment List Item
*
*
*
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Modal from 'react-modal';
import { likeReply } from 'services/discussions/like';
import {
  midnight_express,
  astronaut,
  geyser,
} from 'styles/variables/colors_tiles_v4';
import { primaryFont, secondaryFont } from 'styles/variables/fonts';
import CommentButton from 'components/common/style/buttons/CommentButton';
import { dropShadowContainer } from 'styles/mixins/utilities';
import { profPic } from './styles';
import CommentRepliesList from './CommentRepliesList';
import LikeButton from 'components/common/LikeButton';

const {
  bool,
  number,
  oneOfType,
  shape,
  string,
} = PropTypes;

class CommentListItem extends Component {
  static defaultProps = {
    callSource: null,
    count: 10,
    forumId: null,
    likeParams: {},
    threadId: null,
    topicId: null,
  };

  static propTypes = {
    avatarURL: string.isRequired,
    callSource: string,
    content: string.isRequired,
    count: number,
    customerId: number.isRequired,
    displayName: string.isRequired,
    forumId: oneOfType([number, string]),
    likeParams: shape({}),
    likePrompt: string.isRequired,
    likesCount: number.isRequired,
    membershipDisplay: string,
    replyCount: number.isRequired,
    replyId: number.isRequired,
    showLikePrompt: bool.isRequired,
    threadId: oneOfType([number, string]),
    topicId: oneOfType([number, string]),
    user: shape({
      at: oneOfType([number, string]),
      token: oneOfType([number, string]),
      cid: oneOfType([number, string]),
    }).isRequired,
  };

  static defaultProps = {
    membershipDisplay: null,
  }

  state = {
    likesCount: this.props.likesCount,
    likePrompt: this.props.likePrompt,
    showAllReplies: false,
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.likePrompt !== nextProps.likePrompt) {
      this.setState({
        likePrompt: nextProps.likePrompt,
      });
    }

    if (this.props.likesCount !== nextProps.likesCount) {
      this.setState({
        likesCount: nextProps.likesCount,
      });
    }
  }

  toggleAllReplies = () => {
    const { showAllReplies } = this.state;

    this.setState({
      showAllReplies: !showAllReplies,
    });
  }

  render() {
    const {
      avatarURL,
      callSource,
      content,
      count,
      creationDate,
      customerId,
      displayName,
      forumId,
      likeParams,
      likePrompt,
      membershipDisplay,
      openModal,
      replyCount,
      replyId,
      showLikePrompt,
      threadId,
      topicId,
      user,
    } = this.props;

    const {
      likesCount,
      showAllReplies,
    } = this.state;
    return (
      <div className="comment-item" key={replyId}>
        <div className="user-info-container">
          <div className="user-info">
            <div style={Object.assign(profPic(avatarURL), { height: '14px', width: '14px' })} />
            <div className="display-name" dangerouslySetInnerHTML={{ __html: displayName }} />
          </div>
          <span className="date">{moment(creationDate).fromNow()}</span>
        </div>

        <div className="content" dangerouslySetInnerHTML={{ __html: content }} />
        <div className="activity-actions">
          <div className="action-left">
            <LikeButton
              liekHandler={likeReply}
              likesCount={likesCount}
              likePrompt={likePrompt}
              likeParams={likeParams}
              openModel={openModal}
              showLikePrompt={showLikePrompt}
              user={user}
              customerId={customerId}
            />
            <CommentButton onClickEvent={this.toggleAllReplies} count={replyCount} />
          </div>
          <div className="action-right"></div>
          {showAllReplies ? <div>
            <CommentRepliesList
              count={count}
              replyId={replyId}
              topicId={topicId}
              forumId={forumId}
              threadId={threadId}
              callSource={callSource}
              user={user}
            />
          </div> : null}
        </div>
        <style jsx>{`
          .comment-item {
            ${dropShadowContainer};
            margin: 25px;
            padding: 25px;
            font-family: ${primaryFont};
            color: ${astronaut};
          }

          .user-info, .user-info-container {
            display: flex;
            flex-direction: row;
            font-size: 10px;
            align-items: center;
            text-transform: uppercase;
            font-weight: bold;
          }

          .user-info-container {
            width: 100%;
            justify-content: space-between;
            padding-bottom: 15px;
            border-bottom: 1px solid ${geyser};
          }
          .display-name {
            margin-left: 10px;
          }

          .content {
            font-family: ${secondaryFont};
            font-size: 19px;
            color: ${astronaut};
            padding: 25px 0;
          }

          .date {
            text-align: right;
          }

          .action-left {
            display: flex;
            flex-direction: row;
          }

          .fa-close {
            position: absolute;
            top: 5px;
            right: 10px;
          }
        `}</style>
      </div>
    );
  }
}

export default CommentListItem;
