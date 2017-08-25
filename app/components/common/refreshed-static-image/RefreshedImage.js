/**
  this component is designed to handle the displaying of some image
  and refreshing the image based on some duration
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
    imageURL: this.props.imageURL,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.imageURL !== this.props.imageURL) {
      this.bootstrapTimer();
    }
  }

  componentWillUnmount() {
    clearInterval(this.refreshInterval);
  }

  bootstrapTimer() {
    const { refreshIntervalSec, imageURL } = this.props;
    clearInterval(this.refreshInterval);
    if (refreshIntervalSec) {
      this.refreshInterval = setInterval(() => {
        const newImageURL = `${imageURL}?version=${new Date().getTime()}`;
        this.setState({
          imageURL: newImageURL,
        });
      }, refreshIntervalSec * 1000); // TODO: change to 1000
    }
  }

  render() {
    const { imageAltText } = this.props;
    const { imageURL } = this.state;
    return (
      <div>
        <img className="back" key={`${imageURL}-back`} alt={imageAltText} src={imageURL} />
        <img className="front" key={`${imageURL}-front`} alt={imageAltText} src={imageURL} />
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
