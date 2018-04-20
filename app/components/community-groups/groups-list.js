/***********************************
* V4 Community Groups List
*
*
*
***********************************/
import React, { Component } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import GroupListItem from './groups-list-item';
import { black, darkBlueGray, white, turqoise } from '../../styles/variables/colors';
import { secondaryFont } from '../../styles/variables/fonts';

const {
  arrayOf,
  bool,
  shape,
  string,
} = PropTypes;

const ListOfGroups = ({
  groups,
}) => (
  <div className="groups-list">
    {groups.map(group => (<GroupListItem {...group} key={group.discussionGroupId} />))}
    <style jsx>{`
      .groups-list {
      }
    `}</style>
  </div>
);

ListOfGroups.propTypes = {
  groups: arrayOf(shape({})),
};

ListOfGroups.defaultProps = {
  groups: [],
};


export default ListOfGroups;
