import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import style from './VerticalList.style';

const VerticalList = ({ list, iconList }) => (
  <Fragment>
    <ul>
      {list.map((entry, i) => (
        <li key={`vertical-list-${entry}`}>
          {iconList[i] && <img className="bullet-image" src={iconList[i]} />}{' '}
          {entry}
        </li>
      ))}
    </ul>
    <style jsx>{style}</style>
  </Fragment>
);

VerticalList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.string),
  iconList: PropTypes.arrayOf(PropTypes.string),
};

VerticalList.defaultProps = {
  list: [],
  iconList: [],
};

export default VerticalList;
