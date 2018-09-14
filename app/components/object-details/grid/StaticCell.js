import React from 'react';
import PropTypes from 'prop-types';
import isUndefined from 'lodash/isUndefined';
import DisplayAtBreakpoint from 'components/common/DisplayAtBreakpoint';
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
  children,
  displayAtBreakpoints,
  flexScale,
  hasBorderScale,
  title,
  theme,
}) => (
  <div
    className="root"
    style={Object.assign({
      borderColor: geyser,
    }, theme)}
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
  displayAtBreakpoints: PropTypes.shape({
    screenSmall: PropTypes.bool,
    screenMedium: PropTypes.bool,
    screenLarge: PropTypes.bool,
    screenXLarge: PropTypes.bool,
  }),
  flexScale: PropTypes.arrayOf(PropTypes.string),
  hasBorderScale: PropTypes.arrayOf(PropTypes.bool),
  children: PropTypes.node.isRequired,
  theme: PropTypes.shape({ }),
};

StaticCell.defaultProps = {
  title: '',
  displayAtBreakpoints: {
    screenSmall: true,
    screenMedium: true,
    screenLarge: true,
    screenXLarge: true,
  },
  flexScale: ['auto'],
  hasBorderScale: [false],
  theme: {},
};

export default StaticCell;
