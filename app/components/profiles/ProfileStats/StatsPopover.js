/** *********************************
 * V4 Profile stats popover
 *
 ********************************** */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import styles from './StatsPopover.styles';

const { string, number, shape } = PropTypes;

class ProfileStatsItem extends Component {
  static propTypes = {
    selectedStats: string.isRequired,
    title: string.isRequired,
    total: PropTypes.oneOfType([string, number]).isRequired,
    show: string.isRequired,
    tabs: shape({}).isRequired,
  };

  state = {};

  render() {
    const { selectedStats, title, total, show, tabs } = this.props;

    const tabsList = tabs && tabs.tabsList.map(item => <Tab>{item}</Tab>);
    const tabPanels =
      tabs && tabs.panels.map(item => <TabPanel>{item}</TabPanel>);

    return (
      show && (
        <div className={`stats-popover ${selectedStats}`}>
          <div className="stats-popover-header">
            <div className="stats-popover-title">{title}</div>
            <div className="stats-popover-total">{total}</div>
          </div>

          <Tabs className="stats-popover-tabs">
            <TabList>{tabsList}</TabList>

            {tabPanels}
          </Tabs>
          <style jsx>{styles}</style>
        </div>
      )
    );
  }
}

export default ProfileStatsItem;
