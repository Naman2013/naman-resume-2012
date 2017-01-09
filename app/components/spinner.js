import React, { Component, PropTypes } from 'react';
import {Spinner as S} from 'react-spinner';

const Spinner = ({ children, fetching }) => {
  console.log(fetching);
  console.log(children);
  console.log(S);
  
  return <div>
    {fetching ? <S/> : children}
  </div>;
};


Spinner.propTypes = {
    fetching: PropTypes.bool.isRequired,
    children: PropTypes.any
};

export default Spinner;
