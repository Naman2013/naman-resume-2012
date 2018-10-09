import React from 'react';
import PropTypes from 'prop-types';
import style from './object-summary-tile.style';

import Dots from 'atoms/icons/Dots';

const ObjectSummaryTile = () => (
  <div className="object-summary-tile-root">
    <h4 className="title">Object Summary</h4>

    <div className="vertical-line" style={{ height: '40px' }} />

    <div className="icon-border">
      <div className="icon-inner-ring">
        <Dots />
      </div>
    </div>

    <div className="vertical-line" style={{ height: '40px' }} />
    <div className="horizontal-line" />

    <style jsx>{style}</style>
  </div>
);

export { ObjectSummaryTile };
