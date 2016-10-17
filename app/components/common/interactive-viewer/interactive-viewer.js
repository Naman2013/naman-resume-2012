import React, { Component, PropTypes } from 'react';
import style from './interactive-viewer.scss';

class InteractivePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentX: 0,
      currentY: 0,
      currentZ: 0,
    };
  }

  /** control api */
  zoom(factor) {
    this.setState({
      currentZ: 0,
    });
  }

  pan(factor) {
    this.setState({
      currentX: 0,
      currentY: 0,
    });
  }

  /** event api's */
  handleMouseScroll(event) {
    event.preventDefault();
    // TODO: zoom in or zoom out by step of scroll
  }

  handleDrag(event) {
    // TODO: control panning
    console.log(event);
  }

  handleOnMouseEnter(event) {
    console.log('mouse enter occurred');
  }

  handleOnMouseLeave(event) {
    console.log('mouse left... farewell.');
  }

  render() {

    const { children } = this.props;

      /* mouseScroll={this.handleMouseScroll.bind(this)}
      mouseDown={this.handleMouseDown.bind(this)}
      mouseEnter={this.handleMouseEnter.bind(this)}
      mouseLeave={this.handleMouseLeave.bind(this)} */

    return(
      <div
        onDrag={this.handleDrag.bind(this)}
        onMouseEnter={this.handleOnMouseEnter.bind(this)}
        onMouseLeave={this.handleOnMouseLeave.bind(this)}
        className="interactive-panel">

        <div className="icons">

          <img src={'/assets/images/icons/icon-magnification-minus.png'} className="icon minus" />
          <div className="icon plus"><span className="icon glyphicon-plus"></span></div>

          <img src={'/assets/images/icons/icon-snapshot.png'} className="icon snapshot" />
          <img src={'/assets/images/icons/icon-circular-view.png'} className="icon circular-view" />
          <img src={'/assets/images/icons/icon-screen-view.png'} className="icon screen-view" />
        </div>

        <div className="viewer-content">
          {children}
        </div>

      </div>
    );
  }
}

export default InteractivePanel;
