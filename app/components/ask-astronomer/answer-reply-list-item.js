/***********************************
* V4 Ask Astronomer Answer Reply List Item
*
*
*
***********************************/
import React from 'react';
import PropTypes from 'prop-types';
import { likeReply } from '../../services/discussions/like';
import Card from 'components/ask-astronomer/Card';
import { secondaryFont } from '../../styles/variables/fonts';
const {
  arrayOf,
  bool,
  func,
  number,
  shape,
  string,
} = PropTypes;

const ReplyListItem = (props) => {
  const {
    reply,
    isDesktop,
    user,
    likeParams,
  } = props;
  return (
    <div className="reply" key={reply.replyId}>
      <Card
        {...reply}
        replyTo={reply.replyId}
        likeHandler={likeReply}
        isDesktop={props.isDesktop}
        allowReplies={false}
        user={user}
        commentText="Replies"
      />

      <style jsx>{`
        .reply {

        }
      `}</style>
    </div>
  );
}

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
