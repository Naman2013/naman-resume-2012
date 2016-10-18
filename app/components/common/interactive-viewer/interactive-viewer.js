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
  handleZoomInClick(event) {
    const { currentScale } = this.state;
    this.setState({
      currentScale: currentScale + ZOOM_MULTIPLIER,
    });
  }

  handleZoomOutClick(event) {
    const { currentScale } = this.state;
    this.setState({
      currentScale: currentScale - ZOOM_MULTIPLIER,
    });
  }

  handleGoingFullScreen(event) {
    console.log('go full screen');
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

        <button
          onClick={this.handleZoomOutClick.bind(this)}
          className="action minus">
            <span className="icon glyphicon-minus"></span>
        </button>

        <button
          onClick={this.handleZoomInClick.bind(this)}
          className="action plus">
            <span className="icon glyphicon-plus"></span>
        </button>

        <button
          onClick={this.handleGoingFullScreen.bind(this)}
          className="action screen-view">
          Full screen view <span className="icon glyphicon glyphicon-fullscreen"></span>
        </button>

        {/*
          TODO: work out how starshare images will be taken
          <button
            className="action snapshot">
            <img src={'/assets/images/icons/icon-snapshot.png'} className="icon snapshot" />
          </button>
        */}

        <button
          className="action circular-view">
          <img src={'/assets/images/icons/icon-circular-view.png'} className="icon circular-view" />
        </button>


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
