import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { white } from '../../../styles/variables/colors';

const {
  bool,
  number,
  string,
  func,
} = PropTypes;

class ContextMenu extends Component {

  static propTypes = {
    menuHeight: number,
    menuWidth: number,
    distanceFromTrigger: number,
    backgroundColor: string,
    onShow: func,
  }

  static defaultProps = {
    // how tall the menu will be (in pixels)
    menuHeight: 300,
    // how wide the menu will be (in pixels)
    menuWidth: 200,
    // padding from the trigger button
    distanceFromTrigger: 15,
    // background color for menu
    backgroundColor: white,
    onShow: null,
  };

  state = {
    triggerElement: null,
    left: -(this.props.menuWidth + this.props.distanceFromTrigger),
    top: -(this.props.menuHeight / 2),
    showMenu: false,
  }

  handleContextClick = (e) => {
    const { onShow } = this.props;
    const { showMenu } = this.state;

    if (!showMenu) {
      onShow();
    }

    this.setState({
      showMenu: !showMenu,
    });
  }

  hideMenu = (e) => {
    this.setState({
      showMenu: false,
    });
  }

  render() {
    const {
      menuHeight,
      menuWidth,
      backgroundColor,
      children,
      className,
    } = this.props;

    const { left, top, showMenu } = this.state;

    const menuRootStyle = {
      position: 'absolute',
      top: `${top}px`,
      left: `${left}px`,
      height: `${menuHeight}px`,
      width: `${menuWidth}px`,
      backgroundColor,
    };

    const containerClass = classnames({
      notShown: !showMenu,
    });

    const rootClasses = classnames({
      [className]: !!className,
    });

    return (
      <div
        className={containerClass}
      >
        <div
          className="arrow-right"
        />
        <div
          onMouseLeave={this.hideMenu}
          style={menuRootStyle}
          className={rootClasses}
        >
          {children}
        </div>
        <style jsx>{`

          .notShown {
            visibility: hidden;
          }

          .arrow-right {
            position: absolute;
            left: 15px;
            width: 0;
            height: 0;
            border-top: 20px solid transparent;
            border-bottom: 20px solid transparent;
            border-left: 20px solid ${white};
          }

        `}</style>
      </div>
    );
  }
}

export default ContextMenu;
