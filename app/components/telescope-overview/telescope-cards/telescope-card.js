import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

import CardFront from './card-front';
import CardBack from './card-back';

import style from './telescope-cards.scss';

class TelescopeCard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      flipped: false
    };
  }

  handleFlip(event) {
    event.preventDefault();
    const newFlipState = !this.state.flipped;
    this.setState({
      flipped: newFlipState
    });
  }

  render() {

    const cardClasses = classnames({
      'flipped': this.state.flipped,
      'col-md-4': true
    });

    return(
      <li className={cardClasses}>
        <CardFront handleFlip={this.handleFlip.bind(this)} />
        <CardBack handleFlip={this.handleFlip.bind(this)} />
      </li>
    );
  }
}

export default TelescopeCard;
