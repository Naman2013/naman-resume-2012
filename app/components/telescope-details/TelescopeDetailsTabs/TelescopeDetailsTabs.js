import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DefaultTabs from '../../Tabs';

const bodyTabContent = [
  {
    tabText: 'Day/Night Bar',
    tabContent: <h1>Day night bar...</h1>,
  },
  {
    tabText: 'All Sky Camera',
    tabContent: <h1>All sky camera</h1>,
  },
  {
    tabText: 'Dome Cam',
    tabContent: <h1>Dome cam...</h1>,
  },
  {
    tabText: 'Web Cam',
    tabContent: <h1>Web cam...</h1>,
  },
  {
    tabText: 'Weather info',
    tabContent: <h1>Weather...</h1>,
  },
];

class TelescopeDetailsTabs extends Component {
  render() {
    return (
      <div>
        <DefaultTabs tabConfiguration={bodyTabContent} />
      </div>
    );
  }
}

export default TelescopeDetailsTabs;
