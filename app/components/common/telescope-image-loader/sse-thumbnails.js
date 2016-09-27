import React, { Component, PropTypes } from 'react';
import ImageViewer from 'image-viewer';

const STATIC_PROGRESS = 70;

class TelescopeImageLoader extends Component {
  constructor( props ) {
    super( props );

    this.state = {
      backImageUrl: null,
      topImageUrl: null,
      topImageUrlToLoad: null,
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
          adjustedFade: '0',
          startingOpacity: '1',
        });
      } else {
        this.setState({
          adjustedFade: STATIC_PROGRESS - progress ),
          startingOpacity: Math.round( ( progress / STATIC_PROGRESS ) * 100 ) / 100,
        });
      }
    } else {
      this.setState({
        adjustedFade: STATIC_PROGRESS,
        startingOpacity: '0'
      });
    }

    this.setState({
      topImageUrl: this.state.topImageUrlToLoad,
      firstLoad: false,

    });
  }

  render() {

    const opacityTransition = `opacity${this.state.adjustedFade}s`

    const topImageStyle = {
      WebkitTransition: opacityTransition,
      transition: opacityTransition,
      opacity: this.state.startingOpacity,
    };

    return(
      <div className="sse-thumbnails">
        <div className="bottom-image">
          <img
            src={this.state.backImage}
            onLoad={this.handleBackImageOnLoad.bind( this )} />
        </div>

        <div className="top-image">
          <img
            style={topImageStyle}
            src={this.state.topImageUrl} />
        </div>
      </div>
    );
  }
}

TelescopeImageLoader.propTypes = {
  sourceUrl: PropTypes.string,
};

export default TelescopeImageLoader;
