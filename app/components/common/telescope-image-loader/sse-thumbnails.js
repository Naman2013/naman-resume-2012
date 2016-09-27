import React, { Component, PropTypes } from 'react';
import ImageViewer from 'image-viewer';

const STATIC_PROGRESS = 70;

class TelescopeImageLoader extends Component {
  constructor( props ) {
    super( props );

    this.state = {
      backImageUrl: null,
      topImageUrl: null,
      timing: null,
      firstLoad: true,
      adjustedFadeIn: null,
      startingOpacity: null,
    };
  }

  handleSourceImage( imageData = [] ) {
    const { backImageUrl, topImageUrl, noop, timing } = imageData.split('|');
    this.setState({
      backImageUrl,
      topImageUrl,
      timing,
    });
  }

  componentWillMount() {
    this.sseSource = new EventSource( this.props.sourceUrl );
    this.sseSource.addEventListener(
      'message',
      event => this.handleSourceImage( event.data ), false );
  }

  componentWillUnmount() {
    this.sseSource.removeEventListener( 'message' );
  }

  handleBackImageOnLoad() {
    const progress = Math.floor(Date.now() / 1000) - this.state.timing;

    if( this.state.firstLoad ) {
      if( progress >= STATIC_PROGRESS ) {
        this.setState({
          adjustedFade: '0s',
          startingOpacity: '1',
        });
      } else {
        this.setState({
          adjustedFade: `${( STATIC_PROGRESS - progress )}s`,
          startingOpacity: Math.round( ( progress / 70 ) * 100 ) / 100,
        });
      }
    } else {
      this.setState({
        adjustedFade: `${STATIC_PROGRESS}s`,
        startingOpacity: '0'
      });
    }

    this.setState({
      topImageUrl:
      firstLoad: false,
    });
  }

  render() {
    return(
      <div className="sse-thumbnails">
        <div className="bottom-image">
          <img src={this.state.backImage} onLoad={this.handleBackImageOnLoad.bind( this )} />
        </div>

        <div className="top-image">
          <img src={this.state.topImageUrl} />
        </div>
      </div>
    );
  }
}

TelescopeImageLoader.propTypes = {
  sourceUrl: PropTypes.string,
};

export default TelescopeImageLoader;
