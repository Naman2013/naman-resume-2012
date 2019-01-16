import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Request from '../network/Request';
import style from './ImagePreview.style';

const { string, number } = PropTypes;

export default class ImagePreview extends React.PureComponent {
  static propTypes = {
    url: string.isRequired,
    id: number.isRequired,
  };

  render() {
    const { url, id } = this.props;
    return (
      <Fragment>
        <Request
          serviceURL={url}
          method="POST"
          requestBody={{
            imageRelatedRecordId: id,
          }}
          render={({ fetchingContent, serviceResponse }) => (
            <img
              className="image"
              src={serviceResponse.imageFullsizeURL}
              alt={serviceResponse.imageAltText}
            />
          )}
        />
        <style jsx>{style}</style>
      </Fragment>
    );
  }
}
