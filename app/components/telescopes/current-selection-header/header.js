import React, { Component } from 'react';
import { Link } from 'react-router';

import styles from './header.scss';

import SelectedTelescopeTitle from './selected-telescope-title';
import DatesSelection from './dates-selection';
import Tips from './tips';


export default class CurrentSelectionHeader extends Component {


  render() {
    return (
      <div className="current-selection-header">
        <SelectedTelescopeTitle />

        <div>
        	<DatesSelection />
        	<Tips />
        </div>        
      </div>      
    );
  }
}