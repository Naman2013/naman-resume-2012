import React from 'react';
import PropTypes from 'prop-types';
import ROW_CONFIGURATION_ENUM from './rowConfigurationEnum';
import generateRow from './generateRow';

const TelescopeFrame = ({
  isGridVisible,
  horizontalResolution,
  increment,
  length,
  style,
}) => (
  <g className="root">
    <g>
      {
        generateRow(
          length,
          horizontalResolution,
          increment,
          ROW_CONFIGURATION_ENUM.TOP,
          style,
          isGridVisible,
        )
      }
    </g>

    <g>
      {
        generateRow(
          length,
          horizontalResolution,
          increment,
          ROW_CONFIGURATION_ENUM.BOTTOM,
          style,
          isGridVisible,
        )
      }
    </g>

    <g>
      {
        generateRow(
          length,
          horizontalResolution,
          increment,
          ROW_CONFIGURATION_ENUM.LEFT,
          style,
          isGridVisible,
        )
      }
    </g>

    <g>
      {
        generateRow(
          length,
          horizontalResolution,
          increment,
          ROW_CONFIGURATION_ENUM.RIGHT,
          style,
          isGridVisible,
        )
      }
    </g>
  </g>
);

TelescopeFrame.propTypes = {
  isGridVisible: PropTypes.bool,
  length: PropTypes.number.isRequired,
  horizontalResolution: PropTypes.number,
  increment: PropTypes.number,
  style: PropTypes.shape({
    stroke: PropTypes.string,
  }),
};

TelescopeFrame.defaultProps = {
  isGridVisible: false,
  horizontalResolution: 75,
  increment: 5,
  style: {
    stroke: 'aqua',
  },
};

export default TelescopeFrame;
