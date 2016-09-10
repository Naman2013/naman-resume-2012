import React, { Component, PropTypes } from 'react';
import style from './card-back.scss';

class CardBack extends Component {
  render() {
    return(
      <div className="telescope-card-back">
        <div className="card-header">
          <img src="../../../assets/icons/observatory.svg" width="50" height="50" />
          <h3 className="title">Telescope Name</h3>
        </div>

        <div className="telescope-specs">
          <figure className="telescope-image">
            <img src="../../../assets/images/graphics/cluster.png" width="259" height="180" />
            <figcaption className="caption">Image taken by member Randy Suess on this telescope.</figcaption>
          </figure>
        </div>
      </div>
    );
  }
}

export default CardBack;
