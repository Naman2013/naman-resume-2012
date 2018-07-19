import React from 'react';
import PropTypes from 'prop-types';
import SVGRoot from './SVGRoot';

const Dots = ({ theme }) => (
  <SVGRoot>
    <g className="dots-group-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g className="dots-group-2" transform="translate(-713.000000, -44.000000)" fill={theme.circleColor}>
        <g className="dots-group-3" transform="translate(696.000000, 20.000000)">
          <g className="dots-group-4" transform="translate(17.000000, 24.000000)">
            <circle className="dots-circle-1" transform="translate(16.000000, 2.000000) rotate(-360.000000) translate(-16.000000, -2.000000) " cx="16" cy="2" r="2" />
            <circle className="dots-circle-2" transform="translate(9.000000, 2.000000) rotate(-360.000000) translate(-9.000000, -2.000000) " cx="9" cy="2" r="2" />
            <circle className="dots-circle-3" transform="translate(2.000000, 2.000000) rotate(-360.000000) translate(-2.000000, -2.000000) " cx="2" cy="2" r="2" />
          </g>
        </g>
      </g>
    </g>
  </SVGRoot>
);

Dots.propTypes = {
  theme: PropTypes.shape({
    circleColor: PropTypes.string,
  }),
};

Dots.defaultProps = {
  theme: {
    circleColor: 'white',
  },
};

export default Dots;
