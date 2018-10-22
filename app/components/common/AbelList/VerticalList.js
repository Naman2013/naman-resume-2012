import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import style from './VerticalList.style';

const VerticalList = ({ list }) => (
  <Fragment>
    <ul>
      {list.map(entry => <li key={`vertical-list-${entry}`}>{entry}</li>)}
    </ul>
    <style jsx>{style}</style>
  </Fragment>
);

VerticalList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.string),
};

VerticalList.defaultProps = {
  list: [],
};

export default VerticalList;
