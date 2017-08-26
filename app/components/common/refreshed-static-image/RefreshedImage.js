/**
  This component is designed to handle the displaying of some image
  and refreshing the image based on some duration.

  Due to the nature of loading images, this component will queue
  up two copies of the image and based on the onload event will fade in
  and replace content.
  */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class RefreshedImage extends Component {
  static propTypes = {
    imageURL: PropTypes.string.isRequired,
    refreshIntervalSec: PropTypes.number.isRequired,
    imageAltText: PropTypes.string,
  }

  static defaultProps = {
    imageAltText: '',
  }

  constructor(props) {
    super(props);
    this.bootstrapTimer();
  }

  state = {
    backImageURL: this.props.imageURL,
    frontImageURL: this.props.imageURL,
    frontImageOpacity: 0,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.imageURL !== this.props.imageURL) {
      this.bootstrapTimer();
    }
  }

  componentWillUnmount() {
    clearInterval(this.refreshInterval);
  }

  handleOnLoad = () => {
    const { frontImageURL } = this.state;
    this.setState({
      backImageURL: frontImageURL,
      frontImageOpacity: 0,
    });
  }

  bootstrapTimer() {
    const { refreshIntervalSec, imageURL } = this.props;
    clearInterval(this.refreshInterval);
    if (refreshIntervalSec) {
      this.refreshInterval = setInterval(() => {
        const newImageURL = `${imageURL}?version=${new Date().getTime()}`;
        this.setState({
          frontImageURL: newImageURL,
          frontImageOpacity: 1,
        });
      }, refreshIntervalSec * 50); // TODO: change to 1000
    }
  }

  render() {
    const { imageAltText } = this.props;
    const { backImageURL, frontImageURL } = this.state;
    return (
      <div>
        <img className="back" key={`${backImageURL}-back`} alt={imageAltText} src={backImageURL} />
        <img onLoad={this.handleOnLoad} className="front" key={`${frontImageURL}-front`} alt={imageAltText} src={frontImageURL} />

        <style jsx>{`
          div {
            position: relative;
          }

          .front {
            position: absolute;
            top: 0;
            left: 0;
          }

          img {
            width: 100%;
            height: auto;
          }
        `}</style>
      </div>
    );
  }
}
