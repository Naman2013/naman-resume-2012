/***********************************
* V4 Community Groups Header
*
*
*
***********************************/
import React, { Component } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { black, darkBlueGray, white, turqoise } from '../../styles/variables/colors';
import { secondaryFont } from '../../styles/variables/fonts';

const {
  string,
} = PropTypes;

const GroupsHeader = () => (
  <div className="groups-header">
    <h4>Slooh Community</h4>
    <h3>Discussion Groups</h3>
    <nav className="nav-container">
      <Link to={'/community-groups/public'} activeClassName="active-group-header-item">
        <span className="group-header-item-title">Public Groups</span>
      </Link>
      <Link to={'/community-groups/private'} activeClassName="active-group-header-item">
        <span className="group-header-item-title">Private Groups</span>
      </Link>
      <Link to={'/community-groups/my-groups'} activeClassName="active-group-header-item">
        <span className="group-header-item-title">My Groups</span>
      </Link>
    </nav>
    <style jsx>{`
      .groups-header {
        background-color: ${darkBlueGray};
        text-align: center;
        padding: 25px;
      }

      .group-header-item-title {
        padding: 25px;
        color: ${white};
      }
      :global(.active-group-header-item) .group-header-item-title {
        font-weight: bold;
      }

      .nav-container {
        display: flex;
        padding: 50px;
        flex-direction: row;
        align-items: center;
        justify-content: center;
      }

    `}</style>
  </div>
);

export default GroupsHeader;
