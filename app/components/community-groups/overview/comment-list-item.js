/***********************************
* V4 Community Group Comment List Item
*
*
*
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  black,
} from '../../../styles/variables/colors';
import { profPic } from '../styles';

const {
  number,
  string,
} = PropTypes;


const CommentList = ({
  avatarURL,
  content,
  creationDate,
  displayName,
  freshness,
  membershipDisplay,
  replyId,
}) => (
  <div className="comment-item" key={replyId}>
    <div className="user-info">
      <div style={profPic(avatarURL)} />
      <div className="user-info-text">
        <h5 dangerouslySetInnerHTML={{ __html: displayName }} />
        <div dangerouslySetInnerHTML={{ __html: membershipDisplay }} />
      </div>
    </div>
    <span className="date"  dangerouslySetInnerHTML={{ __html: freshness}} />
    <div dangerouslySetInnerHTML={{ __html: content }} />
    <style jsx>{`
      .comment-item {
        margin: 25px;
        padding: 25px;
        margin-left: 50px;
        border: 1px solid ${black};
      }

      .user-info {
        display: flex;
        flex-direction: row;
      }
      .user-info-text {
        margin-left: 10px;
      }
    `}</style>
  </div>
);

CommentList.defaultProps = {
};
CommentList.propTypes = {
  avatarURL: string.isRequired,
  displayName: string.isRequired,
  content: string.isRequired,
  freshness: string.isRequired,
  likesCount: number.isRequired,
  replyCount: number.isRequired,
  replyId: number.isRequired,
  membershipDisplay: string.isRequired,
};

export default CommentList;
