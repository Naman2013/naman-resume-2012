import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Menu from './Menu';
import VanillaButton from 'atoms/VanillaButton';
import Dots from 'atoms/icons/Dots';
import Close from 'atoms/icons/Close';
import { thatBlue, astronaut } from 'styles/variables/colors_tiles_v4';
import style, { CONTAINER_WIDTH } from './ContextMenu.style';

const OPEN_LOCATION = 0;
export const CLOSE_LOCATION = -CONTAINER_WIDTH;

class ContextMenu extends Component {
  state = {
    isOpen: false,
  };

  toggle = () => { this.setState(prevState => ({ isOpen: !prevState.isOpen })); }

  render() {
    const { isOpen } = this.state;
    const containerLeft = (isOpen) ? OPEN_LOCATION : CLOSE_LOCATION;

    return (
      <div className="root">
        <VanillaButton
          handleClick={this.toggle}
          theme={{ width: '100px', height: '100px', backgroundColor: (isOpen) ? 'white' : thatBlue }}
        >
          {(isOpen) ? <Close theme={{ fillColor: astronaut }} /> : <Dots />}
        </VanillaButton>

        <div
          className="menu-container"
          style={{
            right: `${containerLeft}px`,
          }}
        >
          <div className="header-container">
            <h5 className="context-header">Sample title</h5>
            <p className="available-sections">( 8 )</p>
          </div>

          <Menu />
        </div>
        <style jsx>{style}</style>
      </div>
    );
  }
}

export default ContextMenu;
