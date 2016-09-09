import React, { Component, PropTypes } from 'react';

import style from './telescope-cards.scss';

class TelescopeCard extends Component {
  render() {
    return(
      <li className="col-md-4 telescope-card-front">
        <div className="card-header">

          <button className="flip-card-action">
            <span className="glyphicon glyphicon-share-alt"></span>
          </button>

          <img src="foo/foo.jpg" width="50" height="50" />
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
              <img src="foo/foo.jpg" width="245" height="245" />
            </div>
            <h5 className="telescope-image-title">
              Andromeda Galaxy ( M31 )
            </h5>
          </div>

          <div className="sponsor">
            <p>Sponsored by: <img src="foo.jpg" width="200" /></p>
          </div>
        </div>
      </li>
    );
  }
}

export default TelescopeCard;
