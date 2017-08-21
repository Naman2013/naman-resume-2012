import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { white, turqoise, lightTurqoise, darkBlueGray } from '../../../styles/variables/colors';
import { borderRadius } from '../../../styles/mixins/utilities';

const { bool } = PropTypes;
const menuHeight = 200;
class ContextMenu extends Component {

  static propTypes = {
  };
  static defaultProps = {};

  state = {
    elem: null,
    left: '-275px',
    top: '-75px',
    showMenu: false,
  }
  handleContextClick(e) {
    const elemPos = e.target.getBoundingClientRect();
    this.setState({
      elem: e.target,
      showMenu: true,
    });

    if ((elemPos.bottom + menuHeight) > window.innerHeight) {
      this.setState({
        top: `-${menuHeight-25}px`,
      });
    }

  }

  render() {
    // const {
    //   showMenu
    // } = this.props;

    const { left, top, showMenu } = this.state;
    console.log(this.state)
    const positionStyle = {
      position: 'absolute',
      top,
      left,
    };

    return (
      <div className="menu-container" style={positionStyle}>
        {showMenu && <div className="menu-root">
          Menu
          </div>}
          <style jsx>{`
            .menu-container {
              position: absolute;
            }
            .menu-root {

              height: ${menuHeight}px;
              width: 300px;
              background-color: ${white};
            }
          `}</style>
      </div>
    );
  }
}

export default ContextMenu;
