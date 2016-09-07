/**
    TODO:
    1. takes a set of telescopes and renders cards
    for each of them

    2. provide the telescope card details down into the
    individual component...
*/

import React, { Component, PropTypes } from 'react';
import TelescopeCard from './telescope-card';

class TelescopeCards extends Component {
  render() {
    return(
      <div className="telescope-cards-container">
        <ul className="telescope-cards">
          <TelescopeCard />
        </ul>
      </div>
    );
  }
}

export default TelescopeCards;
