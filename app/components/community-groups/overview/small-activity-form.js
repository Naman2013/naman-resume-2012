/***********************************
* V4 Community Group Activity Form
*
*
*
***********************************/
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import RevealSubmitForm from 'components/common/RevealSubmitForm';

const {
  bool,
  number,
  string,
} = PropTypes;

class SmallActivityForm extends Component {
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
      callback(data.apiError, message)
    });
  }

  render() {
    return (
      <div className="root">
        <RevealSubmitForm {...this.props} submitForm={this.submitForm} />
      </div>
    )
  }
}

export default SmallActivityForm;
