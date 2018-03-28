import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router';

import { createThread } from '../../services/discussions/create-thread';
import { black, darkBlueGray, white, turqoise } from '../../styles/variables/colors';
import { secondaryFont } from '../../styles/variables/fonts';

const {
  arrayOf,
  bool,
  func,
  number,
  shape,
  string,
} = PropTypes;

class ImageUploadForm extends Component {
  static propTypes = {
    objectTitle: string,
  }
  static defaultProps = {
    objectTitle: ''
  }

  state = {
    questionText: '',
    showPopup: false,
    modalDescription: null,
  }

  onTextChange = (e) => {
    this.setState({
      questionText: e.target.value,
    })
  }

  submitForm = (e) => {
    e.preventDefault();
    const {
      objectId,
      topicId,
      forumId,
      user,
    } = this.props;

    const {
      questionText,
    } = this.state;

    createThread({
      at: user.at,
      token: user.token,
      cid: user.cid,
      objectId,
      callSource: 'qanda',
      content: questionText,
      topicId,
      forumId,
    }).then((res) => {

      console.log('res', res);
      if (!res.data.apiError) {
        this.setState({
          showPopup: true,
          modalDescription: successMessage,
        });
      } else {
        this.setState({
          showPopup: true,
          modalDescription: 'There was an error submitting your question.',
        });
      }

    });
  }

  closeModal = (e) => {
    this.setState({
      showPopup: false,
    });
  }

  render () {
    const { objectTitle } = this.props;
    const {
      questionText,
      showPopup,
      modalDescription,
    } = this.state;
    // const avatarStyle = Object.assign(avatarImgStyle(), { height: '50px', width: '50px'});
    return (
      <div className="image-upload">
        <input type="file" className="upload-button"/>
        <span><Link to="/help/posting-guidelines">Guidelines</Link></span>
        <style jsx>{`
          .upload-button {
            display: inline-block;
            margin-right: 15px;
          }
          .image-upload {
            border-top: 1px solid ${black};
            border-bottom: 1px solid ${black};
        `}</style>
      </div>
    )
  }
}

export default ImageUploadForm;
