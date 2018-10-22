/***********************************
* V4 [Ask Astronomer] ]Navigation
*  Wrapper for SubPageNavigation component
***********************************/

import React from 'react';
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
    title: 'Ask',
    link:`/object-details/${objectId}/ask`
  },
  {
    title: 'Observations',
    link:`/object-details/${objectId}/observations`
  },
  {
    title: 'Shows',
    link:`/object-details/${objectId}/shows`
  },
  {
    title: 'Stories',
    link:`/object-details/${objectId}/stories`
  },
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
