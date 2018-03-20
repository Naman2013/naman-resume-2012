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
  <div>
    <ul>
      {
        items.content.map(item => (
          <li key={item.ID}>
            cloneElement(items.component, { ...item })
          </li>
        ))
      }
    </ul>
  </div>
);

export default MenuList;
