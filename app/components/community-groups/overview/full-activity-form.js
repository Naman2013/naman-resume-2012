/***********************************
* V4 Community Group Activity Form
*
*
*
***********************************/
import React, { Component } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import FormHeader from 'components/common/FormHeader';
import SingleFieldSubmitForm from 'components/common/SingleFieldSubmitForm';

const {
  bool,
  number,
  string,
} = PropTypes;

class FullActivityForm extends Component {
  static propTypes = {
    topicId: number,
    forumId: number,
    canPost: bool,
    placeholder: string,
    uuid: string,
  }
  static defaultProps = {
    topicId: 0,
    forumId: 0,
    canPost: false,
    placeholder: 'Write something...',
    uuid: null,
  }

  state = {
  }


  submitForm = (content, S3URLs, callback) => {
    const {
      topicId,
      forumId,
    } = this.props;

    this.props.createThread({
      S3URLs,
      content,
      topicId,
      forumId,
    }).then((data) => {
      const message = data.apiError ? 'There was an error submitting your post.' : 'Your post has been submitted';
      callback(data.apiError, message);
    });
  }


  render () {
    const {
      user,
    } = this.props;


    return (
      <div className="form-container">
        <div>
          <FormHeader avatarURL={user.avatarURL} />
          <SingleFieldSubmitForm {...this.props} submitForm={this.submitForm} />
        </div>
      </div>
    )
  }
}

export default FullActivityForm;
