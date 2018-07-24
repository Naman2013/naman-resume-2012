import React from 'react';
import PropTypes from 'prop-types';
import style from './HorizontalScrollMenu.style';

const HorizontalScrollMenu = () => (
  <div>
    <ul>
      <li>
        <a href="#">Overview</a>
      </li>
      <li>
        <a href="#">Quests</a>
      </li>
      <li>
        <a href="#">Ask anyone</a>
      </li>
      <li>
        <a href="#">Chicken salad BLT</a>
      </li>
    </ul>
    <style jsx>{style}</style>
  </div>
);

export default HorizontalScrollMenu;
