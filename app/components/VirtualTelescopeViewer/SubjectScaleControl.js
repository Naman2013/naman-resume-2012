import React from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';

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

function killEvents(event) { event.preventDefault(); }

const SubjectScaleControl = ({
  children,
  scale,
}) => (
  <div className="root" style={generateScaleStyle(scale)}>
    <div onMouseDown={killEvents}>
      {children}
    </div>

    <style jsx>{`
      .root {
        transition: all .2s ease-in-out;
        transition-timing-function: ease;
      }
    `}</style>
  </div>
);

SubjectScaleControl.propTypes = propTypes;
SubjectScaleControl.defaultProps = defaultProps;

export default SubjectScaleControl;
