/***********************************
* V4 Fullpage Form
*
*
*
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'components/common/style/buttons/Button';
import PhotoUploadButton from 'components/common/style/buttons/PhotoUploadButton';
import deletePostImage from 'services/post-creation/delete-post-image';
import setPostImages from 'modules/set-post-images';
import BackBar from 'components/common/style/buttons/BackBar';
import { prepareReply } from 'services/discussions/prepare-reply';
import styles from './Modals.style'

const {
  any,
  arrayOf,
  bool,
  func,
  number,
  oneOfType,
  shape,
  string,
} = PropTypes;

class FullpageForm extends Component {
  static propTypes = {
    modalActions: shape({
      closeModal: func,
      setModal: func,
      showModal: func,
    }).isRequired,
    user: shape({}),
    fieldPlaceholder: string,
    submitButtonText: string,
    prepareCall: func,
    submitForm: func.isRequired,
  };

  static defaultProps = {
    submitButtonText: 'Reply',
    prepareCall: prepareReply,
    fieldPlaceholder: 'Write your answer',
  };



  constructor(props) {
    super(props);
    const { user, prepareCall } = props;
    this.state = {
      fieldText: '',
      S3URLs: [],
      uuid: '',
    }
    prepareCall({
      at: user.at,
      token: user.token,
      cid: user.cid
    }).then((res) => {
      this.setState(() => ({
        uuid: res.data.postUUID,
      }));
    })
  }

  onChangeFieldText = (e) => {
    e.preventDefault();
    this.setState({
      fieldText: e.target.value,
    });
  }

  handleUploadImage = (event) => {
    event.preventDefault();

    const { cid, token, at } = this.props.user;
    const { uuid } = this.state;
    const data = new FormData();
    data.append('cid', cid);
    data.append('token', token);
    data.append('at', at);
    data.append('uniqueId', uuid);
    data.append('imageClass', 'discussion');
    data.append('attachment', event.target.files[0]);

    this.setState({
      uploadError: null,
      uploadLoading: true,
    });

    setPostImages(data)
      .then(res => this.handleUploadImageResponse(res.data))
      .catch(err => this.setState({
        uploadError: err.message,
        uploadLoading: false,
      }));
  }

  submitForm = (e) => {
    e.preventDefault();
    const {
      fieldText,
      S3URLs,
    } = this.state;

    if (fieldText.replace(/\s/g, '').length) {
      this.props.submitForm(fieldText, S3URLs);
    }
  }

  handleDeleteImage = (imageURL) => {
    if (!imageURL) { return; }

    const { cid, token, at } = this.props.user;
    const { uuid } = this.state;

    deletePostImage({
      cid,
      token,
      at,
      uniqueId: uuid,
      imageClass: 'discussion',
      imageURL,
    }).then(result => this.handleUploadImageResponse(result.data));
  }

  handleUploadImageResponse = (uploadFileData) => {
    this.setState({
      S3URLs: uploadFileData.S3URLs,
      uploadLoading: false,
    });
  }

  render () {
    const {

      modalActions,
      submitForm,
      fieldPlaceholder,
      submitButtonText,
    } = this.props;

    const {
      fieldText,
    } = this.state;

    return (
      <form className="fullpage-form">
        <BackBar onClickEvent={modalActions.closeModal} />
        <div className="input-container">
          <textarea
            className="field-input"
            value={fieldText}
            onChange={this.onChangeFieldText}
            placeholder={fieldPlaceholder}
          />
        </div>
        <div className="button-container">
          <div className="privacy-buttons">
            <PhotoUploadButton handleUploadImage={this.handleUploadImage} />
          </div>
          <div className="actions">
            <Button onClickEvent={this.submitForm} text={submitButtonText} theme={{ height: '40px' }} />
          </div>
        </div>
        <style jsx>{styles}</style>
      </form>
    );
  }
}


export default FullpageForm;
