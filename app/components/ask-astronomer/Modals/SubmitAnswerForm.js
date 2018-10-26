/***********************************
* V4 Submit Answer Form Modal
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

class SubmitAnswerFeedbackModal extends Component {
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
  };

  static defaultProps = {

  };

  state = {
    answerText: ''
  }

  onChangeAnswerText = () => {
    e.preventDefault();
    this.setState({
      answerText: e.target.value,
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
      authorInfo,
      freshness,
      content,
      modalActions,
      submitReply,
    } = this.props;

    const {
      answerText,
    } = this.state;

    return (
      <form className="root">
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
          <div className="prompt-text" dangerouslySetInnerHTML={{ __html: content }} />
        </div>
        <div className="input-container">
          <textarea
            className="field-input"
            value={answerText}
            onChange={this.onChangeRequestForm}
            placeholder="Write your answer"
          />
        </div>
        <div className="button-container">
          <div className="privacy-buttons">
            <PhotoUploadButton handleUploadImage={this.handleUploadImage} />
          </div>
          <div className="actions">
            <Button onClickEvent={modalActions.closeModal} text="Cancel" theme={{ height: '40px' }} />
            <Button onClickEvent={submitReply} text="Submit" theme={{ height: '40px' }} />
          </div>
        </div>
        <style jsx>{styles}</style>
      </form>
    );
  }
}


export default SubmitAnswerFeedbackModal;
