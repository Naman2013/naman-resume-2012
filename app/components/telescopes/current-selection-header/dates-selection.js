import React, { Component } from 'react';
import { Link } from 'react-router';

export default class CurrentSelectionHeader extends Component {


  render() {
    return (
      <div className="dates-selection">
        <div className="arrow-container col">
          <i className="icon arrow previous"></i> Back
        </div>
        <div className="when col">
          
          <div>
            <span className="subs">The night of</span>
          </div>

          <div>
            <span className="date">Wednesday, August 11, 2016</span>
          </div>

          <div>
            <span className="subs">Last updated 21 seconds ago.</span>
          </div>
        </div>
        <div className="arrow-container col">
          Next Day <i className="icon arrow next"></i>
        </div>
        
      </div>      
    );
  }
}