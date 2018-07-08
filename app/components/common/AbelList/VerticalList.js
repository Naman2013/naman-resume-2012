import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const VerticalList = ({ list }) => (
  <Fragment>
    <ul>
      <li>Test</li>
    </ul>
  </Fragment>
);

VerticalList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.string),
};

VerticalList.defaultProps = {
  list: [],
};

export default VerticalList;
