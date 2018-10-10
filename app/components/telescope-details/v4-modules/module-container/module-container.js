import React from 'react';
import PropTypes from 'prop-types';
import { ModuleHeader } from './module-header';
import style from './module-container.style';

const ModuleContainer = ({ children, title }) => (
  <div className="container">
    <ModuleHeader title={title} />
    {children}
    <style jsx>{style}</style>
  </div>
);

ModuleContainer.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export { ModuleContainer };
