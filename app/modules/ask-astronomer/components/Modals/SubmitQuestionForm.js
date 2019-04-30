/***********************************
 * V4 Submit Question Form Modal
 *
 *
 *
 ***********************************/

import PhotoUploadButton from 'app/components/common/style/buttons/PhotoUploadButton';
import setPostImages from 'app/modules/set-post-images';
import { prepareThread } from 'app/services/discussions/prepare-thread';
import deletePostImage from 'app/services/post-creation/delete-post-image';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { injectIntl, intlShape } from 'react-intl';
import { browserHistory } from 'react-router';
import './styles.scss';
import messages from './SubmitQuestionForm.messages';

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
    updateQuestionsList: func,
  };

  static defaultProps = {
    updateQuestionsList: {},
  };

  constructor(props) {
    super(props);
    const { user } = props;
    this.state = {
      questionText: '',
      S3URLs: [],
      uuid: '',
    };
    prepareThread({
      at: user.at,
      token: user.token,
      cid: user.cid,
    }).then(res => {
      this.setState(() => ({
        uuid: res.data.postUUID,
      }));
    });
  }

  onChangeQuestionText = e => {
    e.preventDefault();
    this.setState({
      questionText: e.target.value,
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
    const { questionText, S3URLs } = this.state;
    if (questionText.replace(/\s/g, '').length) {
      this.props.submitForm(questionText, S3URLs);
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

  cancel = () => {
    const { updateQuestionsList, modalActions } = this.props;

    updateQuestionsList();
    modalActions.closeModal();
  };

  render() {
    const { title, modalActions, submitReply, askPrompt, intl } = this.props;

    const { questionText } = this.state;
    return (
      <form className="aaa-modal">
        <div
          className="h3-custom title"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <textarea
          className="field-input"
          value={questionText}
          onChange={this.onChangeQuestionText}
          placeholder={askPrompt}
        />

        <div className="buttons-wrapper d-flex justify-content-between">
          <div>
            <PhotoUploadButton handleUploadImage={this.handleUploadImage} />
          </div>
          <div>
            <Button onClick={this.cancel} className="mr-3">
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

export default injectIntl(SubmitQuestionForm);
