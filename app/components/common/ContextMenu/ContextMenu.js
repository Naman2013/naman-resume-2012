import React, { Component } from 'react';
import PropTypes from 'prop-types';
import VanillaButton from 'atoms/VanillaButton';
import Dots from 'atoms/icons/Dots';
import Close from 'atoms/icons/Close';
import { thatBlue, astronaut } from 'styles/variables/colors_tiles_v4';

class ContextMenu extends Component {
  state = {
    isOpen: false,
  };

  toggle = () => { this.setState(prevState => ({ isOpen: !prevState.isOpen })); }

  render() {
    const { isOpen } = this.state;
    return (
      <div className="root">
        <VanillaButton
          handleClick={this.toggle}
          theme={{ width: '100px', height: '100px', backgroundColor: (isOpen) ? 'white' : thatBlue }}
        >
          {(isOpen) ? <Close theme={{ fillColor: astronaut }} /> : <Dots />}
        </VanillaButton>
      </div>
    );
  }
}

export default ContextMenu;
