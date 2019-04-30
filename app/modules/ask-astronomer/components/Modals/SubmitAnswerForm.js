/***********************************
 * V4 Submit Answer Form Modal
 *
 *
 *
 ***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { intlShape, injectIntl } from 'react-intl';
import Button from 'app/components/common/style/buttons/Button';
import PhotoUploadButton from 'app/components/common/style/buttons/PhotoUploadButton';
import deletePostImage from 'app/services/post-creation/delete-post-image';
import setPostImages from 'app/modules/set-post-images';
import { prepareReply } from 'app/services/discussions/prepare-reply';
import './styles.scss';
import messages from './SubmitQuestionForm.messages';

const { func, shape, string } = PropTypes;

class SubmitAnswerForm extends Component {
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

        <textarea
          className="field-input"
          value={answerText}
          onChange={this.onChangeAnswerText}
          placeholder={intl.formatMessage(messages.AnswerPlaceholder)}
        />
        <div className="button-container">
          <div className="privacy-buttons">
            <PhotoUploadButton handleUploadImage={this.handleUploadImage} />
          </div>
          <div className="actions">
            <Button
              onClickEvent={modalActions.closeModal}
              text={intl.formatMessage(messages.Cancel)}
              theme={{ height: '40px', marginRight: '10px' }}
            />
            <Button
              onClickEvent={this.submitForm}
              text={intl.formatMessage(messages.Submit)}
              theme={{ height: '40px' }}
            />
          </div>
        </div>
      </form>
    );
  }
}

export default injectIntl(SubmitAnswerForm);
