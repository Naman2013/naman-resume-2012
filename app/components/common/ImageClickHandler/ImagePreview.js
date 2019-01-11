import React from 'react';
import PropTypes from 'prop-types';

import Request from '../network/Request';

const { string, number } = PropTypes;

export default class ImagePreview extends React.PureComponent {
  static propTypes = {
    url: string.isRequired,
    id: number.isRequired,
  };

  render() {
    const { url, id } = this.props;
    return (
      <Request
        serviceURL={url}
        method="POST"
        requestBody={{
          imageRelatedRecordId: id,
        }}
        render={({ fetchingContent, serviceResponse }) => (
          <img src={serviceResponse.imageFullsizeURL} alt={serviceResponse.imageAltText} />
        )}
      />
    );
  }
}
