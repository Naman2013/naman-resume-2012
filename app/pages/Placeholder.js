import React, { Component } from 'react';
import HeroInspire from 'components/home/hero-inspire';

class Placeholder extends Component {

  componentDidMount() {
    console.log('A page will be displayed here in the future')
  }

  render() {

    return (
      <div className="root">
        <HeroInspire />
      </div>
    );
  }
}


export default Placeholder;
