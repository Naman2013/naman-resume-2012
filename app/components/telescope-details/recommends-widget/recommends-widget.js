import React, { Component } from 'react';
import './recommends-widget.scss';

class TelescopeRecommendsWidget extends Component {
  render() {
    return(
      <div className="recommends-widget telescope-details-widget">
        <div className="top">
          <div className="row">
          <div className="col-xs-12 ">
            <h3>Slooh Recommends</h3>
            <p>Reserve a mission by clicking on these currently visible objects…</p>
          </div>
          </div>
        </div>
        <div className="content">
          <div className="row">
            <div className="col-xs-12">
              <div className="col-xs-4">
                <img src="https://vega.slooh.com/assets/icons/saturn.svg" />
                <p>Saturn</p>
              </div>
              <div className="col-xs-4">
                <img src="https://vega.slooh.com/assets/icons/galaxy.svg" />
                <p>Quasar 3C273</p>
              </div>
              <div className="col-xs-4">
                <img src="https://vega.slooh.com/assets/icons/Jupiter.svg" />
                <p>Andromeda Galaxy (M31)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TelescopeRecommendsWidget;
