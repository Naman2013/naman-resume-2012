/***********************************
* V4 Discussions Comment Reply List Item
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
  black,
  darkGray,
  lightGray,
} from 'styles/variables/colors';
import { primaryFont, secondaryFont } from 'styles/variables/fonts';
import { customModalStyles, dropShadowContainer } from 'styles/mixins/utilities';
import LikeButton from 'components/common/style/buttons/LikeButton';
import { profPic } from './styles';


const {
  any,
  bool,
  number,
  shape,
  string,
} = PropTypes;


class CommentRepliesListItem extends Component {
  static defaultProps = {
    likeParams: {},
  };

  static propTypes = {
    avatarURL: string.isRequired,
    content: string.isRequired,
    customerId: string.isRequired,
    displayName: string.isRequired,
    creationDate: string.isRequired,
    likeParams: shape({}),
    likePrompt: string.isRequired,
    likesCount: number.isRequired,
    membershipDisplay: string.isRequired,
    replyId: number.isRequired,
    showLikePrompt: bool.isRequired,
  };

  state = {
    likesCount: this.props.likesCount,
    isOpen: false,
    likePrompt: this.props.likePrompt,
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

  closeModal = (e) => {

    // TODO: refactor Modal into higher component
    e.preventDefault();
    this.setState({
      isOpen: false,
    })
  }

  likeReply = (e) => {

    // TODO: refactor this into a reusable component
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

  render () {
    const {
      avatarURL,
      content,
      customerId,
      displayName,
      creationDate,
      likeParams,
      membershipDisplay,
      replyId,
      showLikePrompt,
    } = this.props;

    const {
      isOpen,
      likePrompt,
      likesCount,
    } = this.state;

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
          </div>
          <div className="action-right">
          </div>
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
            ${dropShadowContainer};
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

export default CommentRepliesListItem;
