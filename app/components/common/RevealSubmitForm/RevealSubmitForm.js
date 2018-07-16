/**
* V4 Reveal Submit Form

You must pass a submit function, then we will pass a callback to the submit function
the callback function can be called to handle clearing the form & showing a response message.

callback (error (string), message (string)); If error is null, the component will display message and clear form

*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import PhotoUploadButton from 'components/common/style/buttons/PhotoUploadButton';
import deletePostImage from 'services/post-creation/delete-post-image';
import setPostImages from 'modules/set-post-images';
import Button from 'components/common/style/buttons/Button';
import BackBar from 'components/common/style/buttons/BackBar';
import { modalStyleFullPage } from 'styles/mixins/utilities';
import styles from './RevealSubmitForm.style';
const {
  bool,
  func,
  number,
  shape,
  string,
} = PropTypes;

class RevealSubmitForm extends Component {
  static propTypes = {
    imageClass: string,
    maxLength: number,
    placeholder: string,
    submitForm: func.isRequired,
    submitLabel: string,
    uuid: string,
    user: shape({
      at: string,
      cid: string,
      token: string,
    }).isRequired,
  }
  static defaultProps = {
    imageClass: 'discussion',
    maxLength: null,
    placeholder: 'Write something...',
    submitLabel: 'Post',
    uuid: null,
  }

  state = {
    formText: '',
    showPopup: false,
    modalDescription: null,
    uploadError: null,
    uploadLoading: false,
    S3URLs: [],
  }

  onTextChange = (e) => {
    this.setState({
      formText: e.target.value,
    });
  }

  submitForm = (e) => {
    e.preventDefault();
    const {
      formText,
      S3URLs,
    } = this.state;

    this.props.submitForm(formText, S3URLs, this.handleSubmit);
  }

  handleSubmit = (error, message) => {
    if (!error) {
      this.setState({
        showPopup: true,
        modalDescription: message || 'Your response has been submitted.',
        formText: '',
        S3URLs: [],
      });
    } else {
      this.setState({
        showPopup: true,
        modalDescription: message || 'There was an issue submitting the form.',
      });
    }
  }

  displayForm = (e) => {
    e.preventDefault();
    this.setState({
      showPopup: true,
      modalDescription: null,
    });
  }

  closeModal = (e) => {
    this.setState({
      showPopup: false,
    });
  }

  handleUploadImage = (event) => {
    event.preventDefault();

    const { cid, token, at } = this.props.user;
    const { uuid } = this.props;
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

  handleDeleteImage = (imageURL) => {
    if (!imageURL) { return; }

    const { cid, token, at } = this.props.user;
    const { uuid, imageClass } = this.props;

    deletePostImage({
      cid,
      token,
      at,
      uniqueId: uuid,
      imageClass,
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
      maxLength,
      placeholder,
      submitLabel
    } = this.props;

    const {
      formText,
      modalDescription,
      showPopup,
      uploadError,
      uploadLoading,
    } = this.state;

    return (
      <div className="root">
        <div className="fake-input" dangerouslySetInnerHTML={{ __html: placeholder }} onClick={this.displayForm} />
        <Modal
          ariaHideApp={false}
          isOpen={showPopup}
          style={modalStyleFullPage}
          contentLabel="Comment"
          onRequestClose={this.closeModal}
        >
          <BackBar onClickEvent={this.closeModal} />
          {modalDescription ? <p className="" dangerouslySetInnerHTML={{ __html: modalDescription }} /> : null}
          <form className="form">
            <textarea
              className="reveal-form-input"
              onChange={this.onTextChange}
              maxLength={maxLength}
              value={formText}
              placeholder={placeholder}
            />
            {maxLength ? <div className="flex-right">{formText.length}/<span dangerouslySetInnerHTML={{__html: maxLength }} /></div> : null}
            <div className="flex-container">
              <div>
                <PhotoUploadButton handleUploadImage={this.handleUploadImage} />
                {uploadError && <span className="errorMsg">{uploadError}</span>}
                {(!uploadError && uploadLoading) && <div className="fa fa-spinner" />}
              </div>
              <div>
                <Button text={submitLabel} onClickEvent={this.submitForm} />
              </div>
            </div>
          </form>
        </Modal>
        <style jsx>{styles}</style>
      </div>
    )
  }
}

export default RevealSubmitForm;
