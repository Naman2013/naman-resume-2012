import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  component: PropTypes.node.isRequired,
  content: PropTypes.arrayOf(PropTypes.shape({
    ID: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    anchor: PropTypes.string.isRequired,
  })),
};

const MenuList = ({ items }) => (
  <div className="root">
    <ul className="menu-list">
      {
        items.content.map(item => (
          <li key={item._ID}>
            { cloneElement(items.component, { ...item }) }
          </li>
        ))
      }
    </ul>

    <style jsx>{`
      .menu-list {
        list-style-type: none;
        padding: 0;
        margin: 0;
      }
    `}
    </style>
  </div>
);

export default MenuList;
