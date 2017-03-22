import React, { Component, PropTypes } from 'react';
import { Link, hashHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { List } from 'immutable';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import _ from 'lodash';
import TextareaField from '../../../components/form/TextareaField';
import UploadImage from '../../../components/publish-post/upload-image';
import { fetchThread } from '../../../modules/discussions-thread/actions';
import { fetchTopicList } from '../../../modules/discussions-topics/actions';
import * as replyActions from '../../../modules/discussions-replies/actions';
import setPostImages from '../../../modules/set-post-images';
import deletePostImage from '../../../services/post-creation/delete-post-image';
import { createValidator, required } from '../../../modules/utils/validation';

import styles from './discussions-reply.scss';

const { bool, object, func, string, instanceOf } = PropTypes;

class DiscussionsReplyTo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      s3URLs: [],
    };

    this.handleUploadImage = this.handleUploadImage.bind(this);
    this.handleUploadImageResponse = this.handleUploadImageResponse.bind(this);
    this.submitReply = this.submitReply.bind(this);
  }
  componentDidMount() {
    const {
      fetchTopicList,
      fetchThread,
      thread,
      routeParams: { threadId, topicId, forumId },
      prepareReply,
    } = this.props;
    if (_.isEmpty(thread)) {
      fetchThread({
        topicId,
        threadId,
      });
    }

    fetchTopicList({
      forumId,
    });

    prepareReply({});
  }

  componentWillUnmount() {
    const { resetReplyState } = this.props;
    resetReplyState();
  }

  handleUploadImage(event) {
    event.preventDefault();
    const { cid, token, at } = this.props.user;
    const { postUUID } = this.props;
    const data = new FormData();
    data.append('cid', cid);
    data.append('token', token);
    data.append('at', at);
    data.append('uniqueId', postUUID);
    data.append('imageClass', 'discussion');
    data.append('attachment', event.target.files[0]);
    setPostImages(data).then(result => this.handleUploadImageResponse(result.data));
  }
  handleUploadImageResponse(uploadFileData) {
    this.setState({
      S3URLs: uploadFileData.S3URLs,
    });
  }

  handleDeleteImage = (imageURL) => {
    if (!imageURL) { return; }

    const { cid, token, at } = this.props.user;
    const { postUUID } = this.props;
    const imageClass = 'discussion';
    deletePostImage({
      cid, token, at, uniqueId: postUUID, imageClass, imageURL
    }).then(result => this.handleUploadImageResponse(result.data));
  }

  submitReply(e) {
    const { submitReply, routeParams: { threadId, topicId }, thread } = this.props;
    const { S3URLs } = this.state;

    submitReply({
      topicId,
      threadId,
      title: thread.title,
      content: e.replyContent,
      S3URLs,
    });
    window.scrollTo(0, 0);
  }

  get currentTopic() {
    const { topicList, routeParams: { threadId, topicId } } = this.props;
    return topicList.find(topic => topic.topicId === Number(topicId)) || {};
  }
  render() {
    const { currentTopic } = this;
    const { routeParams: { forumId, threadId, topicId }, forumName, submitting, replySubmitted, thread, handleSubmit } = this.props;
    const { content, S3URLs } = this.state;
    return (<div className={styles.DiscussionsReply}>
      {submitting && <div className={styles.DiscussionsContent}>Submitting Reply...</div>}
      {replySubmitted && <div className={styles.DiscussionsContent}>
        <h3>Reply Submitted!</h3>
          <Link className="button btn-primary" to={`/discussions/forums/${forumId}/topics/${topicId}/threads/${threadId}`}>
            Go back to thread
          </Link>
      </div>}
      {!submitting && !replySubmitted && <div>
        <header className={styles.DiscussionsReplyHeader}>
          <h1 className="title-container center">Reply To Thread</h1>
          <div className="button-nav">
            <Link className="button btn-primary" to={`/discussions/forums/${forumId}/topics/${topicId}/threads/${threadId}`}>
              <i className="fa fa-plus"/> Cancel This
            </Link>
          </div>
        </header>
        <section className="discussions-container auto-height clearfix">
          <form name="new-reply" onSubmit={handleSubmit(this.submitReply)} className={styles.DiscussionReplyForm}>
            <h4>Submit your reply to:</h4>
            <h4>Forum: <span dangerouslySetInnerHTML={{ __html: forumName}} /></h4>
            <h4>Topic: <span dangerouslySetInnerHTML={{ __html: currentTopic.title }} /></h4>
            <h4>Thread: <span dangerouslySetInnerHTML={{ __html: thread.title }} /></h4>
            <div>
              <div className={styles.DiscussionsFormInputContainer}>
                <span className={styles.number}>1</span>
                <div>
                  <Field
                    name="replyContent"
                    className={styles.DiscussionsTextArea}
                    type="text"
                    cols="50"
                    rows="10"
                    label="Paste or type your thread reply comments here:"
                    component={TextareaField}
                  />
                </div>
              </div>
              <hr />
              <div className={styles.DiscussionsFormInputContainer}>
                <span className={styles.number}>2</span>
                <div><b>Upload Image</b> (optional)</div>
                <UploadImage
                  handleUploadImage={this.handleUploadImage}
                  displayImages={S3URLs}
                  handleDeleteImage={this.handleDeleteImage}
                />
              </div>
              <hr />
              <Link className={`button btn-primary btn-cancel ${styles.DiscussionsInline}`} to={`/discussions/forums/${forumId}/topics/${topicId}/threads/${threadId}`}>
                Sorry, Cancel This.
              </Link>
              <button
                className={`button btn-primary ${styles.DiscussionsInline}`}
                type="submit"
              >
                Submit Reply
              </button>
              </div>
          </form>
        </section>
      </div>}
    </div>);
  }
}

DiscussionsReplyTo.defaultProps = {
  topicList: new List(),
  forumName: '',
};

DiscussionsReplyTo.propTypes = {
  fetchTopicList: func.isRequired,
  fetchThread: func.isRequired,
  postUUID: string.isRequired,
  prepareReply: func.isRequired,
  replySubmitted: bool.isRequired,
  submitting: bool.isRequired,
  user: object.isRequired,
  handleSubmit: func.isRequired,
  topicList: instanceOf(List),
  forumName: string,
};

const mapStateToProps = ({
  discussionsReplies,
  discussionsThread,
  discussionsTopics,
  user,
}) => ({
  ...discussionsReplies,
  thread: discussionsThread.thread,
  postUUID: discussionsReplies.postUUID,
  user,
  submitting: discussionsReplies.submitting,
  replySubmitted: discussionsReplies.replySubmitted,
  forumName: discussionsTopics.forumName,
  topicList: discussionsTopics.topicList,
});
const mapDispatchToProps = dispatch => (bindActionCreators({
  ...replyActions,
  fetchThread,
  fetchTopicList,
}, dispatch));

const replyValidation = createValidator({
  replyContent: [required],
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'new-reply',
  validate: replyValidation,
})(DiscussionsReplyTo));
