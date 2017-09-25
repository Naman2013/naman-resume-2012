import React from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import uniqueId from 'lodash/uniqueId';
import classnames from 'classnames';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import { pink, white, turqoise } from '../../styles/variables/colors';
import { primaryFont } from '../../styles/variables/fonts';

function buttonClassnames(selectedIndex, index) {
  return classnames('action', {
    selected: selectedIndex === index,
  });
}

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

  const tabsText = tabConfiguration.map(tab => tab.tabText);
  const tabsContent = tabConfiguration.map(tab => tab.tabContent);

  return (
    <div className="root">
      <Tabs onSelect={handleTabSelect} selectedTabIndex={selectedIndex}>

        <TabList className="tab-list">
          {
            tabsText.map((tabText, index) =>
              <Tab key={uniqueId()} className="tab">
                <button className={buttonClassnames(selectedIndex, index)}>{tabText}</button>
              </Tab>)
          }
        </TabList>

        {
          tabsContent.map(tabContent =>
            <TabPanel key={uniqueId()} className="tab-content">
              <aside dangerouslySetInnerHTML={{ __html: tabContent }} />
            </TabPanel>)
        }
      </Tabs>

      <style jsx>{`
        .root {
          min-width: 100%;
          min-height: 100%;
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
          background-color: ${turqoise};
          border: none;
          color: ${white};
          width: 100%;
          text-align: center;
          padding: 15px 0;
          font-size: 1em;
          border-radius: 10px;
        }

        .action:focus {
          outline: none;
        }

        .action.selected {
          background-color: ${pink};
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
