import React from 'react';
import PropTypes from 'prop-types';
import { ModuleHeader } from './module-header';
import style from './module-container.style';

const ModuleContainer = ({ children, title, titleIcon }) => (
  <div className="module-container">
    <ModuleHeader title={title} titleIcon={titleIcon} />
    {children}
    <style jsx>{style}</style>
  </div>
);

ModuleContainer.propTypes = {
  title: PropTypes.string.isRequired,
  titleIcon: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export { ModuleContainer };
