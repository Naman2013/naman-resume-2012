import React, { Component, PropTypes } from 'react';
import style from './card-back.scss';

class CardBack extends Component {
  render() {
    return(
      <div className="telescope-card-back">
        <div className="card-header">

          <button
            onClick={this.props.handleFlip}
            className="flip-card-action">
            <img className="icon" src="assets/icons/flip-back-arrow.png" />
          </button>

          <img src="assets/icons/observatory.svg" width="50" height="50" />
          <h3 className="title">Telescope Name</h3>
        </div>

        <div className="telescope-specs">
          <figure className="telescope-image">
            <img src="assets/images/graphics/cluster.png" width="259" height="180" />
            <figcaption className="caption">Image taken by member Randy Suess on this telescope.</figcaption>
          </figure>

          <div className="content">
            <h3 className="title">Telescope Specifications:</h3>
            <ul className="spec-list">
              <li className="spec"><b>Max Image Resolution:</b> 3056x3056</li>
              <li className="spec"><b>Normal Resolution:</b> 1018 x 1018</li>
              <li className="spec"><b>Field of View (arc minutes):</b> 37x37</li>
              <li className="spec"><b>Stream Format:</b> Color PNGs to Mission Interface</li>
              <li className="spec"><b>Format Delivered:</b> PNG and FITS data</li>
            </ul>

            <h3 className="title">Location Data:</h3>
            <ul className="spec-list">
              <li className="spec"><b>Latitude:</b> N28.299.70 (N28 17’ 59”)</li>
              <li className="spec"><b>Longitude:</b> Q016.50826 (W016  30”  30”)</li>
              <li className="spec"><b>Altitude:</b> 2372 (77783 ft.)</li>
              <li className="spec"><b>Timezone:</b> WET</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

CardBack.propTypes = {
  handleFlip: PropTypes.func
};

export default CardBack;
