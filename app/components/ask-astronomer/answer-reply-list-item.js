import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { likeReply } from '../../services/discussions/like';
import Heart from '../common/heart/heart';
import { avatarImgStyle } from './styles';

const {
  arrayOf,
  bool,
  func,
  number,
  shape,
  string,
} = PropTypes;

const ReplyListItem = ({
  reply,
  isTopReply,
  user,
  likeParams,
}) => (
  <div className="reply" key={reply.replyId}>
    <div><div style={avatarImgStyle(reply.avatarURL)}></div>{reply.displayName}</div>
    <div>{reply.content}</div>
    <div>
      <Heart
        likeAction={likeReply}
        theme="dark"
        count={reply.likesCount}
        authorId={reply.customerId}
        showLikePrompt={reply.showLikePrompt}
        likePrompt={reply.likePrompt}
        params={likeParams}
        />
    </div>

    <style jsx>{`
      .reply {
        margin-left: 15px;
        border: 1px solid black;
      }
    `}</style>
  </div>
);

ReplyListItem.defaultProps = {
  reply: {},
  isTopReply: false,
};
ReplyListItem.propTypes = {
  reply: shape({
    avatarURL: string.isRequired,
    displayName: string.isRequired,
    content: string.isRequired,
    likesCount: number.isRequired,
    replyId: number.isRequired,
  }),
  isTopReply: bool,
};

export default ReplyListItem;
