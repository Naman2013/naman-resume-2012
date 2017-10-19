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
    <div className="generic-tabs-component">
      <Tabs
        onSelect={handleTabSelect}
        selectedIndex={selectedIndex}
      >

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
              {tabContent}
            </TabPanel>)
        }
      </Tabs>

      <style jsx>{`
        .generic-tabs-component {
          background-color: rgba(0, 0, 0, 0.25);
          min-width: 100%;
          min-height: 100%;
          font-family: ${primaryFont};
          padding: 2% 5%;
        }

        :global(.generic-tabs-component .tab-list) {
          list-style-type: none;
          margin: 0;
          margin-bottom: 20px;
          padding: 0;
          display: flex;
          justify-content: space-around;
        }

        :global(.generic-tabs-component .tab) {
          width: 20%;
          background: none;
          margin: 0 5px;
        }

        :global(.generic-tabs-component .action) {
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

        :global(.generic-tabs-component .action:focus) {
          outline: none;
        }

        :global(.generic-tabs-component .action.selected) {
          background-color: ${pink};
        }

        :global(.generic-tabs-component .tab-content) {
          width: 100%;
        }
      `}</style>
    </div>
  );
};

DefaultTabs.defaultProps = defaultProps;
DefaultTabs.propTypes = propTypes;

export default DefaultTabs;
