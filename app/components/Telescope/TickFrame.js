import React from 'react';
import PropTypes from 'prop-types';
import ROW_CONFIGURATION_ENUM from './rowConfigurationEnum';
import { generateRow } from './generateRow';

const propTypes = {
  length: PropTypes.number.isRequired,
  style: PropTypes.shape({
    stroke: PropTypes.string,
  }),
};

const defaultProps = {
  style: {
    stroke: 'aqua',
  },
};

const TickFrame = ({ length, style }) => (
  <g className="root">
    <g>
      {generateRow(length, 100, ROW_CONFIGURATION_ENUM.TOP, style)}
    </g>

    <g>
      {generateRow(length, 100, ROW_CONFIGURATION_ENUM.BOTTOM, style)}
    </g>

    <g>
      {generateRow(length, 100, ROW_CONFIGURATION_ENUM.LEFT, style)}
    </g>

    <g>
      {generateRow(length, 100, ROW_CONFIGURATION_ENUM.RIGHT, style)}
    </g>
  </g>
);

TickFrame.propTypes = propTypes;
TickFrame.defaultProps = defaultProps;

export default TickFrame;
