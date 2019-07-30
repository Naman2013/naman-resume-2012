import React from 'react';
import PropTypes from 'prop-types';
import { ModuleHeader } from './module-header';
import style from './module-container.style';

const ModuleContainer = props => {
  const { children, title, titleIcon, hideHeader } = props;
  return (
    <div className="module-container">
      {!hideHeader && <ModuleHeader title={title} titleIcon={titleIcon} />}
      {children}
      <style jsx>{style}</style>
    </div>
  );
};

ModuleContainer.propTypes = {
  title: PropTypes.string.isRequired,
  titleIcon: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export { ModuleContainer };
