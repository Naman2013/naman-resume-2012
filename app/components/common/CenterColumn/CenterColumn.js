import React from 'react';
import PropTypes from 'prop-types';
import { defaultScale } from 'app/styles/variables/breakpoints';
import cx from 'classnames';
import style from './CenterColumn.style';
import { defaultWidths } from './constants';

const CenterColumn = ({
  children,
  theme,
  breakpoints,
  widths,
  customClass,
}) => (
  <div className={cx('root', customClass)} style={theme}>
    {children}
    <style jsx>{style}</style>
    <style jsx>
      {`
        @media ${breakpoints[0]} {
          .root {
            width: ${widths[0]};
          }
        }

        @media ${breakpoints[1]} {
          .root {
            width: ${widths[1]};
          }
        }

        @media ${breakpoints[2]} {
          .root {
            width: ${widths[2]};
          }
        }
      `}
    </style>
  </div>
);

CenterColumn.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.shape({}),
  breakpoints: PropTypes.arrayOf(PropTypes.string),
  widths: PropTypes.arrayOf(PropTypes.string),
  customClass: PropTypes.string,
};

CenterColumn.defaultProps = {
  theme: {},
  breakpoints: defaultScale,
  widths: defaultWidths,
};

export default CenterColumn;
