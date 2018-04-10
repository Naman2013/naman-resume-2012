import React from 'react';
import PropTypes from 'prop-types';
import ROW_CONFIGURATION_ENUM from './rowConfigurationEnum';
import { generateRow } from './generateRow';

const propTypes = {
  length: PropTypes.number.isRequired,
  count: PropTypes.number,
  style: PropTypes.shape({
    stroke: PropTypes.string,
  }),
};

const defaultProps = {
  count: 100,
  style: {
    stroke: 'aqua',
  },
};

const TelescopeFrame = ({ count, length, style }) => (
  <g className="root">
    <g>
      {generateRow(length, count, ROW_CONFIGURATION_ENUM.TOP, style)}
    </g>

    <g>
      {generateRow(length, count, ROW_CONFIGURATION_ENUM.BOTTOM, style)}
    </g>

    <g>
      {generateRow(length, count, ROW_CONFIGURATION_ENUM.LEFT, style)}
    </g>

    <g>
      {generateRow(length, count, ROW_CONFIGURATION_ENUM.RIGHT, style)}
    </g>
  </g>
);

TelescopeFrame.propTypes = propTypes;
TelescopeFrame.defaultProps = defaultProps;

export default TelescopeFrame;
