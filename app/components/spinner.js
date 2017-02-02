import React, { Component, PropTypes } from 'react';
import {Spinner as S} from 'react-spinner';

const Spinner = ({ children, fetching }) => {
  return <div>
    {fetching ? <S/> : children}
  </div>;
};


Spinner.propTypes = {
    fetching: PropTypes.bool.isRequired,
    children: PropTypes.any
};

export default Spinner;
