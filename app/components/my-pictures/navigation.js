import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class Navigation extends Component {
  render() {
    return(
      <div className="my-pictures-navigation">
        <ul>
          <li><Link to="my-pictures/photo-roll">Photo Roll</Link></li>
          <li><Link to="my-pictures/missions">Missions</Link></li>
          {/*
            coming soon...
            <li><Link to="my-pictures/galleries">Galleries</Link></li>
            <li><Link to="my-pictures/favorites">Favorites</Link></li>
            <li><Link to="my-pictures/slooh-most-popular">Slooh Most Popular</Link></li>
          */}
        </ul>
      </div>
    );
  }
}

export default Navigation;
