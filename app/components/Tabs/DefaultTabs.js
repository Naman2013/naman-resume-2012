import React from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import classnames from 'classnames';

import { pink, white } from '../../styles/variables/colors';

const propTypes = {
  handleTabSelect: PropTypes.func,
  selectedIndex: PropTypes.number,
};

const defaultProps = {
  handleTabSelect: noop,
  selectedIndex: 0,
};

const DefaultTabs = ({ handleTabSelect, selectedIndex }) => (
  <div className="root">
    <Tabs onSelect={handleTabSelect} selectedTabIndex={selectedIndex}>

      <TabList className="tab-list">
        <Tab className="tab">
          <button className="action">Tab 1</button>
        </Tab>

        <Tab className="tab">
          <button className="action">Tab 2</button>
        </Tab>
      </TabList>

      <TabPanel className="tab-content">
        <aside>
          <p>Content 1</p>
        </aside>
      </TabPanel>

      <TabPanel className="tab-content">
        <aside>
          <p>Content 2</p>
        </aside>
      </TabPanel>

    </Tabs>

    <style jsx>{`
      .root {
        min-width: 100%;
        min-height: 100%;
        border: 1px solid #f00;
      }

      .tab-list {
        list-style-type: none;
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: space-evenly;
      }

      .action {
        cursor: pointer;
        background-color: ${pink};
        border: none;
        color: ${white};
      }
    `}</style>
  </div>
);

DefaultTabs.defaultProps = defaultProps;
DefaultTabs.propTypes = propTypes;

export default DefaultTabs;
