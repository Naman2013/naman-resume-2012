import React, { Component, PropTypes } from 'react';
import style from './interactive-viewer.scss';

class InteractivePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentX: 0,
      currentY: 0,
      currentZ: 0,
      enableMove: false,
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
  handleMouseDown(event) {
    // TODO: control panning
    this.setState({
      enableMove: true,
    });
  }

  handleMouseUp(event) {
    this.setState({
      enableMove: false,
    });
  }

  handleMouseMove(event) {
    const { enableMove } = this.state;
    if(enableMove) {
      console.log('dragging');
    }
  }

  render() {

    const { children } = this.props;

    return(
      <div
        onMouseDown={this.handleMouseDown.bind(this)}
        onMouseUp={this.handleMouseUp.bind(this)}
        onMouseMove={this.handleMouseMove.bind(this)}
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
