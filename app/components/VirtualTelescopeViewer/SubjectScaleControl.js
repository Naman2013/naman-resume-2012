import React from 'react';
import PropTypes from 'prop-types';

function generateScaleStyle(scale) {
  return {
    transform: `scale(${scale})`,
    transformStyle: 'flat',
  };
}

const propTypes = {
  scale: PropTypes.number,
  children: PropTypes.node,
};

const defaultProps = {
  scale: 1,
  children: null,
};

const SubjectScaleControl = ({
  children,
  scale,
}) => (
  <div style={generateScaleStyle(scale)} className="root">
    {children}

    <style jsx>{`
      transition: all .2s ease-in-out;
      transition-timing-function: ease;
    `}</style>
  </div>
);

SubjectScaleControl.propTypes = propTypes;
SubjectScaleControl.defaultProps = defaultProps;

export default SubjectScaleControl;
