/***********************************
* V4 Community Groups Member list Sort
*
*
*
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import classnames from 'classnames';
import take from 'lodash/take';
import uniqueId from 'lodash/uniqueId';
import { SORT_AZ, SORT_ZA, SORT_RANK, SORT_DATE } from 'modules/community-group-overview/actions';
import styles from './members-list.style';

const {
  bool,
  func,
  string,
} = PropTypes;

const GroupMemberListSort = ({
  fetchGroupMembers,
  renderList,
  membersSort,
  discussionGroupId,
}) => (
  <div className="">
    <div className="sort-button-container">
      <a
        onClick={() => fetchGroupMembers({ discussionGroupId, sortBy: SORT_AZ })}
        className={classnames('sort-button',{
          active: membersSort === SORT_AZ,
        })}
      >
        A-Z
        <div className="caret" />
      </a>
      <a
        onClick={() => fetchGroupMembers({ discussionGroupId, sortBy: SORT_ZA })}
        className={classnames('sort-button',{
        active: membersSort === SORT_ZA,
        })}
      >
        Z-A
        <div className="caret" />
      </a>
      <a
        onClick={() => fetchGroupMembers({ discussionGroupId, sortBy: SORT_RANK })}
        className={classnames('sort-button',{
          active: membersSort === SORT_RANK,
        })}
      >
        MVP
        <div className="caret" />
      </a>
    </div>
    {renderList()}
    <style jsx>{styles}</style>
  </div>
);


GroupMemberListSort.propTypes = {
  // isDesktop: bool.isRequired,
  discussionGroupId: string.isRequired,
  fetchGroupMembers: func.isRequired,
  renderList: func.isRequired,
  membersSort: string.isRequired,
};

export default GroupMemberListSort;
