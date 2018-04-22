/***********************************
* V4 Community Groups List
*
*
*
***********************************/
import React, { Component } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import GroupListItem from './groups-list-item/';
import { black, darkBlueGray, white, turqoise } from '../../styles/variables/colors';
import { secondaryFont } from '../../styles/variables/fonts';

const {
  arrayOf,
  func,
  bool,
  shape,
  string,
} = PropTypes;

const ListOfGroups = ({
  askToJoin,
  groups,
  toggleJoinGroup,
}) => (
  <div className="groups-list">
    {groups.map(group => (
      <GroupListItem
        {...group}
        askToJoin={askToJoin}
        toggleJoinGroup={toggleJoinGroup}
        key={group.discussionGroupId}
      />))}
    <style jsx>{`
      .groups-list {
        display: flex;
        flex-direction: row;
      }
    `}</style>
  </div>
);

ListOfGroups.propTypes = {
  groups: arrayOf(shape({})),
  askToJoin: func.isRequired,
  toggleJoinGroup: func.isRequired,
};

ListOfGroups.defaultProps = {
  groups: [],
};


export default ListOfGroups;
