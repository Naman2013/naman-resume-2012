import React from 'react';
import PropTypes from 'prop-types';
import NavigationTab from './NavigationTab';

function generateRange(range) {
  const rangeSet = [];

  for (let i = 0; i < range; i++) {
    rangeSet.push(<NavigationTab />);
  }

  return rangeSet;
}

const NavigationTabs = ({ range }) => (
  <div className="root">
    <ul className="list">
      <li>
        { generateRange(range) }
      </li>
    </ul>

    <style jsx>{`
      .list {
        list-style-type: none;
        margin: 0;
        padding: 0;
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
