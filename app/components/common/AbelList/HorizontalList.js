import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import style from './HorizontalList.style';

const HorizontalList = ({ list, theme }) => (
  <Fragment>
    <ul style={theme}>
      {list.map(entry => <li key={`horizontal-list-${entry}`}>{entry}</li>)}
    </ul>
    <style jsx>{style}</style>
  </Fragment>
);

HorizontalList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.string).isRequired,
  theme: PropTypes.shape({}),
};

HorizontalList.defaultProps = {
  theme: {},
};

export default HorizontalList;
