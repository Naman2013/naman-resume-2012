import React, { Component } from 'react';

export default function ObjectInfo({ isAvailable }) {
	if (isAvailable) {
		return (
	    <div className="col-md-4 slot-description">
	      <img className="slot-logo" src="assets/icons/alien-head.png" width="38" alt=""/>
	      <span className="slot-name">This slot could be yours.</span>
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

