/***********************************
* V4 Single Submit Fort

You must pass a submit function, then we will pass a callback to the submit function
the callback function can be called to handle clearing the form & showing a response message.

callback (error (string), message (string)); If error is null, the component will display message and clear form

if you do not want to use this components modal, set useModal to false and do not use callback
***********************************/
import React, { Component } from 'react';
import noop from 'lodash/noop';
import PropTypes from 'prop-types';
import PhotoUploadButton from 'components/common/style/buttons/PhotoUploadButton';
import Modal from 'react-modal';
import deletePostImage from 'services/post-creation/delete-post-image';
import setPostImages from 'modules/set-post-images';
import Button from 'components/common/style/buttons/Button';
import { customModalStylesV4 } from 'styles/mixins/utilities';
import styles from './SingleFieldSubmitForm.style';


const {
  bool,
  func,
  number,
  shape,
  string,
} = PropTypes;

class SingleFieldSubmitForm extends Component {
  static propTypes = {
    imageClass: string,
    maxLength: number,
    placeholder: string,
    renderFormHeader: func,
    submitForm: func.isRequired,
    submitLabel: string,
    useModal: bool,
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
    renderFormHeader: noop,
    submitLabel: 'Post',
    useModal: true,
    uuid: null,
  }

  state = {
    formText: '',
    showPopup: false,
    responseMessage: null,
    uploadError: null,
    uploadLoading: false,
    S3URLs: [],
  }

  onTextChange = (e) => {
    this.setState({
      formText: e.target.value,
    })
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
        responseMessage: message || 'Your response has been submitted.',
        formText: '',
        S3URLs: [],
      });
    } else {
      this.setState({
        showPopup: true,
        responseMessage: message || 'There was an issue submitting the form.',
      });
    }
  }

  closeModal = (e) => {
    this.setState({
      showPopup: false,
    });
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
    const { uuid } = this.props;
    const imageClass = 'discussion';
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
      placeholder,
      renderFormHeader,
      submitLabel,
      maxLength,
      useModal,
      user,
    } = this.props;

    const {
      formText,
      responseMessage,
      showPopup,
      uploadError,
      uploadLoading,
    } = this.state;

    return (
      <div className="form-container">
        <div>
          {renderFormHeader ? renderFormHeader() : null}
          <form className="form">
            <textarea
              className="form-input"
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
          {useModal ? <Modal
            ariaHideApp={false}
            isOpen={showPopup}
            style={customModalStylesV4}
            contentLabel="Form"
            onRequestClose={this.closeModal}
          >
            {responseMessage ? <p className="" dangerouslySetInnerHTML={{ __html: responseMessage }} /> : null}
          </Modal> : null}
        </div>
        <style jsx>{styles}</style>
      </div>
    )
  }
}

export default SingleFieldSubmitForm;
