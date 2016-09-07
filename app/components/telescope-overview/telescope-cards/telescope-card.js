import React, { Component, PropTypes } from 'react';

import style from './telescope-cards.scss';

class TelescopeCard extends Component {
  render() {
    return(
      <li className="col-md-4 telescope-card">
        <div className="header">
          <h3 className="title">High-Magnification 1</h3>
          <p className="body">
            Best for Deep Sky Objects such as galaxies, nebulae, and star clusters.
          </p>

          <div className="call-to-action">
            <a href="">Visit Telescope Page</a>
            <a href="">Make Reservation</a>
          </div>
        </div>

        <div className="image-viewer">
          <h4 className="title">Live Mission</h4>
          <div>
            IMAGE
          </div>
          <h5>Andromeda Galaxy ( M31 )</h5>
        </div>

        <div className="sponsor">
          <p>Sponsored by: IMAGE</p>
        </div>
      </li>
    );
  }
}

export default TelescopeCard;
