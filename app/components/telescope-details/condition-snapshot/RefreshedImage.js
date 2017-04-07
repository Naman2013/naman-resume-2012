/**
  this component is designed to handle the displaying of some image
  and refreshing the image based on some duration
  */

import React, { Component, PropTypes } from 'react';
import { uniqueId } from 'lodash';

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
        this.setState({
          imageURL: `${imageURL}?cb=${uniqueId()}`,
        });
      }, refreshIntervalSec * 1000);
    }
  }

  render() {
    const { imageAltText } = this.props;
    const { imageURL } = this.state;
    return (
      <div>
        <img alt={imageAltText} src={imageURL} />
      </div>
    );
  }
}
