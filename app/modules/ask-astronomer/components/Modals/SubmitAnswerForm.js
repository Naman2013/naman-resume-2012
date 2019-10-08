/***********************************
 * V4 Submit Answer Form Modal
 *
 *
 *
 ***********************************/

import PhotoUploadButton from 'app/components/common/style/buttons/PhotoUploadButton';
import RichTextEditor from 'app/components/rich-text-editor/RichTextEditor';
import { Spinner } from 'app/components/spinner/index';
import { uploadedImgCleanUp } from 'app/modules/ask-astronomer/services/post-image';
import setPostImages from 'app/modules/set-post-images';
import { prepareReply } from 'app/services/discussions/prepare-reply';
import deletePostImage from 'app/services/post-creation/delete-post-image';
import { MultiUploadImageList } from 'app/modules/multi-upload-images/components/multi-upload-image-list';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Button } from 'react-bootstrap';
import { injectIntl, intlShape } from 'react-intl';
import './styles.scss';
import messages from './SubmitQuestionForm.messages';

const { func, shape, string } = PropTypes;

class SubmitAnswerForm extends PureComponent {
  static propTypes = {
    modalActions: shape({
      closeModal: func,
      setModal: func,
      showModal: func,
    }).isRequired,
    authorInfo: shape({
      iconUrl: string,
      byline: string,
    }).isRequired,
    freshness: string.isRequired,
    content: string.isRequired,
    submitReply: func.isRequired,
    intl: intlShape.isRequired,
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
    const { user } = props;
    this.state = {
      answerText: '',
      S3URLs: [],
      uuid: '',
      fileRef: React.createRef(),
      uploadLoading: true,
      toggleModal: false,
    };
    prepareReply({
      at: user.at,
      token: user.token,
      cid: user.cid,
    }).then(res => {
      this.setState(() => ({
        uuid: res.data.postUUID,
        uploadLoading: false,
      }));
    });
  }

  componentWillUnmount() {
    document.body.style.overflow = 'unset';
  }

  onChangeAnswerText = value => {
    this.setState({
      answerText: value,
    });
  };

  handleUploadImage = async event => {
    event.preventDefault();

    const { files } = event.target;
    const { cid, token, at } = this.props.user;
    const { uuid } = this.state;
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

      await setPostImages(data)
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

  submitForm = e => {
    e.preventDefault();
    const { answerText, S3URLs } = this.state;

    if (answerText.replace(/\s/g, '').length) {
      this.props.modalActions.closeModal();
      return this.props.submitForm(answerText, S3URLs);
    }
  };

  handleDeleteImage = imageURL => {
    if (!imageURL) {
      return;
    }

    const { cid, token, at } = this.props.user;
    const { uuid } = this.state;

    this.setState({
      uploadLoading: true,
    });

    deletePostImage({
      cid,
      token,
      at,
      uniqueId: uuid,
      imageClass: 'discussion',
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

  closeModal = () => {
    const { modalActions, user } = this.props;
    const { cid, token, at } = user;
    const { uuid, S3URLs } = this.state;
    modalActions.closeModal();
    uploadedImgCleanUp(S3URLs, cid, token, at, uuid, 'discussion');
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
    const { S3URLs, uploadLoading, fileRef, toggleModal } = this.state;
    const { authorInfo, freshness, content, intl } = this.props;

    const { answerText } = this.state;

    return (
      <form className="aaa-modal">
        <Spinner loading={uploadLoading} />

        <div className="top">
          <div className="title flex info-container">
            <div>
              <img src={authorInfo.iconUrl} className="avatar" alt="user" />
              <span dangerouslySetInnerHTML={{ __html: authorInfo.byline }} />
            </div>
            <div>
              <span dangerouslySetInnerHTML={{ __html: freshness }} />
            </div>
          </div>
          <div
            className="prompt-text"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>

        <hr />

        <MultiUploadImageList
          onAddImage={this.handleAddImage}
          imageList={S3URLs}
          mobileVisible={toggleModal}
          onDeleteImage={this.handleDeleteImage}
          handleToggleModal={this.handleToggleModal}
          useLoader={false}
          isLoading={uploadLoading}
        />

        <RichTextEditor
          className="field-input"
          editorValue={answerText}
          onChange={this.onChangeAnswerText}
          placeholder={intl.formatMessage(messages.AnswerPlaceholder)}
        />
        <div className="buttons-wrapper d-flex justify-content-between">
          <div>
            <PhotoUploadButton
              multiple
              setRef={fileRef}
              handleToggleModal={this.handleToggleModal}
              handleUploadImage={this.handleUploadImage}
            />
          </div>
          <div>
            <Button onClick={this.closeModal} className="mr-3">
              {intl.formatMessage(messages.Cancel)}
            </Button>
            <Button onClick={this.submitForm}>
              {intl.formatMessage(messages.Submit)}
            </Button>
          </div>
        </div>
      </form>
    );
  }
}

export default injectIntl(SubmitAnswerForm);
