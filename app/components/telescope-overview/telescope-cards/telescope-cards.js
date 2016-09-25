import React, { Component, PropTypes } from 'react';
import TelescopeCard from './telescope-card';

import style from './telescope-cards.scss';

class TelescopeCards extends Component {

  renderTelescopeCards(obsTelescopes = []) {
    if( obsTelescopes.length === 0 ) {
      return null; //TODO: no telescope scenerio?
    }

    return obsTelescopes.map( telescope =>
      <TelescopeCard
        key={ telescope.teleUniqueId } 
        { ...telescope } /> );
  }

  render() {

    if(!this.props.observatory) {
      return null;
    }

    return(
      <div className="telescope-cards-container clearfix">
        <ul className="col-md-12 clearfix telescope-cards">
          { this.renderTelescopeCards( this.props.observatory.obsTelescopes ) }
        </ul>
      </div>
    );
  }
}

TelescopeCards.propTypes = {
  obsTelescopes: PropTypes.array
};

export default TelescopeCards;
