import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GenericButton from 'components/common/style/buttons/Button';
import setPostImage from 'services/post-creation/set-post-image';
import deletePostImage from 'services/post-creation/delete-post-image';
import ImagesInput from './partials/input';
import ImagesDisplay from './partials/display';
import styles from './upload-images.style';
import messages from './upload-images.messages';
import { FormattedMessage } from 'react-intl';

const {
  arrayOf,
  func,
  number,
  shape,
  string,
} = PropTypes;

class UploadImages extends Component {
  static propTypes = {
    imageClass: string.isRequired,
    onImagesChange: func.isRequired,
    uuid: string.isRequired,
    user: shape({
      at: string.isRequired,
      token: string.isRequired,
      cid: string.isRequired,
    }).isRequired,
    validateResponseAccess: func.isRequired,
  };

  static defaultProps = {

  };

  state = {
    uploadLoading: false,
    uploadError: null,
    imageInputValue: '',
  }

  handleUploadImage = (event) => {
    event.preventDefault();

    const { cid, token, at } = this.props.user;
    const { uuid, imageClass } = this.props;
    const data = new FormData();
    data.append('cid', cid);
    data.append('token', token);
    data.append('at', at);
    data.append('uniqueId', uuid);
    data.append('imageClass', imageClass);
    data.append('attachment', event.target.files[0]);

    this.setState({
      uploadLoading: true,
      uploadError: false,
    });

    setPostImage(data)
      .then(result => this.handleUploadImageResponse(result.data))
      .catch(err => this.setState({
        uploadError: err.message,
        uploadLoading: false,
      }));
  }

  handleDeleteImage = (e) => {
    e.preventDefault();
    const { url } = e.currentTarget.dataset;

    const { cid, token, at } = this.props.user;
    const { validateResponseAccess, uuid, imageClass } = this.props;
    deletePostImage({
      cid,
      token,
      at,
      uniqueId: uuid,
      imageClass,
      imageURL: url,
    }).then((result) => {
      validateResponseAccess(result);
      this.handleUploadImageResponse(result.data);
    });
  }

  handleUploadImageResponse = (uploadFileData) => {
    const images = uploadFileData.imageList.map(img => img.imageURL);
    this.setState({
      uploadLoading: false,
    });

    this.props.onImagesChange(images);
  }


  render() {
    const {
      S3URLs,
    } = this.props;

    const {
      uploadLoading,
      uploadError,
      imageInputValue,
    } = this.state;
    return (
      <div className="root">
        {uploadLoading ? <div>Loading...</div> : null}
        <ImagesDisplay S3URLs={S3URLs} handleDeleteImage={this.handleDeleteImage} />
        <ImagesInput handleUploadImage={this.handleUploadImage} imageInputValue={imageInputValue} />
        {uploadError && !uploadLoading ? <div><FormattedMessage {...messages.UploadImageErrorText} /></div> : null}
        <style jsx>{styles}</style>
      </div>
    );
  }
};

export default UploadImages;
