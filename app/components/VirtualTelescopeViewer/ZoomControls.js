import React from 'react';
import PropTypes from 'prop-types';
import NavigationTabs from './NavigationTabs';
import { brightGreen } from '../../styles/variables/colors';

const ZoomControls = ({ zoomRange }) => (
  <div className="root">
    <button className="top-button">+</button>
    <div className="tab-container">
      <NavigationTabs
        range={zoomRange}
      />
    </div>
    <button className="bottom-button">-</button>

    <style jsx>{`
      .root {
        color: ${brightGreen};
      }

      button {
        background: none;
        border: none;
        cursor: pointer;
        color: ${brightGreen}
      }

      .tab-container {
        margin: 20px 0;
      }
    `}</style>
  </div>
);

ZoomControls.defaultProps = {
  zoomRange: 6,
};

ZoomControls.propTypes = {
  zoomRange: PropTypes.number,
};

export default ZoomControls;
