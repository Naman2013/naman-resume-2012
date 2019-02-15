import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Magnifier,
  MOUSE_ACTIVATION,
  TOUCH_ACTIVATION,
} from 'react-image-magnifiers';

import Request from '../network/Request';
import style from './ImagePreview.style';

const { string, number, bool } = PropTypes;

function preloadImage(url, handler) {
  const img = new Image();
  img.src = url;
  img.onload = handler;
}

export default class ImagePreview extends React.PureComponent {
  static propTypes = {
    url: string.isRequired,
    id: number.isRequired,
    withMagnifier: bool,
  };

  static defaultProps = {
    withMagnifier: false,
  };

  state = {
    imgLoaded: false,
  }

  handleImageLoad = () => {
    this.setState({ imgLoaded: true });
  }

  render() {
    const { url, id, withMagnifier } = this.props;
    const { imgLoaded } = this.state;
    return (
      <Fragment>
        <Request
          serviceURL={url}
          method="POST"
          requestBody={{
            imageRelatedRecordId: id,
          }}
          render={({ fetchingContent, serviceResponse }) => {
            if (!fetchingContent && !imgLoaded) preloadImage(serviceResponse.imageFullsizeURL, this.handleImageLoad);
            return withMagnifier
              ? (
                <div className="magnifier-wrapper">
                  {!fetchingContent && imgLoaded && <Magnifier
                    className="image"
                    imageSrc={serviceResponse.imageFullsizeURL}
                    largeImageSrc={serviceResponse.imageFullsizeURL}
                    imageAlt={serviceResponse.imageAltText}
                    mouseActivation={MOUSE_ACTIVATION.CLICK}
                    touchActivation={TOUCH_ACTIVATION.DOUBLE_TAP}
                  />}
                </div>
              ) : (
                <img
                  className="image"
                  src={serviceResponse.imageFullsizeURL}
                  alt={serviceResponse.imageAltText}
                />
              );
            }
          }
        />
        <style jsx>{style}</style>
      </Fragment>
    );
  }
}
