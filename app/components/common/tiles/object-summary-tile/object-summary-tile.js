import React from 'react';
import PropTypes from 'prop-types';
import style from './object-summary-tile.style';

import Dots from 'atoms/icons/Dots';
import Close from 'atoms/icons/Close';

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

    <ul className="attribute-list">
      <li className="attribute">
        <Close theme={{ fillColor: 'red' }} />
        <p className="attribute-name">Galaxy</p>
      </li>
      <li className="attribute">
        <Close theme={{ fillColor: 'red' }} />
        <p className="attribute-name">Deep space</p>
      </li>
      <li className="attribute">
        <Close theme={{ fillColor: 'red' }} />
        <p className="attribute-name">Triangulum Australe</p>
      </li>
    </ul>

    <style jsx>{style}</style>
  </div>
);

export { ObjectSummaryTile };
