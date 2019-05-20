import React from 'react';
import PropTypes from 'prop-types';
import style from './module-header.style';

const ModuleHeader = props => {
  const { title, titleIcon } = props;
  const cls = 'module-header';
  return (
    <div className={title && titleIcon ? `${cls} with-icon` : cls}>
      <h4 className="title">{title}</h4>
      {titleIcon && <i className={titleIcon} />}
      <style jsx>{style}</style>
    </div>
  );
};

ModuleHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

export { ModuleHeader };
