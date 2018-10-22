/***********************************
* V4 Ask Astronomer Answer Reply List Item
*
*
*
***********************************/
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { likeReply } from '../../services/discussions/like';
import Heart from '../common/heart/heart';
import { avatarImgStyle } from './styles';
import { black, darkBlueGray, white, turqoise } from '../../styles/variables/colors';
import { secondaryFont } from '../../styles/variables/fonts';
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
    <div><div style={avatarImgStyle(reply.avatarURL)} />
    <span className="display-name">{reply.displayName}</span></div>
    <div className="content" dangerouslySetInnerHTML={{ __html: reply.content }} />
    <div className="action-item">
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
        padding: 15px;
        margin-left: 25px;
      }

      .content {
        margin: 15px 0;
        font-family: ${secondaryFont};
        margin-left: 25px;
      }

      .display-name {
        margin: 0 5px;
        font-weight: bold;
        text-transform: uppercase;
        font-size: 10px;
      }

      .action-item {
        margin-left: 25px;
      }

      .action-item :global(.heart-wrapper) {
        display: inline-block;
      }

      .action-item :global(.likeText) {
        font-size: 16px;
        display: inline;
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
