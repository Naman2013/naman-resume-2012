/***********************************
* V4 Community Group Comment List
*
*
*
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CommentListItem from './comment-list-item';
import {
  darkBlueGray,
  white,
} from '../../../styles/variables/colors';

const {
  arrayOf,
  bool,
  func,
  number,
  shape,
  string,
} = PropTypes;


const CommentList = ({
  displayedComments,
  threadId,
}) => (
  <div className="comment" key={threadId}>
    {displayedComments.map(displayedComment => (
      <CommentListItem {...displayedComment} />
    ))}
    <style jsx>{`
    `}</style>
  </div>
);

CommentList.defaultProps = {
  displayedComments: [],
};
CommentList.propTypes = {
  displayedComments: arrayOf(shape({})),
  threadId: number.isRequired,
};

export default CommentList;
