import React from 'react';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';
import NavigationTab from './NavigationTab';

function generateRange(range) {
  const rangeSet = [];

  for (let i = 0; i < range; i++) {
    rangeSet.push(0);
  }

  return rangeSet;
}

const NavigationTabs = ({ range }) => (
  <div className="root">
    <ul className="list">
      {
        generateRange(range).map(() =>
          <li key={uniqueId()} className="item">
            <NavigationTab />
          </li>
        )
      }
    </ul>

    <style jsx>{`
      .list {
        list-style-type: none;
        margin: 0 auto;
        padding: 0;
      }

      .item {
        margin: 11px 0 0 50%;
        transform: translateX(-60%);
      }
    `}</style>
  </div>
);

NavigationTabs.defaultProps = {
  range: 6,
};

NavigationTabs.propTypes = {
  range: PropTypes.number,
};

export default NavigationTabs;
