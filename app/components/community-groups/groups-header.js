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
  This is a header.
  <div>
    <Link to={'/community-groups/public'} activeClassName="active-group-header-item">
      <span className="group-header-item-title">Public Groups</span>
    </Link>
  </div>
  <div>
    <Link to={'/community-groups/private'} activeClassName="active-group-header-item">
      <span className="group-header-item-title">Private Groups</span>
    </Link>
  </div>
  <div>
    <Link to={'/community-groups/my-groups'} activeClassName="active-group-header-item">
      <span className="group-header-item-title">My Groups</span>
    </Link>
  </div>
    <style jsx>{`
      :global(.active-group-header-item) .group-header-item-title {
        font-weight: bold;
      }

    `}</style>
  </div>
);

export default GroupsHeader;
