import React, { Component } from 'react';
import PropTypes from 'prop-types';
import VanillaButton from 'atoms/VanillaButton';
import Dots from 'components/common/icons/Dots';

class ContextMenu extends Component {
  state = {
    isOpen: false,
  };

  toggle = () => { this.setState(prevState => ({ isOpen: !prevState.isOpen })); }

  render() {
    return (
      <div className="root">
        <VanillaButton
          handleClick={this.toggle}
          theme={{ width: '100px', height: '100px' }}
        >
          <Dots />
        </VanillaButton>
      </div>
    );
  }
}

export default ContextMenu;
