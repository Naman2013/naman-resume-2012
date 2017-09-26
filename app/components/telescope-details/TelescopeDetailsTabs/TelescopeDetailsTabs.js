import React, { Component } from 'react';
import PropTypes from 'prop-types';
import tabConfiguration from './tab-configuration';
import DefaultTabs from '../../Tabs';


class TelescopeDetailsTabs extends Component {
  render() {
    return (
      <div>
        <DefaultTabs tabConfiguration={tabConfiguration} />
      </div>
    );
  }
}

export default TelescopeDetailsTabs;
