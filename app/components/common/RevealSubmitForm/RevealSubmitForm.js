/**
* V4 Reveal Submit Form

You must pass a submit function, then we will pass a callback to the submit function
the callback function can be called to handle clearing the form & showing a response message.

callback (error (string), message (string)); If error is null, the component will display message and clear form

*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { intlShape, injectIntl } from 'react-intl';
import PhotoUploadButton from 'app/components/common/style/buttons/PhotoUploadButton';
import deletePostImage from 'app/services/post-creation/delete-post-image';
import setPostImages from 'app/modules/set-post-images';
import Button from 'app/components/common/style/buttons/Button';
import { MultiUploadImageList } from 'app/modules/multi-upload-images/components/multi-upload-image-list';
import BackBar from 'app/components/common/style/buttons/BackBar';
import { customModalStylesFitContent } from 'app/styles/mixins/utilities';
import ViewImagesButton from 'app/components/common/style/buttons/ViewImagesButton';
import { Spinner } from 'app/components/spinner/index';
import styles, { profPic } from './RevealSubmitForm.style';
import messages from './RevealSubmitForm.messages';

const { bool, func, instanceOf, number, shape, string } = PropTypes;

class RevealSubmitForm extends Component {
  static propTypes = {
    imageClass: string,
    maxLength: number,
    placeholder: string,
    revealButtonRender: func,
    submitForm: func.isRequired,
    onDisplayForm: func,
    submitLabel: string,
    uuid: string,
    user: shape({
      at: string,
      cid: string,
      token: string,
    }).isRequired,
    intl: intlShape.isRequired,
    isClub: bool,
  };

  static defaultProps = {
    imageClass: 'discussion',
    maxLength: null,
    placeholder: 'Write something...',
    revealButtonRender: null,
    submitLabel: 'Post',
    uuid: null,
    isClub: false,
  };

  state = {
    formTitle: '',
    formText: '',
    showPopup: false,
    modalDescription: null,
    uploadError: null,
    uploadLoading: false,
    S3URLs: [],
    isFetching: false,
    toggleModal: false,
    fileRef: React.createRef(),
  };

  componentWillUnmount() {
    document.body.style.overflow = 'unset';
  }

  onTitleChange = e => {
    this.setState({
      formTitle: e.target.value,
    });
  };

  onTextChange = e => {
    this.setState({
      formText: e.target.value,
    });
  };

  submitForm = e => {
    e.preventDefault();
    const { isClub } = this.props;
    const { formTitle, formText, S3URLs } = this.state;
    if (formText.replace(/\s/g, '').length) {
      this.setState({ isFetching: true });
      if (isClub) {
        this.props.submitForm(formText, S3URLs, formTitle, this.handleSubmit);
      } else {
        this.props.submitForm(formText, S3URLs, this.handleSubmit);
      }
    }
  };

  handleSubmit = (error, message) => {
    const { intl } = this.props;
    if (!error) {
      this.setState({
        showPopup: true,
        modalDescription:
          message || intl.formatMessage(messages.ResponceSubmittedText),
        formTitle: '',
        formText: '',
        S3URLs: [],
        isFetching: false,
      });
    } else {
      this.setState({
        showPopup: true,
        modalDescription: message || intl.formatMessage(messages.FormIssueText),
        isFetching: false,
      });
    }
    setTimeout(this.closeModal, 1000);
  };

  displayForm = e => {
    const { onDisplayForm } = this.props;
    e.preventDefault();
    if (typeof onDisplayForm === 'function') {
      onDisplayForm().then(() => {
        this.setState({
          showPopup: true,
          modalDescription: null,
        });
      });
    } else {
      this.setState({
        showPopup: true,
        modalDescription: null,
      });
    }
  };

  closeModal = e => {
    e.preventDefault();
    this.setState({
      showPopup: false,
      formTitle: '',
      formText: '',
      S3URLs: [],
      isFetching: false,
    });
  };

  handleUploadImage = async event => {
    event.preventDefault();

    const { files } = event.target;
    const { cid, token, at } = this.props.user;
    const { uuid } = this.props;
    this.setState({ uploadLoading: true });
    for (let i = 0; i < files.length; i++) {
      const data = new FormData();
      data.append('cid', cid);
      data.append('token', token);
      data.append('at', at);
      data.append('uniqueId', uuid);
      data.append('imageClass', 'discussion');
      data.append('attachment', files[i]);

      this.setState({
        uploadError: null,
      });

      await setPostImages(data).then(res => {
        if (!res.data.apiError) {
          this.handleUploadImageResponse(res.data);
        } else {
          this.setState({
            uploadError: res.data.errorMsg,
            uploadLoading: false,
          });
        }
      });
    }
    this.setState({ uploadLoading: false });
  };

  handleDeleteImage = imageURL => {
    if (!imageURL) {
      return;
    }
    this.setState({ uploadLoading: true });
    const { cid, token, at } = this.props.user;
    const { uuid, imageClass } = this.props;

    deletePostImage({
      cid,
      token,
      at,
      uniqueId: uuid,
      imageClass,
      imageURL,
    })
      .then(result => this.handleUploadImageResponse(result.data))
      .finally(() => {
        this.setState({ uploadLoading: false });
      });
  };

  handleUploadImageResponse = uploadFileData => {
    this.setState({
      S3URLs: uploadFileData.S3URLs,
    });
  };

  handleAddImage = () => {
    const { fileRef } = this.state;
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  handleToggleModal = () => {
    const { toggleModal } = this.state;
    if (!toggleModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    this.setState({
      toggleModal: !this.state.toggleModal,
    });
  };

  render() {
    const {
      maxLength,
      placeholder,
      submitLabel,
      revealButtonRender,
      displayName,
      title,
      content,
      intl,
      avatarURL,
      commentPlaceholder,
      threadId,
      isClub,
    } = this.props;

    const {
      S3URLs,
      formTitle,
      formText,
      modalDescription,
      showPopup,
      uploadError,
      uploadLoading,
      isFetching,
      fileRef,
      toggleModal,
    } = this.state;
    return (
      <div className="root">
        {revealButtonRender ? (
          revealButtonRender({
            displayForm: this.displayForm,
          })
        ) : (
          <div
            className="fake-input"
            dangerouslySetInnerHTML={{ __html: placeholder }}
            onClick={this.displayForm}
          />
        )}
        <Modal
          ariaHideApp={false}
          isOpen={showPopup}
          style={{
            content: { ...customModalStylesFitContent.content, border: 'none' },
            overlay: customModalStylesFitContent.overlay,
          }}
          contentLabel="Comment"
          onRequestClose={this.closeModal}
        >
          {modalDescription ? (
            <p
              className=""
              dangerouslySetInnerHTML={{ __html: modalDescription }}
            />
          ) : null}
          <Spinner
            loading={isFetching}
            text="Please wait...loading discussions"
          />
          <form className="form reveal-submit-form">
            <div className="form-author">
              <div style={profPic(avatarURL)} />
              {displayName
                ? `${intl.formatMessage(messages.WrittenBy)} ${displayName}`
                : commentPlaceholder}
            </div>
            <div
              className="form-quote"
              dangerouslySetInnerHTML={{ __html: title || content }}
            />
            <MultiUploadImageList
              isLoading={uploadLoading}
              onAddImage={this.handleAddImage}
              mobileVisible={toggleModal}
              imageList={S3URLs}
              onDeleteImage={this.handleDeleteImage}
              handleToggleModal={this.handleToggleModal}
              slidesToShow={3}
            />
            {isClub && (
              <input
                type="text"
                className="reveal-form-input"
                placeholder="Title"
                value={formTitle}
                onChange={this.onTitleChange}
              />
            )}
            <textarea
              className="reveal-form-input"
              onChange={this.onTextChange}
              rows={2}
              maxLength={maxLength}
              value={formText}
              placeholder={placeholder}
            />
            {maxLength ? (
              <div className="flex-right">
                {formText.length}/
                <span dangerouslySetInnerHTML={{ __html: maxLength }} />
              </div>
            ) : null}
            <div className="flex-container form-actions">
              <div className="flex-container">
                <PhotoUploadButton
                  multiple
                  setRef={fileRef}
                  handleUploadImage={this.handleUploadImage}
                  handleToggleModal={this.handleToggleModal}
                  id={threadId}
                />
                {uploadError && <span className="errorMsg">{uploadError}</span>}
                {!uploadError && uploadLoading && (
                  <div className="fa fa-spinner" />
                )}
                {S3URLs.length > 0 ? (
                  <ViewImagesButton images={S3URLs} />
                ) : null}
              </div>
              <div className="buttons-wrapper">
                <Button
                  text={intl.formatMessage(messages.Cancel)}
                  onClickEvent={this.closeModal}
                />
                <Button
                  theme={{ marginLeft: '10px' }}
                  text={submitLabel}
                  onClickEvent={this.submitForm}
                />
              </div>
            </div>
          </form>
        </Modal>
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default injectIntl(RevealSubmitForm);
