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

import CommentRepliesList from './CommentRepliesList';
import { likeReply } from 'services/discussions/like';
import {
  black,
  darkGray,
  lightGray,
} from 'styles/variables/colors';
import { primaryFont, secondaryFont } from 'styles/variables/fonts';
import LikeButton from 'components/common/style/LikeButton';
import { customModalStyles } from 'styles/mixins/utilities';
import { profPic, dropShadowedContainer } from './styles';

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
    isOpen: false,
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

  closeModal = (e) => {

    // TODO: refactor Modal into higher component
    e.preventDefault();
    this.setState({
      isOpen: false,
    })
  }

  likeReply = (e) => {
    e.preventDefault();
    const {
      customerId,
      likeParams,
      showLikePrompt,
      user,
    } = this.props;

    if (showLikePrompt) {
      this.setState({
        isOpen: true,
      });
    } else {
      likeReply({
        ...likeParams,
        authorId: customerId,
        token: user.token,
        at: user.at,
        cid: user.cid,
      }).then(this.handleLikeResult);
    }
  }

  handleLikeResult = (res) => {
    const {
      apiError,
      showLikePrompt,
      count,
      likePrompt,
    } = res.data;
    if (!apiError) {
      this.setState({
        likesCount: count,
      });
    }

    if (showLikePrompt) {
      this.setState({
        likePrompt,
        isOpen: true,
      });
    }
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
      membershipDisplay,
      replyCount,
      replyId,
      threadId,
      topicId,
      user,
    } = this.props;

    const {
      isOpen,
      likePrompt,
      likesCount,
      showAllReplies,
    } = this.state;
    console.log(this.state)
    return (
      <div className="comment-item" key={replyId}>
        <div className="user-info-container">
          <div className="user-info">
            <div style={profPic(avatarURL)} />
            <div className="display-name" dangerouslySetInnerHTML={{ __html: displayName }} />
          </div>
          <span className="date">{moment(creationDate).fromNow()}</span>
        </div>

        <div className="content" dangerouslySetInnerHTML={{ __html: content }} />
        <div className="activity-actions">
          <div className="action-left">
            <LikeButton onClickEvent={this.likeReply} count={likesCount} />
            <span>Comments ({replyCount})</span>
          </div>
          <div className="action-right">
          {!showAllReplies ? <div className="comment-action" onClick={this.toggleAllReplies}>{replyCount > 0 ? `View Comments` : `Add Comment`}</div> : null}
          </div>
          {showAllReplies ? <div>
            <div className="comment-action" onClick={this.toggleAllReplies}>Close Comments</div>
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
        <Modal
          ariaHideApp={false}
          isOpen={isOpen}
          style={customModalStyles}
          contentLabel="Comment Item"
          onRequestClose={this.closeModal}
        >
          <i className="fa fa-close" onClick={this.closeModal} />
          <p className="" dangerouslySetInnerHTML={{ __html: likePrompt }} />
        </Modal>
        <style jsx>{`
          .comment-item {
            ${dropShadowedContainer};
            margin: 25px;
            padding: 25px;
            font-family: ${primaryFont};
            color: ${darkGray};
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
            border-bottom: 1px solid ${lightGray};
          }
          .display-name {
            margin-left: 10px;
          }

          .content {
            font-family: ${secondaryFont};
            font-size: 19px;
            color: ${darkGray};
            padding: 25px 0;
          }

          .date {
            text-align: right;
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
