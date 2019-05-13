/***********************************
 * V4 Submit Answer Form Modal
 *
 *
 *
 ***********************************/

import PhotoUploadButton from 'app/components/common/style/buttons/PhotoUploadButton';
import { Spinner } from 'app/components/spinner/index';
import { UploadImgThumb } from 'app/modules/ask-astronomer/components/Modals/upload-img-thumb';
import { uploadedImgCleanUp } from 'app/modules/ask-astronomer/services/post-image';
import setPostImages from 'app/modules/set-post-images';
import { prepareReply } from 'app/services/discussions/prepare-reply';
import deletePostImage from 'app/services/post-creation/delete-post-image';
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
    };
    prepareReply({
      at: user.at,
      token: user.token,
      cid: user.cid,
    }).then(res => {
      this.setState(() => ({
        uuid: res.data.postUUID,
      }));
    });
  }

  componentWillUnmount = () => {
    const { cid, token, at } = this.props.user;
    const { uuid } = this.state;
    // calling service directly here
    // it allows to fully reuse it, without passing parameters down to modals
    uploadedImgCleanUp(this.state.S3URLs, cid, token, at, uuid, 'discussion');
  };

  onChangeAnswerText = e => {
    e.preventDefault();
    this.setState({
      answerText: e.target.value,
    });
  };

  handleUploadImage = event => {
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
      .catch(err =>
        this.setState({
          uploadError: err.message,
          uploadLoading: false,
        })
      );
  };

  submitForm = e => {
    e.preventDefault();
    const { answerText, S3URLs } = this.state;

    if (answerText.replace(/\s/g, '').length) {
      this.props.submitForm(answerText, S3URLs);
      this.props.modalActions.closeModal();
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
    }).then(result => this.handleUploadImageResponse(result.data));
  };

  handleUploadImageResponse = uploadFileData => {
    this.setState({
      S3URLs: uploadFileData.S3URLs,
      uploadLoading: false,
    });
  };

  render() {
    const { S3URLs, uploadLoading } = this.state;
    const {
      authorInfo,
      freshness,
      content,
      modalActions,
      submitReply,
      intl,
    } = this.props;

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

        {S3URLs.length ? (
          <>
            <UploadImgThumb
              src={S3URLs[0]}
              onDelete={() => {
                this.handleDeleteImage(S3URLs[0]);
              }}
            />
            <hr />
          </>
        ) : null}

        <textarea
          className="field-input"
          value={answerText}
          onChange={this.onChangeAnswerText}
          placeholder={intl.formatMessage(messages.AnswerPlaceholder)}
        />
        <div className="buttons-wrapper d-flex justify-content-between">
          <div>
            <PhotoUploadButton
              handleUploadImage={this.handleUploadImage}
              disabled={S3URLs.length}
            />
          </div>
          <div>
            <Button onClick={modalActions.closeModal} className="mr-3">
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
