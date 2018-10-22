import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const HR = ({ theme }) => (
  <Fragment>
    <hr style={theme} />
    <style jsx>
      {`
        hr {
          height: 0;
          border: 0;
          margin: 0;
          padding: 0;
          position: relative;
        }
      `}
    </style>
  </Fragment>
);

HR.propTypes = { theme: PropTypes.shape({}) };
HR.defaultProps = { theme: {} };

export default HR;
