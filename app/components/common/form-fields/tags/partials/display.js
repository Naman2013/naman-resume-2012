import React from 'react';
import PropTypes from 'prop-types';
import styles from './display.style';

const {

} = PropTypes;
const DisplayTags = (props) => {
  return (
    <div className="root">
      <style jsx>{styles}</style>
    </div>
  );
};

DisplayTags.propTypes = {};

DisplayTags.defaultProps = {};

export default DisplayTags;
