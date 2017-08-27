import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { white, darkBlueGray } from '../../../styles/variables/colors';

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
    leftOffset: number,
    backgroundColor: string,
    onShow: func,
    titleText: string,
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
    titleText: null,
    leftOffset: 0,
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
    e.preventDefault();

    this.setState({
      showMenu: false,
    });
  }

  render() {
    const {
      menuHeight,
      menuWidth,
      backgroundColor,
      leftOffset,
      children,
      className,
      titleText,
    } = this.props;

    const { left, top, showMenu } = this.state;
    const menuRootStyle = {
      position: 'absolute',
      top: `${top}px`,
      left: `${left + leftOffset}px`,
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
          style={{ left: `${15 + leftOffset}px` }}
        />
        <div
          onMouseLeave={this.hideMenu}
          style={menuRootStyle}
          className={rootClasses}
        >
          {titleText && <div className="header">
            <span dangerouslySetInnerHTML={{ __html: titleText }} />
            <i className="fa fa-close" onClick={this.hideMenu} />
          </div>}
          <div className="list">
            {children}
          </div>
        </div>
        <style jsx>{`

          .header {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            width: 100%;
            padding: 5px;
            color: ${white};
            background-color: ${darkBlueGray};
          }

          .notShown {
            visibility: hidden;
          }

          .list {
            height: 100%;
            overflow-y: auto;
          }

          .arrow-right {
            position: absolute;
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
