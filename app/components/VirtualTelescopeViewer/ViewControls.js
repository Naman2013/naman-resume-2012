import React from 'react';
import PropTypes from 'prop-types';

import { brightGreen } from '../../styles/variables/colors';
import { monoFont } from '../../styles/variables/fonts';

const propTypes = {
  handleClip: PropTypes.func.isRequired,
};

const ViewControls = ({
  handleClip,
}) => (
  <div>
    <div className="buttons-top-row">
      <button onClick={() => handleClip({ clip: true })} className="circle-view">
        <div className="circle-shape" />
      </button>
      <button onClick={() => handleClip({ clip: false })} className="full-view">
        <div className="square-shape" />
      </button>
    </div>

    <button className="show-info">Info</button>

    <style jsx>{`
      button {
        cursor: pointer;
        font-family: ${monoFont};
        background: none;
        border: 1px solid ${brightGreen}
        color: ${brightGreen}
        text-transform: uppercase;
        padding: 0;

        width: 60px;
        height: 60px;
      }

      .buttons-top-row {
        margin-bottom: 10px;
      }

      .circle-view {
        margin-right: 10px;
      }

      .circle-shape {
        width: 40px;
        height: 40px;
        border: 1px solid ${brightGreen}
        margin: 0 auto;
        border-radius: 50%;
      }

      .square-shape {
        width: 54px;
        height: 54px;
        margin: 0 auto;
        border: 1px dashed ${brightGreen};
      }
    `}</style>
  </div>
);

ViewControls.propTypes = propTypes;

export default ViewControls;
