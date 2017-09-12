import React from 'react';
import NavigationTab from './NavigationTab';

function generateRange(range) {
  const rangeSet = [];
  for (let i = 0; i++; i < range) {
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

export default NavigationTabs;
