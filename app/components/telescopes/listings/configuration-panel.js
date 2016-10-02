import React, { Component } from 'react';
import classnames from 'classnames';

import steps from './configuration.dummy.data';
import PanelColumn from './partials/panel-column';

// listing item building blocks
export default class ConfigurationPanel extends Component {
  constructor(props) {
    super(props);
  }

  render() {    

    return (
      <div className="row reservation-configuration">
        <div>
          <center>
            <div>please complete your reservation form</div>
            <div>within 04:47</div>
          </center>
        </div>

        <div className="row steps">
          {
            steps.map((step, index) => (
              <PanelColumn key={index} stepNumber={index + 1} {...step}/> 
            ))
          }
        </div>
      </div>
    );
  }
}
