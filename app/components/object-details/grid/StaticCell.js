import React from 'react';
import PropTypes from 'prop-types';
import isUndefined from 'lodash/isUndefined';
import { screenMedium, screenLarge, screenXLarge } from 'styles/variables/breakpoints';
import { geyser } from 'styles/variables/colors_tiles_v4';
import style from './StaticCell.style';

function getScaleTarget(scale = [], targetIndex = 0) {
  return isUndefined(scale[targetIndex]) ? scale[scale.length - 1] : scale[targetIndex];
}

function getBorderStyle(hasBorder = false) {
  return (hasBorder) ? 'border-right: 1px solid;' : '';
}

const StaticCell = ({
  title,
  flexScale,
  hasBorderScale,
  minHeight,
  children,
}) => (
  <div
    className="root"
    style={{
      minHeight,
      borderColor: geyser,
    }}
  >
    <div className="positioning-container">
      { title && <h2 className="title">{title}:</h2> }
      {children}
    </div>
    <style jsx>{style}</style>
    <style jsx>
      {`
        .root {
          ${getBorderStyle(getScaleTarget(hasBorderScale, 0))}
          align-self: center;
          flex: ${getScaleTarget(flexScale, 0)};
        }

        @media ${screenMedium} {
          .root {
            ${getBorderStyle(getScaleTarget(hasBorderScale, 1))}
            flex: ${getScaleTarget(flexScale, 1)};
          }
        }

        @media ${screenLarge} {
          .root {
            ${getBorderStyle(getScaleTarget(hasBorderScale, 2))}
            flex: ${getScaleTarget(flexScale, 2)};
          }
        }

        @media ${screenXLarge} {
          .root {
            ${getBorderStyle(getScaleTarget(hasBorderScale, 3))}
            flex: ${getScaleTarget(flexScale, 3)};
          }
        }
      `}
    </style>
  </div>
);

StaticCell.propTypes = {
  title: PropTypes.string,
  flexScale: PropTypes.arrayOf(PropTypes.string),
  hasBorderScale: PropTypes.arrayOf(PropTypes.bool),
  minHeight: PropTypes.string,
  children: PropTypes.node.isRequired,
};

StaticCell.defaultProps = {
  title: '',
  flexScale: ['auto'],
  hasBorderScale: [false],
  minHeight: 'auto',
};

export default StaticCell;
