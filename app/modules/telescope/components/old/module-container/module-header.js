import React from 'react';
import PropTypes from 'prop-types';
import style from './module-header.style';

const ModuleHeader = ({ title }) => (
  <div className="module-header">
    <h4 className="title">{title}</h4>
    <style jsx>{style}</style>
  </div>
);

ModuleHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

export { ModuleHeader };
