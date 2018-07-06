import React from 'react';
import PropTypes from 'prop-types';
import { golda, blue_tile_feat } from '../../../styles/variables/colors_tiles_v4';

function calculateIconSize(dimension) {
  const iconToDimensionRatio = 0.5;
  return (dimension * iconToDimensionRatio);
}

const Medallion = ({ iconURL, dimension, theme }) => (
  <div
    style={theme}
  >
    <img
      alt=""
      width={calculateIconSize(dimension)}
      height={calculateIconSize(dimension)}
      src={iconURL}
    />
    <style jsx>
      {`
        div {
          position: relative;
          width: ${dimension}px;
          height: ${dimension}px;
          border-radius: 50%;
          border: 5px solid ${golda};
          background: url(${blue_tile_feat});
          margin: 0;
          padding: 0;
        }

        img {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      `}
    </style>
  </div>
);

Medallion.propTypes = {
  iconURL: PropTypes.string.isRequired,
  theme: PropTypes.shape({}),
  dimension: PropTypes.number,
};

Medallion.defaultProps = {
  theme: {},
  dimension: 50,
};

export default Medallion;
