import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  items: PropTypes.shape({
    render: PropTypes.func.isRequired,
    content: PropTypes.arrayOf(
      PropTypes.shape({
        _ID: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
};

const MenuList = ({ items }) => (
  <div className="root">
    <ul className="menu-list">
      {items.content.map(item => (
        <li key={item._ID}>{items.render(item)}</li>
      ))}
    </ul>

    <style jsx>
      {`
        .menu-list {
          overflow-x: hidden;
          list-style-type: none;
          padding: 0;
          margin: 0;
        }

        .menu-list > li:first-child {
          margin-top: 20px;
        }
      `}
    </style>
  </div>
);

MenuList.propTypes = propTypes;

export default MenuList;
