import React from 'react';
import PropTypes from 'prop-types';
import { shadows } from 'styles/variables/colors_tiles_v4';

const propTypes = {
  top: PropTypes.bool,
  bottom: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

const defaultProps = {
  top: true,
  bottom: true,
};

function hasBorder(hasBorder) {
  return (hasBorder) ? `1px solid ${shadows}` : 'none';
}

const BorderContainer = ({ children, top, bottom }) => {
  const inlineStyle = {
    borderTop: hasBorder(top),
    borderBottom: hasBorder(bottom),
  };

  return(
    <div style={inlineStyle} className="root">
      { children }

      <style jsx>{`
        .root {
          padding: 20px 0;
        }
      `}</style>
    </div>
  );
};

BorderContainer.propTypes = propTypes;
BorderContainer.defaultProps = defaultProps;

export default BorderContainer;
