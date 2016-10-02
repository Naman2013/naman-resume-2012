import React, { Component } from 'react';
import { Link } from 'react-router';
import OptionListItem from './option-list-item';

export default class PanelColumn extends Component {

  getOptionsList() {
    const list = this.props.list || [];

    return (
      <div className="option-list">
        {
          list.map((item, i) => (
            <OptionListItem key={i} {...item} />
          ))
        }
      </div>
    );
  }

  render(){

    return (
      <div className="col-md-4 panel-column step">
        <center>
          <div className="step-header">
            <div className="step-header_icon">
              {this.props.stepNumber}
            </div>
            <div className="step-header_label">
              {this.props.label}
            </div>
          </div>

          <div className="step-content">
            {
              this.getOptionsList()
            }
          </div>
        </center>
      </div>
    );
  }
}
