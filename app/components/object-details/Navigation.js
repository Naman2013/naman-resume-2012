/***********************************
* V4 [Ask Astronomer] ]Navigation
*  Wrapper for SubPageNavigation component
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SubPageNavigation from '../common/sub-page-navigation';


const generateNavItems = (objectId) => ([
  {
    title: 'Overview',
    link:`/object-details/${objectId}/overview`
  },
  {
    title: 'Missions',
    link:`/object-details/${objectId}/missions`
  },
  {
    title: 'Quests',
    link:`/object-details/${objectId}/quests`
  },
  {
    title: 'Ask an Astronomer',
    link:`/object-details/${objectId}/ask`
  },
  {
    title: 'Shows',
    link:`/object-details/${objectId}/shows`
  },
  /*
  {
    title: 'Stories',
    link:`/object-details/${objectId}/stories`
  },  
  {
    title: 'Observations',
    link:`/object-details/${objectId}/log`
  },
  */
]);

const Navigation = ({ items, objectId }) => (
  <div className="navigation-root">
    <SubPageNavigation items={generateNavItems(objectId)} />
  </div>
);

Navigation.defaultProps = {
};

Navigation.propTypes = {

};

export default Navigation;
