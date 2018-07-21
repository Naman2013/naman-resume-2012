import React from 'react';
import MenuItem from './MenuItem';
import style from './Menu.style';

const Menu = () => (
  <ol className="menu-list">
    <MenuItem />
    <style jsx>{style}</style>
  </ol>
);

export default Menu;
