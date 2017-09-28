import React from 'react';
import PropTypes from 'prop-types';
import NavigationTabs from './NavigationTabs';
import { brightGreen } from '../../styles/variables/colors';

const propTypes = {
  zoomRange: PropTypes.number,
  handleZoomIn: PropTypes.func.isRequired,
  handleZoomOut: PropTypes.func.isRequired,
};

const defaultProps = {
  zoomRange: 6,
};

const ZoomControls = ({
  zoomRange,
  handleZoomIn,
  handleZoomOut,
}) => (
  <div className="root">
    <button onClick={handleZoomIn} className="top-button">+</button>
    <div className="tab-container">
      <NavigationTabs
        range={zoomRange}
      />
    </div>
    <button onClick={handleZoomOut} className="bottom-button">-</button>

    <style jsx>{`
      .root {
        color: ${brightGreen};
      }

      button {
        background: none;
        border: 1px solid ${brightGreen};
        cursor: pointer;
        color: ${brightGreen}
      }

      .top-button {
        border-radius: 10px 10px 0 0;
      }

      .bottom-button {
        border-radius: 0 0 10px 10px;
      }

      .tab-container {
        margin: 20px 0;
      }
    `}</style>
  </div>
);

ZoomControls.defaultProps = defaultProps;
ZoomControls.propTypes = propTypes;
export default ZoomControls;
