import React, { Component, PropTypes } from 'react';
import { Link, hashHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import UploadImage from '../../../components/publish-post/upload-image';
import { fetchThread } from '../../../modules/discussions-thread/actions';
import * as replyActions from '../../../modules/discussions-replies/actions';
import setPostImages from '../../../modules/set-post-images';
import styles from './discussions-reply.scss';

const { bool, object, func, string } = PropTypes;

class DiscussionsReplyTo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: '',
      s3URLs: [],
    };

    this.handleUploadImage = this.handleUploadImage.bind(this);
    this.handleUploadImageResponse = this.handleUploadImageResponse.bind(this);
    this.handleBodyContentChange = this.handleBodyContentChange.bind(this);
    this.submitReply = this.submitReply.bind(this);
  }
  componentDidMount() {
    const {
      fetchThread,
      thread,
      routeParams: { threadId, topicId },
      prepareReply,
    } = this.props;
    if (_.isEmpty(thread)) {
      fetchThread({
        topicId,
        threadId,
      });
    }

    prepareReply({});
  }

  componentWillUnmount() {
    const { resetReplyState } = this.props;
    resetReplyState();
  }

  handleBodyContentChange(event) {
    this.setState({
      content: event.target.value,
    });
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
  submitReply() {
    const { submitReply, routeParams: { threadId, topicId }, thread } = this.props;
    const { content, S3URLs } = this.state;

    submitReply({
      topicId,
      threadId,
      title: thread.title,
      content,
      S3URLs,
    });
    window.scrollTo(0, 0);
  }
  render() {
    const { routeParams: { threadId, topicId }, submitting, replySubmitted, thread } = this.props;
    const { content, S3URLs } = this.state;
    return (<div className={styles.DiscussionsReply}>
      {submitting && <div className={styles.DiscussionsContent}>Submitting Reply...</div>}
      {replySubmitted && <div className={styles.DiscussionsContent}>
        <h3>Reply Submitted!</h3>
          <Link className="button btn-primary" to={`/discussions/topic/${topicId}/${threadId}`}>
            Go back to thread
          </Link>
      </div>}
      {!submitting && !replySubmitted && <div>
        <header className={styles.DiscussionsReplyHeader}>
          <h1 className="title-container center">Reply To Thread</h1>
          <div className="button-nav">
            <Link className="button btn-primary" to={`/discussions/topic/${topicId}/${threadId}`}>
              <i className="fa fa-plus"/> Cancel This
            </Link>
          </div>
        </header>
        <section className="discussions-container clearfix">
          <form className={styles.DiscussionReplyForm}>
            <h4>Submit your reply to:</h4>
            <h4>
              <span className={styles.DiscussionsInline}>Forum: <span dangerouslySetInnerHTML={{ __html: thread.forum }} /></span>
              <span className={styles.DiscussionsInline}>Topic: <span dangerouslySetInnerHTML={{ __html: thread.topic }} /></span>
            </h4>
            <h4>Thread: <span dangerouslySetInnerHTML={{ __html: thread.title }} /></h4>
            <div>
              <div className={styles.DiscussionsFormInputContainer}>
                <span className={styles.number}>1</span>
                <div>
                  <label htmlFor="content" className={styles.DiscussionsLabel}>Paste or type your thread reply comments here:</label>
                  <textarea
                    onChange={this.handleBodyContentChange}
                    value={content}
                    name=""
                    id="content"
                    cols="50"
                    rows="10"
                    className={styles.DiscussionsInput}
                    placeholder=""
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
                />
              </div>
              <hr />
              <Link className={`button btn-primary btn-cancel ${styles.DiscussionsInline}`} to={`/discussions/topic/${topicId}/${threadId}`}>
                Sorry, Cancel This.
              </Link>
              <button
                className={`button btn-primary ${styles.DiscussionsInline}`}
                onClick={this.submitReply}
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

DiscussionsReplyTo.propTypes = {
  fetchThread: func.isRequired,
  postUUID: string.isRequired,
  prepareReply: func.isRequired,
  replySubmitted: bool.isRequired,
  submitting: bool.isRequired,
  user: object.isRequired,
};

const mapStateToProps = ({
  discussionsReplies,
  discussionsThread,
  user,
}) => ({
  ...discussionsReplies,
  thread: discussionsThread.thread,
  postUUID: discussionsReplies.postUUID,
  user,
  submitting: discussionsReplies.submitting,
  replySubmitted: discussionsReplies.replySubmitted,
});
const mapDispatchToProps = dispatch => (bindActionCreators({
  ...replyActions,
  fetchThread,
}, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(DiscussionsReplyTo);
