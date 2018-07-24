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
import styles, { profilePicSmall } from './members-list.style';

const {
  bool,
  func,
  string,
} = PropTypes;

const GroupMemberListSort = ({
  customerId,
  displayName,
  gravity,
  gravityLabel,
  hasLink,
  iconUrl,
  isModerator,
  isMonitor,
  linkUrl
}) => (
  <div className="members-list-card" key={uniqueId()}>
    <div className="header">
      <div className="pic" style={profilePicSmall(iconUrl)} />
      <div className="user-title" dangerouslySetInnerHTML={{ __html: displayName }} />
    </div>
    <div className="member-info">
      <span className="gravity-label" dangerouslySetInnerHTML={{ __html: gravityLabel }} />
      <div className="gravity-container">
        <img className= "star" src="https://vega.slooh.com/assets/v4/common/star_icon.svg" />
        <span dangerouslySetInnerHTML={{ __html: gravity }} />
      </div>
    </div>
    <style jsx>{styles}</style>
  </div>
);


GroupMemberListSort.propTypes = {

};

export default GroupMemberListSort;
