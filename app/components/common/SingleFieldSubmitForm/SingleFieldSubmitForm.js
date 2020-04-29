/***********************************
 * V4 Single Submit Fort

 You must pass a submit function, then we will pass a callback to the submit function
 the callback function can be called to handle clearing the form & showing a response message.

 callback (error (string), message (string)); If error is null, the component will display message and clear form

 if you do not want to use this components modal, set useModal to false and do not use callback
 ***********************************/
import RichTextEditor from 'app/components/rich-text-editor/RichTextEditor';
import React, { Component } from 'react';
import noop from 'lodash/noop';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import PhotoUploadButton from 'app/components/common/style/buttons/PhotoUploadButton';
import Modal from 'react-modal';
import deletePostImage from 'app/services/post-creation/delete-post-image';
import setPostImages from 'app/modules/set-post-images';
import Button from 'app/components/common/style/buttons/Button';
import ViewImagesButton from 'app/components/common/style/buttons/ViewImagesButton';
import { customModalStylesV4 } from 'app/styles/mixins/utilities';
import { MultiUploadImageList } from 'app/modules/multi-upload-images/components/multi-upload-image-list';
import { prepareThread } from 'app/services/discussions/prepare-thread';
import { Spinner } from 'app/components/spinner/index';
import styles from './SingleFieldSubmitForm.style';

const { bool, func, number, shape, string } = PropTypes;
@withTranslation()
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
  };

  static defaultProps = {
    imageClass: 'discussion',
    maxLength: null,
    placeholder: 'Write something...',
    renderFormHeader: noop,
    submitLabel: 'Post',
    useModal: true,
    uuid: null,
  };

  constructor(props) {
    super(props);
    const { uuid } = props;

    this.state = {
      formText: '',
      formTitle: '',
      showPopup: false,
      responseMessage: null,
      uploadError: null,
      uploadLoading: false,
      S3URLs: [],
      fileRef: React.createRef(),
      uuid,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.uuid === null) {
      return {
        uuid: nextProps.uuid,
      };
    }
    return null;
  }

  onTextChange = value =>
    this.setState({
      formText: value,
    });

  onTitleChange = e =>
    this.setState({
      formTitle: e.target.value,
    });

  submitForm = e => {
    e.preventDefault();   
    const { formText, S3URLs, formTitle } = this.state;
    const { toggleInfo, submitForm } = this.props;
    submitForm(formText, S3URLs, formTitle, this.handleSubmit);  
    // toggleInfo(e);
  };

  handleSubmit = (error, message) => {
    const { t, user, isLoading } = this.props;

    if (!error) {
      this.setState({
        showPopup: true,
        responseMessage: message || t('Alerts.ResponceSubmittedText'),
        formText: '',
        formTitle: '',
        S3URLs: [],
      });
      setTimeout(()=>{this.closeModal(new Event('click'))},2000);
      prepareThread({
        at: user.at,
        token: user.token,
        cid: user.cid,
      }).then(res => {
        if (!res.data.apiError) {
          this.setState({
            uuid: res.data.postUUID,
          });         
        }
      });
    } else {      
      this.setState({
        showPopup: true,
        responseMessage: message || t('Alerts.FormIssueText'),
      });     
      setTimeout(()=>{this.closeModal(new Event('click'))},2000);
    }
  };

  closeModal = e => {
    const { toggleInfo} = this.props;
    toggleInfo(e);
    this.setState({
      showPopup: false,
    });    
  };

  handleUploadImage = event => {
    event.preventDefault();
    const { files } = event.target;
    const { user } = this.props;
    const { cid, token, at } = user;
    const { imageClass } = this.props;
    const { uuid } = this.state;
    this.setState({ uploadLoading: true });
    for (let i = 0; i < files.length; i += 1) {
      const data = new FormData();
      data.append('cid', cid);
      data.append('token', token);
      data.append('at', at);
      data.append('uniqueId', uuid);
      data.append('imageClass', imageClass);
      data.append('attachment', files[i]);

      this.setState({
        uploadError: null,
      });

      setPostImages(data)
        .then(res => this.handleUploadImageResponse(res.data))
        .catch(err =>
          this.setState({
            uploadError: err.message,
            uploadLoading: false,
          })
        );
    }
    this.setState({ uploadLoading: false });
  };

  handleDeleteImage = imageURL => {
    if (!imageURL) {
      return;
    }

    const { uuid, user } = this.props;
    const { cid, token, at } = user;
    const imageClass = 'discussion';
    this.setState({ uploadLoading: true });
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

  render() {
    const {
      placeholder,
      renderFormHeader,
      submitLabel,
      maxLength,
      useModal,
      user,
      isLoading,
    } = this.props;

    const {
      S3URLs,
      formText,
      formTitle,
      responseMessage,
      showPopup,
      uploadError,
      uploadLoading,
      fileRef,
    } = this.state;
    
    return (
      <div className="form-container discuss-form-wrapper">
        <Spinner loading={isLoading} />
        <MultiUploadImageList
          onAddImage={this.handleAddImage}
          imageList={S3URLs}
          isLoading={uploadLoading}
          onDeleteImage={this.handleDeleteImage}
        />
        <div>
          {renderFormHeader ? renderFormHeader() : null}
          <form className="form">
            <input
              type="text"
              className="form-input-txt"
              placeholder="Title"
              value={formTitle}
              onChange={this.onTitleChange}
            />

            <RichTextEditor
              className="form-input"
              editorValue={formText}
              onChange={this.onTextChange}
              placeholder={placeholder}
              maxLength={maxLength}
            />
            {maxLength ? (
              <div className="flex-right">
                {formText.length}/
                <span dangerouslySetInnerHTML={{ __html: maxLength }} />
              </div>
            ) : null}
            <div className="flex-container form-acitons">
              <div className="flex-container">
                <PhotoUploadButton
                  multiple
                  setRef={fileRef}
                  handleUploadImage={this.handleUploadImage}
                />
                {uploadError && <span className="errorMsg">{uploadError}</span>}
                {!uploadError && uploadLoading && (
                  <div className="fa fa-spinner" />
                )}
                {S3URLs.length > 0 ? (
                  <ViewImagesButton images={S3URLs} />
                ) : null}
              </div>
              <div>
                <Button text={submitLabel} onClickEvent={this.submitForm} />
              </div>
            </div>
          </form>
          {useModal ? (
            <Modal
              ariaHideApp={false}
              isOpen={showPopup}
              style={customModalStylesV4}
              contentLabel="Form"
              onRequestClose={this.closeModal}
            >
              {responseMessage ? (
                <p
                  className=""
                  dangerouslySetInnerHTML={{ __html: responseMessage }}
                />
              ) : null}
            </Modal>
          ) : null}
        </div>
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default SingleFieldSubmitForm;
