/***********************************
* V4 Follow Object Button
* 
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';

const FollowObjectButton = ({ user, objectId }) => (
<div className="navigation-root">
  <SubPageNavigation items={generateNavItems(objectId)} />
</div>
);

FollowObjectButton.defaultProps = {
};

FollowObjectButton.propTypes = {

};

export default FollowObjectButton;
