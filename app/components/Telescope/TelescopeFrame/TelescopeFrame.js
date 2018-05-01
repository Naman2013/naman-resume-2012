import React from 'react';
import PropTypes from 'prop-types';
import ROW_CONFIGURATION_ENUM from './rowConfigurationEnum';
import { generateRow } from './generateRow';

const propTypes = {
  length: PropTypes.number.isRequired,
  horizontalResolution: PropTypes.number,
  verticalResolution: PropTypes.number,
  increment: PropTypes.number,
  style: PropTypes.shape({
    stroke: PropTypes.string,
  }),
};

const defaultProps = {
  horizontalResolution: 75,
  verticalResolution: 75,
  increment: 5,
  style: {
    stroke: 'aqua',
  },
};

const TelescopeFrame = ({
  horizontalResolution, verticalResolution, increment, length, style,
}) => (
  <g className="root">
    <g>
      {generateRow(length, horizontalResolution, increment, ROW_CONFIGURATION_ENUM.TOP, style)}
    </g>

    <g>
      {generateRow(length, horizontalResolution, increment, ROW_CONFIGURATION_ENUM.BOTTOM, style)}
    </g>

    <g>
      {generateRow(length, verticalResolution, increment, ROW_CONFIGURATION_ENUM.LEFT, style)}
    </g>

    <g>
      {generateRow(length, verticalResolution, increment, ROW_CONFIGURATION_ENUM.RIGHT, style)}
    </g>
  </g>
);

TelescopeFrame.propTypes = propTypes;
TelescopeFrame.defaultProps = defaultProps;

export default TelescopeFrame;
