import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import style from './HorizontalList.style';

const HorizontalList = ({ list, theme, iconList }) => (
  <Fragment>
    <ul style={theme}>
      {list.length > 0 ? list.map((entry, i) => (
        <li key={`horizontal-list-${entry}`}>
          {' '}
          <span className="list-container">
            {iconList[i] && <img className="bullet-image" src={iconList[i]} />}
            <p>{entry} </p>
          </span>
        </li>
      )):null}
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
