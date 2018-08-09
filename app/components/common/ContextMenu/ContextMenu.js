import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Menu from './Menu';
import Fade from 'components/common/Fade';
import VanillaButton from 'atoms/VanillaButton';
import Dots from 'atoms/icons/Dots';
import Close from 'atoms/icons/Close';
import { thatBlue, astronaut } from 'styles/variables/colors_tiles_v4';
import style, { CONTAINER_WIDTH } from './ContextMenu.style';

const OPEN_LOCATION = 0;
export const CLOSE_LOCATION = -CONTAINER_WIDTH;

class ContextMenu extends Component {
  static propTypes = {
    isOpen: PropTypes.bool,
    menuTopAdjustment: PropTypes.number,
    title: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    list: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      linkURL: PropTypes.string,
    })).isRequired,
  };

  static defaultProps = {
    isOpen: false,
    menuTopAdjustment: 98,
  };

  state = {
    isOpen: this.props.isOpen,
  };

  toggle = () => { this.setState(prevState => ({ isOpen: !prevState.isOpen })); }

  render() {
    const { isOpen } = this.state;
    const containerLeft = (isOpen) ? OPEN_LOCATION : CLOSE_LOCATION;

    return (
      <div className="root">
        <Fade isHidden={!isOpen}>
          <div className="application-veil" />
        </Fade>

        <VanillaButton
          handleClick={this.toggle}
          theme={{
            width: '100px',
            height: '100px',
            backgroundColor: (isOpen) ? 'white' : thatBlue,
            position: 'relative',
            zIndex: '10',
          }}
        >
          {(isOpen)
            ? <Close theme={{ fillColor: astronaut }} />
            : <div className="dots-container"><Dots /></div>}
        </VanillaButton>

        <div
          className="menu-container"
          style={{
            right: `${containerLeft}px`,
          }}
        >
          <div className="header-container">
            <h5 className="context-header">{this.props.title}</h5>
            <p className="available-sections">( {this.props.count} )</p>
          </div>

          <Menu list={this.props.list} />
        </div>

        <style jsx>{style}</style>
        <style jsx>
          {`
            .menu-container {
              top: ${this.props.menuTopAdjustment}px;
            }

            .application-veil {
              width: 100vw;
              height: 100%;
              position: absolute;
              top: ${this.props.menuTopAdjustment}px;
              left: 0;
              background-color: rgba(0, 0, 0, 0.5);
              pointer-events: none;
            }
          `}
        </style>
      </div>
    );
  }
}

export default ContextMenu;
