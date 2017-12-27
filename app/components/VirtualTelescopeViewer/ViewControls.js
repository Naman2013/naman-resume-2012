import React from 'react';
import PropTypes from 'prop-types';

import { brightGreen } from '../../styles/variables/colors';
import { monoFont } from '../../styles/variables/fonts';

const propTypes = {
  clipped: PropTypes.bool.isRequired,
  handleClip: PropTypes.func.isRequired,
  handleInfoClick: PropTypes.func.isRequired,
};

function generateInlineButtonStyle(active) {
  if (active) {
    return {
      backgroundColor: 'rgb(3, 20, 255)',
    };
  }

  return {};
}

const ViewControls = ({
  clipped,
  handleClip,
  handleInfoClick,
}) => (
  <div>
    <div className="buttons-top-row">
      <button
        style={generateInlineButtonStyle(clipped)}
        className="circle-view"
        onClick={() => handleClip({ clip: true })}
      >
        <div className="circle-shape" />
      </button>
      <button
        style={generateInlineButtonStyle(!clipped)}
        className="full-view"
        onClick={() => handleClip({ clip: false })}
      >
        <div className="square-shape" />
      </button>
    </div>

    <style jsx>{`
      .buttons-top-row {
        margin-bottom: 10px;
        display: flex;
      }

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
