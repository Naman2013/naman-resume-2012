import React from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import classnames from 'classnames';

import { pink, white } from '../../styles/variables/colors';
import { primaryFont } from '../../styles/variables/fonts';

const propTypes = {
  handleTabSelect: PropTypes.func,
  selectedIndex: PropTypes.number,
  tabConfiguration: PropTypes.arrayOf(PropTypes.shape({
    tabText: PropTypes.string.isRequired,
    tabContent: PropTypes.node.isRequired,
  })),
};

const defaultProps = {
  handleTabSelect: noop,
  selectedIndex: 0,
  tabConfiguration: [],
};

const DefaultTabs = ({ handleTabSelect, selectedIndex, tabConfiguration }) => {
  if (tabConfiguration.length === 0) { return null; }

  return (
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
          font-family: ${primaryFont};
        }

        .tab-list {
          list-style-type: none;
          margin: 0;
          padding: 0;
          display: flex;
          justify-content: space-evenly;
        }

        .tab {
          width: 20%;
        }

        .action {
          cursor: pointer;
          background-color: ${pink};
          border: none;
          color: ${white};
          width: 100%;
          text-align: center;
          padding: 15px 0;
          font-size: 1em;
          border-radius: 10px;
        }

        .tab-content {
          width: 100%;
          text-align: center;
        }

        :global(.tab-content img) {
          min-width: 100%;
          min-height: 100%;
        }
      `}</style>
    </div>
  );
};

DefaultTabs.defaultProps = defaultProps;
DefaultTabs.propTypes = propTypes;

export default DefaultTabs;
