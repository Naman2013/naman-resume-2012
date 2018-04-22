/***********************************
* V4 Community Groups Header
*
*
*
***********************************/
import React, { Component } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { black, darkBlueGray, white } from '../../styles/variables/colors';

const {
  string,
} = PropTypes;

const GroupsSortNav = ({
  requestGroup,
  currentParentRoute,
}) => (
  <div className="groups-sort">
  <Link to={`/community-groups/${currentParentRoute}/alphabetic`} activeClassName="active-groups-sort-item">
    <span className="groups-sort-item-title">All</span>
  </Link>
  <Link to={`/community-groups/${currentParentRoute}/popular`} activeClassName="active-groups-sort-item">
    <span className="groups-sort-item-title">Most Popular</span>
  </Link>
  <div onClick={requestGroup}>
    <span className="groups-sort-item-title">Request Group</span>
  </div>
    <style jsx>{`
      .groups-sort {
        color: ${darkBlueGray};
        padding: 25px;
        display: flex;
        padding: 50px;
        flex-direction: row;
        align-items: center;
        justify-content: center;
      }

      .groups-sort-item-title {
        padding: 25px;
      }
      :global(.active-groups-sort-item) .groups-sort-item-title {
        font-weight: bold;
      }


    `}</style>
  </div>
);

export default GroupsSortNav;
