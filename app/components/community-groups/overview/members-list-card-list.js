/***********************************
 * V4 Community Groups Member list
 *
 *
 *
 ***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';
import MembersListCard from './members-list-card';
import styles from './members-list.style';

const { bool, func, string } = PropTypes;

const GroupMembersCardList = ({ list }) => (
  <div className="">
    {list.map(listItem => (
      <MembersListCard {...listItem} key={uniqueId()} />
    ))}
    <style jsx>{styles}</style>
  </div>
);

GroupMembersCardList.propTypes = {
  // isDesktop: bool.isRequired,
  discussionGroupId: string.isRequired,
  fetchGroupMembers: func.isRequired,
  renderList: func.isRequired,
};

export default GroupMembersCardList;
