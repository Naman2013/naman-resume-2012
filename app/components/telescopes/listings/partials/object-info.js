import React, { Component } from 'react';

/**
  based on whether or not this object is available
  this is responsible for the display of the current status
*/

export default function ObjectInfo({ isAvailable, onHold }) {
  if (isAvailable) {
    return (
      <div className="col-md-4 slot-description">
        <img className="slot-logo" src="assets/icons/alien-head.png" width="38" alt=""/>
        <span className="slot-name">This slot could be yours.</span>
      </div>
    );
  } else if (onHold) {
    return (
      <div className="col-md-3 slot-description">
        <img className="slot-logo" src="assets/icons/question-mark.png" width="38" alt=""/>
        <span className="slot-name">On Hold. Object Not Yet Set.</span>
      </div>
    );
  } else {
    return (
      <div className="col-md-3 slot-description">
        <img className="slot-logo" src="assets/icons/Jupiter.svg" width="38" alt=""/>
        <span className="slot-name">Jupiter</span>
      </div>
    );
  }

}
