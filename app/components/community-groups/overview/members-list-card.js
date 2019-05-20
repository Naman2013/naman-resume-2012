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
import {
  SORT_AZ,
  SORT_ZA,
  SORT_RANK,
  SORT_DATE,
} from 'app/modules/community-group-overview/actions';
import styles, {
  profilePicSmall,
  profilePicLeader,
} from './members-list.style';

const { bool, func, string } = PropTypes;

const GroupMemberListSort = ({
  customerId,
  displayName,
  gravity,
  gravityLabel,
  hasLink,
  iconUrl,
  isModerator,
  isMonitor,
  theme,
  clubLeaderLabel,
  linkUrl,
}) => (
  <div className="members-list-card" key={uniqueId()} style={theme}>
    {clubLeaderLabel ? (
      <div>
        <p className="leader-label"> {clubLeaderLabel}</p>
        <div className="pic" style={profilePicLeader(iconUrl)} />
        <div
          className="leader-title"
          dangerouslySetInnerHTML={{ __html: displayName }}
        />
        <div className="leader-info">
          <span
            className="gravity-label"
            dangerouslySetInnerHTML={{ __html: gravityLabel }}
          />
          <div className="gravity-container">
            <img
              className="star"
              src="https://vega.slooh.com/assets/v4/common/star_icon.svg"
            />
            <span dangerouslySetInnerHTML={{ __html: gravity }} />
          </div>
        </div>
      </div>
    ) : (
      <>
        <div className="header">
          <div className="pic" style={profilePicSmall(iconUrl)} />
          <div
            className="user-title"
            dangerouslySetInnerHTML={{ __html: displayName }}
          />
        </div>
        <div className="member-info">
          <span
            className="gravity-label"
            dangerouslySetInnerHTML={{ __html: gravityLabel }}
          />
          <div className="gravity-container">
            <img
              className="star"
              src="https://vega.slooh.com/assets/v4/common/star_icon.svg"
            />
            <span dangerouslySetInnerHTML={{ __html: gravity }} />
          </div>
        </div>
      </>
    )}

    <style jsx>{styles}</style>
  </div>
);

GroupMemberListSort.propTypes = {
  theme: PropTypes.shape({}),
};

export default GroupMemberListSort;
