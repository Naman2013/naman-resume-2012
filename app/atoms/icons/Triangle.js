import React from 'react';
import PropTypes from 'prop-types';
import SVGRoot from './SVGRoot';

const Triangle = ({ width, height, theme }) => (
  <SVGRoot width={width} height={height}>
    <g id="SpecialGuides" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g id="02_GP_Special_Internal_Object_Mobile_a" transform="translate(-71.000000, -259.000000)" fill={theme.color}>
        <g id="PageTitle_and_Nav">
          <g id="Navigation" transform="translate(0.000000, 199.000000)">
            <polygon id="Rectangle-2" points="76 60 81 68 71 68" />
          </g>
        </g>
      </g>
    </g>
  </SVGRoot>
);

Triangle.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  theme: PropTypes.shape({
    color: PropTypes.string,
  }),
};

Triangle.defaultProps = {
  width: 10,
  height: 8,
  theme: { color: 'white' },
};

export default Triangle;
