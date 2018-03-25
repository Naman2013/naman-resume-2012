import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

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
}) => (
  <div className="reply" key={reply.replyId}>
    <div><div style={avatarImgStyle(reply.avatarURL)}></div>{reply.displayName}</div>
    <div>{reply.content}</div>
    <div>
      <span>Like ({reply.likesCount})</span>
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
