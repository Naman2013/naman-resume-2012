import React, { Component, PropTypes } from 'react';
import style from './interactive-viewer.scss';

const ZOOM_MULTIPLIER = 0.5;

class InteractivePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentX: 0,
      currentY: 0,
      currentScale: 1,
      enableMove: false,
    };
  }

  /** control api */
  pan(factor) {
    this.setState({
      currentX: 0,
      currentY: 0,
    });
  }

  /** event api's */
  handleZoomClick(event) {
    const { currentScale } = this.state;
    this.setState({
      currentScale: currentScale + ZOOM_MULTIPLIER,
    });
  }

  handleMouseDown(event) {
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
    const { currentScale } = this.state;

    const viewerContentStyle = {
      'transform': `scale(${currentScale})`,
      'transformStyle': 'flat',
    };

    return(
      <div className="interactive-viewer-container">

        <div className="icons">
          <img src={'/assets/images/icons/icon-magnification-minus.png'} className="icon minus" />
          <button
            onClick={this.handleZoomClick.bind(this)}
            className="icon plus">
              <span className="icon glyphicon-plus"></span>
          </button>
          <img src={'/assets/images/icons/icon-snapshot.png'} className="icon snapshot" />
          <img src={'/assets/images/icons/icon-circular-view.png'} className="icon circular-view" />
          <img src={'/assets/images/icons/icon-screen-view.png'} className="icon screen-view" />
        </div>

        <div
          onMouseDown={this.handleMouseDown.bind(this)}
          onMouseUp={this.handleMouseUp.bind(this)}
          onMouseMove={this.handleMouseMove.bind(this)}
          className="interactive-panel">

          <div
            style={viewerContentStyle}
            className="viewer-content">
            {children}
          </div>
        </div>
      </div>
    );
  }
}

export default InteractivePanel;
