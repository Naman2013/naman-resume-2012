import React, { Component, PropTypes } from 'react';

import Hero from '../components/home/hero';

import CONTENT from '../content/home';

class Home extends Component {

  fetchStaticHero() {
    return(
      <Hero {...CONTENT.STATIC_HERO} />
    );
  }

  render() {
    return(
      <div>
        {this.fetchStaticHero()}
      </div>
    );
  }
}

export default Home;
