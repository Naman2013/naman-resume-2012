import React from 'react';
import PropTypes from 'prop-types';
import { ModuleHeader } from './module-header';
import style from './module-container.style';

const ModuleContainer = ({ children }) => (
  <div className="container">
    <ModuleHeader title="Where in the sky" />
    {children}
    <style jsx>{style}</style>
  </div>
);

ModuleContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export { ModuleContainer };
