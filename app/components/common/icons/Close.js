import React from 'react';
import PropTypes from 'prop-types';

const Close = ({ theme }) => (
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    width="12px"
    height="12px"
    viewBox="0 0 12 12"
  >
    <g className="close-root-group" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g className="close-icon-shape" transform="translate(-715.000000, -101.000000)" fill="#41566F" fillRule="nonzero">
        <g className="close-group" transform="translate(674.000000, 60.000000)">
          <path
            d="M52.5943801,43.3635864 L48.9584507,46.9999182 L52.5943801,50.6360777 C53.1352066,51.1771145 53.1352066,52.0535216 52.5943801,52.5945583 C52.3241563,52.8647839 51.9698751,53 51.6157662,53 C51.2610716,53 50.906756,52.8649906 50.6367389,52.5945583 L47.0000172,48.9579854 L43.3635711,52.5945239 C43.0933818,52.8647494 42.7390662,52.9999656 42.3846472,52.9999656 C42.0303316,52.9999656 41.6762571,52.8649561 41.4058266,52.5945239 C40.8650001,52.0537283 40.8650001,51.1772867 41.4058266,50.6360433 L45.0416526,46.9998837 L41.4056199,43.3635864 C40.8647934,42.8227564 40.8647934,41.9461425 41.4056199,41.4053125 C41.9463431,40.8648958 42.8224345,40.8648958 43.3633644,41.4053125 L46.9999828,45.0416443 L50.6363255,41.4053125 C51.1773588,40.8648958 52.0535536,40.8648958 52.5941734,41.4053125 C53.1352066,41.9461425 53.1352066,42.8227564 52.5943801,43.3635864 Z"
            className="close-path"
            transform="translate(47.000000, 47.000000) scale(1, -1) translate(-47.000000, -47.000000)"
          />
        </g>
      </g>
    </g>

    <style jsx>{`${theme}`}</style>
  </svg>
);

Close.propTypes = {
  theme: PropTypes.string,
};

Close.defaultProps = {
  theme: '',
};

export default Close;
