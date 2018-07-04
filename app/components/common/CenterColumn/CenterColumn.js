import React from 'react';
import PropTypes from 'prop-types';
import { screenMedium, screenLarge, screenXLarge } from '../../../styles/variables/breakpoints';
import {
  screenMediumWidth,
  screenLargeWidth,
  screenXLargeWidth,
} from './constants';

const CenterColumn = ({ children, theme }) => (
  <div className="root" style={theme}>
    {children}

    <style jsx>
      {`
        .root { width: 100%; }
        @media ${screenMedium} {
          .root { width: ${screenMediumWidth} }
        }
        @media ${screenLarge} {
          width: ${screenLargeWidth}
        }
        @media ${screenXLarge} {
          width: ${screenXLargeWidth}
        }
      `}
    </style>
  </div>
);

CenterColumn.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.shape({}),
};

CenterColumn.defaultProps = {
  theme: {},
};

export default CenterColumn;
