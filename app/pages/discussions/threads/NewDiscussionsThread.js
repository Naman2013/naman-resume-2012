import React, { Component, PropTypes } from 'react';
import { Link, hashHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import _ from 'lodash';
import { List, Record } from 'immutable';
import InputField from '../../../components/form/InputField';
import TextareaField from '../../../components/form/TextareaField';
import { createValidator, required } from '../../../modules/utils/validation';
import UploadImage from '../../../components/publish-post/upload-image';
import ReservationSelectList from '../../../components/common/forms/reservation-select-list';
import * as newThreadActions from '../../../modules/discussions-new-thread/actions';
import setPostImages from '../../../modules/set-post-images';
import styles from './discussions-new-thread.scss';

const { bool, object, instanceOf, func, string } = PropTypes;

class NewDiscussionsThread extends Component {

  static propTypes = {
    createNewThread: func.isRequired,
    postUUID: string.isRequired,
    fetchForumTopicList: func.isRequired,
    threadSubmitted: bool.isRequired,
    submitting: bool.isRequired,
    user: object.isRequired,
    forumList: instanceOf(List).isRequired,
    resetNewThreadState: func.isRequired,
    handleSubmit: func.isRequired,
    submitError: string,
  };

  static defaultProps = {
    submitError: '',
  };

  state = {
    selectedForumIndex: undefined,
    selectedTopicIndex: undefined,
    s3URLs: [],
    undefinedIndexError: false,
  };

  componentDidMount() {
    const {
      fetchForumTopicList,
      routeParams: {
        forumId,
        topicId,
      }
    } = this.props;

    fetchForumTopicList({})
      .then(res => {
        // if there's a forumId or a topicId, preselect it in the dropdowns
        if (forumId || topicId) {
          const { forumList } = res.payload;
          const currentForum = _.find(forumList, forum => forum.forumId === Number(forumId));
          const currentTopic = _.find(currentForum.forumTopicList, topic => topic.topicId === Number(topicId));
          this.setState({
            selectedForumIndex: _.get(currentForum, 'forumIndex'),
            selectedTopicIndex: _.get(currentTopic, 'topicIndex'),
          });
        }
      })

  }

  componentWillUnmount() {
    const { resetNewThreadState } = this.props;
    resetNewThreadState();
  }

  handleUploadImage = (event) => {
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

  handleUploadImageResponse = (uploadFileData) => {
    this.setState({
      S3URLs: uploadFileData.S3URLs,
    });
  }

  handleForumSelectChange = (evt) => {
    this.setState({
      selectedForumIndex: Number(evt.target.value),
    });
  }

  handleTopicSelectChange = (evt) => {
    this.setState({
      selectedTopicIndex: Number(evt.target.value),
    });
  }

  get selectedForum() {
    const { forumList } = this.props;
    const { selectedForumIndex } = this.state;
    return forumList.find(f => f.forumIndex === selectedForumIndex);
  }

  get selectedTopic() {
    const { selectedForum } = this;
    const { selectedTopicIndex } = this.state;
    return selectedForum.get('forumTopicList').find(topic => topic.topicIndex === selectedTopicIndex);
  }

  get forumOptions() {
    const { forumList } = this.props;
    return _.sortBy(forumList.toArray().map(forum => forum.get('forumTitle')), f => f.forumIndex) || [];
  }

  get topicOptions() {
    const { selectedForum } = this;
    return _.sortBy(selectedForum &&
      selectedForum
        .get('forumTopicList')
        .map(topic => topic.get('topicTitle')), t => t.topicIndex) || [];
  }

  submitThread = (e) => {
    const { selectedForum, selectedTopic } = this;
    const { createNewThread } = this.props;
    const { S3URLs } = this.state;
    const { threadContent: content, threadTitle: title } = e;

    if (selectedForum && selectedTopic) {
      createNewThread({
        title,
        content,
        S3URLs,
        forumId: selectedForum && selectedForum.get('forumId'),
        topicId: selectedTopic && selectedTopic.get('topicId'),
      }).then(res => {
        if (!res.payload.apiError) {
          const { threadId } = res.payload.thread;
          hashHistory.push(`discussions/forums/${selectedForum.get('forumId')}/topics/${selectedTopic.get('topicId')}/threads/${threadId}`);
        }
      });
    } else {
      this.setState({
        undefinedIndexError: true,
      });
    }
    window.scrollTo(0, 0);
  }
  render() {
    const { forumOptions, topicOptions, submitThread } = this;
    const { handleSubmit, routeParams: { forumId, threadId, topicId }, submitting, threadSubmitted, submitError } = this.props;
    const { S3URLs, selectedForumIndex, selectedTopicIndex, undefinedIndexError } = this.state;
    return (<div className={styles.DiscussionsNewThread}>
      {submitError && <strong>{submitError}</strong>}
      {submitting && <div className={styles.DiscussionsContent}>Submitting Thread...</div>}
      {!submitting && !threadSubmitted && <div>
        <header className={styles.DiscussionsNewThreadHeader}>
          <h1 className="title-container center">Create Thread</h1>
          <div className="button-nav">
            <Link className="button btn-primary" to="/discussions">
              <i className="fa fa-plus"/> Cancel This
            </Link>
          </div>
        </header>
        <section className="discussions-container auto-height clearfix">
          <form name="new-thread" onSubmit={handleSubmit(submitThread)} className={styles.DiscussionsNewThreadForm}>
            <div className={styles.DiscussionsFormInputContainer}>
              <span className={styles.number}>1</span>
              <h4>Submit a forum and topic for your post from the lists below</h4>
              <div className={`${styles.DiscussionsSelectList} row`}>
                <ReservationSelectList
                  options={forumOptions}
                  selectedIndex={String(selectedForumIndex)}
                  handleSelectChange={this.handleForumSelectChange}
                  name="forum-select"
                  listHeight={170}
                  className="col-md-6"
                />
                <ReservationSelectList
                  options={topicOptions}
                  selectedIndex={String(selectedTopicIndex)}
                  handleSelectChange={this.handleTopicSelectChange}
                  name="topic-select"
                  listHeight={170}
                  className="col-md-6"
                />
              </div>
              {undefinedIndexError && <div className={`error ${styles.DiscussionsError}`}>You must select a forum and topic</div>}
            </div>
            <div>
              <div className={styles.DiscussionsFormInputContainer}>
                <span className={styles.number}>2</span>
                <div>
                  <h4>Add Your Content</h4>
                  <Field
                    name="threadTitle"
                    className={`${styles.DiscussionsInput}`}
                    type="text"
                    label="Type in a simple headline for your post."
                    component={InputField}
                  />
                  <Field
                    name="threadContent"
                    className={`${styles.DiscussionsTextArea}`}
                    type="text"
                    cols="50"
                    rows="10"
                    label="Type or Paste Your Content"
                    component={TextareaField}
                  />
                </div>
              </div>
              <hr />
              <div className={styles.DiscussionsFormInputContainer}>
                <span className={styles.number}>3</span>
                <div><b>Upload Image</b> (optional)</div>
                <UploadImage
                  handleUploadImage={this.handleUploadImage}
                  displayImages={S3URLs}
                />
              </div>
              <hr />
              <Link className={`button btn-primary btn-cancel ${styles.DiscussionsInline}`} to="/discussions">
                Sorry, Cancel This.
              </Link>
              <button
                type="submit"
                className={`button btn-primary ${styles.DiscussionsInline}`}
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

const mapStateToProps = ({
  discussionsNewThread,
  user,
}) => ({
  forumList: discussionsNewThread.forumList,
  postUUID: discussionsNewThread.postUUID,
  user,
  submitError: discussionsNewThread.submitError,
  submitting: discussionsNewThread.submitting,
  threadSubmitted: discussionsNewThread.threadSubmitted,
});
const mapDispatchToProps = dispatch => (bindActionCreators({
  ...newThreadActions,
}, dispatch));

const threadValidation = createValidator({
  threadTitle: [required],
  threadContent: [required],
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'new-thread',
  validate: threadValidation,
})(NewDiscussionsThread));
