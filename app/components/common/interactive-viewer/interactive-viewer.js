import React, { Component, PropTypes } from 'react';
import Draggable from 'react-draggable';
import style from './interactive-viewer.scss';

const ZOOM_MULTIPLIER = 0.5;
const MINIMUM_ZOOM_SCALE = 1;
const FRAME_VIEW_TYPE_FULL = 'FRAME_VIEW_TYPE_FULL';
const FRAME_VIEW_TYPE_CIRCULAR = 'FRAME_VIEW_TYPE_CIRCULAR';

class InteractivePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentScale: 1,
      frameViewType: FRAME_VIEW_TYPE_FULL,
    };
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
    let newScale = currentScale - ZOOM_MULTIPLIER;
    newScale = newScale >= MINIMUM_ZOOM_SCALE ? newScale : MINIMUM_ZOOM_SCALE;

    this.setState({
      currentScale: newScale,
    });
  }

  handleGoingFullScreen(event) {
    console.log('go full screen');
  }

  handleCircularViewClick(event) {
    console.log('apply the clipping mask');

    this.setState({
      frameViewType: FRAME_VIEW_TYPE_CIRCULAR,
    });
  }

  handleFullFrameViewClick(event) {
    console.log('remove clipping mask');

    this.setState({
      frameViewType: FRAME_VIEW_TYPE_FULL,
    });
  }

  render() {

    const { children } = this.props;
    const { currentScale, frameViewType } = this.state;

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
          className="action full-screen-view">
          Full-screen view <span className="icon glyphicon glyphicon-fullscreen"></span>
        </button>

        {
          frameViewType === FRAME_VIEW_TYPE_CIRCULAR ?
            <button
              onClick={this.handleFullFrameViewClick.bind(this)}
              className="action circular-view">
                Full-frame view <span className="icon glyphicon glyphicon-sound-stereo"></span>
            </button>
            :
            <button
              onClick={this.handleCircularViewClick.bind(this)}
              className="action circular-view">
                Circular view <span className="icon glyphicon glyphicon-record"></span>
            </button>
        }

        {/*
          TODO: work out how starshare images will be taken
          <button
            className="action snapshot">
            <img src={'/assets/images/icons/icon-snapshot.png'} className="icon snapshot" />
          </button>
        */}

        <div className="interactive-panel">
          <div
            style={viewerContentStyle}
            className="viewer-content">
            <Draggable>
              <div>
                {children}
              </div>
            </Draggable>
          </div>
        </div>

      </div>
    );
  }
}

export default InteractivePanel;
