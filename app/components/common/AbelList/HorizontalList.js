import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import style from './HorizontalList.style';

const HorizontalList = ({ list, theme, iconList }) => (
  <Fragment>
    <ul style={theme}>
      {list.map((entry, i) => (
        <li key={`horizontal-list-${entry}`}>
          {' '}
          {iconList[i] && <img className="bullet-image" src={iconList[i]} />}
          {entry}
        </li>
      ))}
    </ul>
    <style jsx>{style}</style>
  </Fragment>
);

HorizontalList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.string).isRequired,
  theme: PropTypes.shape({}),
  iconList: PropTypes.arrayOf(PropTypes.string),
};

HorizontalList.defaultProps = {
  theme: {},
  iconList: [],
};

export default HorizontalList;
