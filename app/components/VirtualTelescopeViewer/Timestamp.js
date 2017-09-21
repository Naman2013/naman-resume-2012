import React from 'react';
import PropTypes from 'prop-types';
import InlineCountdown from '../common/inline-countdown';

import { brightGreen } from '../../styles/variables/colors';

const propTypes = {
  unixTimestamp: PropTypes.number,
};

const defaultProps = {
  unixTimestamp: 0,
};

function Timestamp({ unixTimestamp }) {
  if (!unixTimestamp) { return null; }

  return (
    <div className="root">
      <h5 className="content">
        <InlineCountdown
          incrementTime={true}
          startTime={unixTimestamp}
          format={'YYYY-M-DDTH:mmUTC'}
        />
      </h5>

      <style jsx>{`
        .root {
          margin-top: 15px;
          text-align: center;
        }

        :global(.root .inline-countdown) {
          display: inline;
        }

        .content {
          border: 1px solid ${brightGreen};
          padding: 0 5px;
          margin: 0;
          display: inline;
        }
      `}</style>
    </div>
  );
}

Timestamp.propTypes = propTypes;
Timestamp.defaultProps = defaultProps;

export default Timestamp;
