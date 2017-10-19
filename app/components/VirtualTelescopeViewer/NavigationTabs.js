import React from 'react';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';
import NavigationTab from './NavigationTab';

function generateRange(range) {
  const rangeSet = [];
  const modifiedRange = range - 1;

  for (let i = 0; i < modifiedRange; i++) {
    rangeSet.push(0);
  }

  return rangeSet;
}

const NavigationTabs = ({ range, activeZoomLevel }) => (
  <div className="root">
    <ul className="list">
      {
        generateRange(range).map((ele, index) =>
          <li key={uniqueId()} className="item">
            <NavigationTab active={(index === activeZoomLevel)} />
          </li>
        )
      }
    </ul>

    <style jsx>{`
      .list {
        list-style-type: none;
        margin: 0 auto;
        margin-right: 4px;
        padding: 0;
        transform: rotate(180deg);
      }

      .item {
        margin: 0 0 10px 0;
      }
    `}</style>
  </div>
);

NavigationTabs.defaultProps = {
  range: 6,
};

NavigationTabs.propTypes = {
  range: PropTypes.number,
  activeZoomLevel: PropTypes.number.isRequired,
};

export default NavigationTabs;
