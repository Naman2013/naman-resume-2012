import React from 'react';
import PropTypes from 'prop-types';
import style from './MonotonousTile.style';

const MonotonousTile = ({ text, label }) => (
  <div className="root">
    <div className="title-label" dangerouslySetInnerHTML={{ __html: label }} />
    <div className="text" dangerouslySetInnerHTML={{ __html: text }} />
    <style jsx>{style}</style>
  </div>
);

MonotonousTile.propTypes = {
  text: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default MonotonousTile;
