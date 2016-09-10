import React, { Component, PropTypes } from 'react';
import style from './card-front.scss';

class CardFront extends Component {
  render() {
    return(
      <div className="telescope-card-front">
      <div className="card-header">
        <button
          onClick={this.props.handleFlip}
          className="flip-card-action">
          <img src="../../../assets/icons/flip-arrow.svg" />
        </button>

        <img src="../../../assets/icons/observatory.svg" width="50" height="50" />
        <h3 className="title">High-Magnification 1</h3>
        <p className="body">
          Best for Deep Sky Objects such as galaxies, nebulae, and star clusters.
        </p>

        <div className="call-to-action clearfix">
          <a className="col-md-5 action" href="">Visit Telescope Page</a>
          <a className="col-md-5 action" href="">Make Reservation</a>
        </div>
      </div>

      <div className="card-body">
        <div className="count-down">
          <h4 className="counter-text">3:18</h4>
        </div>

        <div className="image-viewer">
          <h4 className="title">LIVE Mission</h4>
          <div className="telescope-image">
            <img src="../../../assets/images/graphics/galaxy-circle.png" width="245" height="245" />
          </div>
          <h5 className="telescope-image-title">
            Andromeda Galaxy ( M31 )
          </h5>
        </div>

        <div className="sponsor">
          <p>Sponsored by: <img src="../../../assets/images/logos/celestron.png" width="150" /></p>
        </div>
      </div>
      </div>
    );
  }
}

CardFront.propTypes = {
  handleFlip: PropTypes.func,
};

export default CardFront;
