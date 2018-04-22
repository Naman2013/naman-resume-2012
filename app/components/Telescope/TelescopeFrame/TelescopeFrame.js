import React from 'react';
import PropTypes from 'prop-types';
import ROW_CONFIGURATION_ENUM from './rowConfigurationEnum';
import { generateRow, memoizedGenerateRow } from './generateRow';

const propTypes = {
  length: PropTypes.number.isRequired,
  resolution: PropTypes.number,
  increment: PropTypes.number,
  style: PropTypes.shape({
    stroke: PropTypes.string,
  }),
};

const defaultProps = {
  resolution: 75,
  increment: 5,
  style: {
    stroke: 'aqua',
  },
};

const TelescopeFrame = ({
  resolution, increment, length, style,
}) => (
  <g className="root">
    <g>
      {generateRow(length, resolution, increment, ROW_CONFIGURATION_ENUM.TOP, style)}
    </g>

    <g>
      {generateRow(length, resolution, increment, ROW_CONFIGURATION_ENUM.BOTTOM, style)}
    </g>

    <g>
      {generateRow(length, resolution, increment, ROW_CONFIGURATION_ENUM.LEFT, style)}
    </g>

    <g>
      {generateRow(length, resolution, increment, ROW_CONFIGURATION_ENUM.RIGHT, style)}
    </g>
  </g>
);

TelescopeFrame.propTypes = propTypes;
TelescopeFrame.defaultProps = defaultProps;

export default TelescopeFrame;
