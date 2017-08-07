import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { white, turqoise, lightTurqoise, darkBlueGray } from '../../../styles/variables/colors';
import { borderRadius } from '../../../styles/mixins/utilities';

const { bool } = PropTypes;

class ContextMenu extends Component {

  static propTypes = {
    showMenu: bool.isRequired,
  };
  static defaultProps = {};

  handleClick = (e) => {
    console.log('e', e)
  }

  render() {
    const {
      showMenu
    } = this.props;

    return (
      <div className="menu-container">
        {showMenu && <div className="menu-root">
          Menu
          </div>}
          <style jsx>{`
            .menu-container {

            }
            .menu-root {
              height: 300px;
              width: 200px;
              background-color: ${white};
            }
          `}</style>
      </div>
    );
  }
}

export default ContextMenu;
