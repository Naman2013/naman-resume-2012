import React, { Component } from 'react';
import { Link } from 'react-router';

export default class CurrentSelectionHeader extends Component {


  render() {
    return (
      <div className="title-container clearfix row">
        <div className="telescope-title-container col-md-6">
          <img className="observatory" src="assets/icons/observatory.svg" width="48" height="47"/>

        	<span className="telescope-title big">Canary One: High-Mag 2</span>
        </div>

        <div className="sponsoredby col-md-6">
        	<span className="sponsoredby-text">
        		Sponsored by:
        	</span>
        	<img className="sponsoredby-logo" src="assets/icons/Celestron_Logo_as_of_2015.svg"/>
        </div>
      </div>      
    );
  }
}