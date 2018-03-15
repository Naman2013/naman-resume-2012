/***********************************
* V4 [Ask Astronomer] ]Navigation
*  Wrapper for SubPageNavigation component
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SubPageNavigation from '../sub-page-navigation/SubPageNavigation';


const generateNavItems = (objectId) => ([
  {
    title: 'Overview',
    link:`/object-details/${objectId}/overview`
  },
  {
    title: 'Ask an Astronomer',
    link:`/object-details/${objectId}/ask`
  }
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
