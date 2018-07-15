import React from 'react';
import PropTypes from 'prop-types';
import style from './CenterColumn.style';
import { defaultScale } from 'styles/variables/breakpoints';
import { defaultWidths } from './constants';

const CenterColumn = ({
  children,
  theme,
  breakpoints,
  widths,
}) => (
  <div className="root" style={theme}>
    {children}
    <style jsx>{style}</style>
    <style jsx>
      {`
        @media ${breakpoints[0]} {
          .root {
            width: ${widths[0]}
          }
        }

        @media ${breakpoints[1]} {
          .root {
            width: ${widths[1]}
          }
        }
        @media ${breakpoints[2]} {
          .root {
            width: ${widths[2]}
          }
        }
      `}
    </style>
  </div>);

CenterColumn.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.shape({}),
  breakpoints: PropTypes.arrayOf(PropTypes.string),
  widths: PropTypes.arrayOf(PropTypes.string),
};

CenterColumn.defaultProps = {
  theme: {},
  breakpoints: defaultScale,
  widths: defaultWidths,
};

export default CenterColumn;
