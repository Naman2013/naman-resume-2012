import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from './MenuItem';
import style from './Menu.style';

const Menu = ({ list }) => (
  <ol className="menu-list">
    {list.map(item => (<MenuItem key={`context-menu-${item.title}`} {...item} />))}
    <style jsx>{style}</style>
  </ol>
);

Menu.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    linkURL: PropTypes.string.isRequired,
  })).isRequired,
};

export default Menu;
