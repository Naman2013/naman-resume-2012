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
import {
  astronaut,
  romance,
  seashell,
  shadows,
} from 'styles/variables/colors_tiles_v4';
import { secondaryFont } from 'styles/variables/fonts';
import { screenMedium } from 'styles/variables/breakpoints';
import { modalStyleFullPage } from 'styles/mixins/utilities';
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
    forumId: 0,
    imageClass: 'discussion',
    maxLength: 100,
    placeholder: 'Write something...',
    submitLabel: 'Post',
    topicId: 0,
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
            <div className="flex-right">{formText.length}/<span dangerouslySetInnerHTML={{__html: maxLength }} /></div>
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
        <style jsx>{`
          .root {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            width: 100%;
            min-height: 120px;
          }
          .flex-container {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
          }
          .flex-right {
            display: flex;
            justify-content: flex-end;
          }
          .form {
            padding: 15px;

          }
          .fake-input {
            -moz-box-shadow:    inset 0 0 7px 0 ${shadows};
            -webkit-box-shadow: inset 0 0 7px 0 ${shadows};
            background-color: ${seashell};
            border-radius: 4px;
            border: 0;
            box-shadow:         inset 0 0 7px 0 ${shadows};
            font-family: ${secondaryFont};
            font-size: 16px;
            height: 60px;
            margin: auto;
            padding: 25px;
            resize: none;
            vertical-align: top;
            width: 260px;
          }
          .reveal-form-input {
            -moz-box-shadow:    inset 0 0 7px 0 ${shadows};
            -webkit-box-shadow: inset 0 0 7px 0 ${shadows};
            background-color: ${seashell};
            border-radius: 4px;
            border: 0;
            box-shadow:         inset 0 0 7px 0 ${shadows};
            font-family: ${secondaryFont};
            font-size: 16px;
            height: 208px;
            margin: 0 auto;
            padding: 25px;
            resize: none;
            vertical-align: top;
            width: 260px;
          }



          @media ${screenMedium} {
            .fake-input {
              width: 540px;
            }
            .reveal-form-input {
              height: 393px;
              width: 628px;
            }
          }
        `}</style>
      </div>
    )
  }
}

export default RevealSubmitForm;
