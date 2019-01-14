/***********************************
* V4 Submit Question Form Modal
*
*
*
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { intlShape, injectIntl } from 'react-intl';
import Button from 'components/common/style/buttons/Button';
import PhotoUploadButton from 'components/common/style/buttons/PhotoUploadButton';
import deletePostImage from 'services/post-creation/delete-post-image';
import setPostImages from 'modules/set-post-images';
import { prepareThread } from 'services/discussions/prepare-thread';
import styles from './Modals.style'
import messages from './SubmitQuestionForm.messages'

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

class SubmitQuestionForm extends Component {
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

  static defaultProps = {

  };

  constructor(props) {
    super(props);
    const { user } = props;
    this.state = {
      questionText: '',
      S3URLs: [],
      uuid: '',
    }
    prepareThread({
      at: user.at,
      token: user.token,
      cid: user.cid
    }).then((res) => {
      this.setState(() => ({
        uuid: res.data.postUUID,
      }));
    })
  }

  onChangeQuestionText = (e) => {
    e.preventDefault();
    this.setState({
      questionText: e.target.value,
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
      questionText,
      S3URLs,
    } = this.state;
    if (questionText.replace(/\s/g, '').length) {
      this.props.submitForm(questionText, S3URLs);
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
      title,
      modalActions,
      submitReply,
      askPrompt,
      intl,
    } = this.props;

    const {
      questionText,
    } = this.state;
    return (
      <form className="root">
        <div className="title" dangerouslySetInnerHTML={{ __html: title }}/>
        <div className="input-container">
          <textarea
            className="field-input"
            value={questionText}
            onChange={this.onChangeQuestionText}
            placeholder={askPrompt}
          />
        </div>
        <div className="button-container">
          <div className="left-buttons">
            <PhotoUploadButton handleUploadImage={this.handleUploadImage} />
            <Button onClickEvent={() => browserHistory('/help/posting-guidelines')} text={intl.formatMessage(messages.Guidelines)} theme={{ height: '40px', marginLeft: '10px' }} />
          </div>
          <div className="actions">
            <Button onClickEvent={modalActions.closeModal} text={intl.formatMessage(messages.Cancel)} theme={{ height: '40px', marginRight: '10px' }} />
            <Button onClickEvent={this.submitForm} text={intl.formatMessage(messages.Submit)} theme={{ height: '40px' }} />
          </div>
        </div>
        <style jsx>{styles}</style>
      </form>
    );
  }
}


export default injectIntl(SubmitQuestionForm);
