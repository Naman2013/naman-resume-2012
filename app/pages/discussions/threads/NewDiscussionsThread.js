import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import find from 'lodash/find';
import get from 'lodash/get';
import sortBy from 'lodash/sortBy';
import { List } from 'immutable';
import classnames from 'classnames';
import UploadImage from '../../../components/publish-post/upload-image';
import ReservationSelectList from '../../../components/common/forms/reservation-select-list';
import {
  fetchForumTopicList,
  createNewThread,
  resetNewThreadState,
} from '../../../modules/discussions-new-thread/actions';
import setPostImages from '../../../modules/set-post-images';
import deletePostImage from '../../../services/post-creation/delete-post-image';
import RichTextEditor from '../../../components/rich-text-editor/RichTextEditor';
import GenericLoadingBox from '../../../components/common/loading-screens/generic-loading-box';

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
    uploadError: null,
    editorValue: '',
    titleValue: '',
    editorError: null,
    titleError: null,
    uploadLoading: false,
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
          const currentForum = find(forumList, forum => forum.forumId === Number(forumId));
          const currentTopic = find(currentForum.forumTopicList, topic => topic.topicId === Number(topicId));
          this.setState({
            selectedForumIndex: get(currentForum, 'forumIndex'),
            selectedTopicIndex: get(currentTopic, 'topicIndex'),
          });
        }
      });
  }

  componentWillUnmount() {
    const { resetNewThreadState } = this.props;
    resetNewThreadState();
  }

  handleEditorChange = (editorHTML) => {
    this.setState({ editorValue: editorHTML });
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

  handleUploadImageResponse = (uploadFileData) => {
    this.setState({
      S3URLs: uploadFileData.S3URLs,
      uploadLoading: false,
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

  handleTitleChange = (evt) => {
    this.setState({
      titleValue: evt.target.value,
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
    return selectedForum && selectedForum.get('forumTopicList').find(topic => topic.topicIndex === selectedTopicIndex);
  }

  get forumOptions() {
    const { forumList } = this.props;
    return sortBy(forumList.toArray().map(forum => <span dangerouslySetInnerHTML={{ __html: forum.get('forumTitle') }} />), f => f.forumIndex) || [];
  }

  get topicOptions() {
    const { selectedForum } = this;
    return sortBy(selectedForum &&
      selectedForum
        .get('forumTopicList')
        .map(topic => <span dangerouslySetInnerHTML={{ __html: topic.get('topicTitle') }} />), t => t.topicIndex) || [];
  }

  validateForm = () => {
    const { selectedForum, selectedTopic } = this;
    const { editorValue, titleValue } = this.state;

    // do manual validation because draftjs is not an input.
    // TODO: figure out a way to manually trigger error for draftjs so we can continue using redux-form
    this.setState({
      undefinedIndexError: false,
      titleError: false,
      editorError: false,
    });

    if (!selectedForum || !selectedTopic) {
      this.setState({
        undefinedIndexError: true,
      });
    }

    if (!titleValue) {
      this.setState({
        titleError: true,
      });
    }

    if (!editorValue) {
      this.setState({
        editorError: true,
      });
    }

    if (selectedForum && selectedTopic && titleValue && editorValue) {
      this.setState({
        editorError: false,
        titleError: false,
        undefinedIndexError: false,
      });

      return true;
    }

    return false;
  }

  submitThread = (e) => {
    e.preventDefault();
    const { selectedForum, selectedTopic } = this;
    const { createNewThread } = this.props;
    const { S3URLs, editorValue, titleValue } = this.state;

    if (this.validateForm()) {
      createNewThread({
        title: titleValue,
        S3URLs,
        content: editorValue,
        forumId: selectedForum && selectedForum.get('forumId'),
        topicId: selectedTopic && selectedTopic.get('topicId'),
      }).then((res) => {
        if (!res.payload.apiError) {
          const { threadId } = res.payload.thread;
          browserHistory.push(`discussions/forums/${selectedForum.get('forumId')}/topics/${selectedTopic.get('topicId')}/threads/${threadId}`);
        } else {
          alert('There was an error while submitting your post. The submission was not successful.');
        }
      });
    }

    window.scrollTo(0, 0);
  }
  render() {
    const { forumOptions, topicOptions, submitThread, handleDeleteImage, handleUploadImage } = this;
    const { handleSubmit, routeParams: { forumId, threadId, topicId }, submitting, threadSubmitted, submitError } = this.props;
    const { S3URLs, selectedForumIndex, selectedTopicIndex, undefinedIndexError, uploadError, editorError, titleError, uploadLoading } = this.state;
    return (<div className={styles.DiscussionsNewThread}>
      {submitError && <strong>{submitError}</strong>}
      {submitting && <div className={styles.DiscussionsContent}>Submitting Thread...</div>}
      {!submitting && !threadSubmitted && <div>
        <header className={styles.DiscussionsNewThreadHeader}>
          <h1 className="title-container center">Create Thread</h1>
          <div className="button-nav">
            <Link className="button btn-primary" to="/discussions">
              <i className="fa fa-plus" /> Cancel This
            </Link>
          </div>
        </header>
        <section className="discussions-container new clearfix">
          <form name="new-thread" className={styles.DiscussionsNewThreadForm}>
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
                  <label className={classnames({ validationError: titleError })}>
                    <span>Type in a simple headline for your post.</span>
                      <input
                        name="threadTitle"
                        className={`${styles.DiscussionsInput}`}
                        type="text"
                        onChange={this.handleTitleChange}
                        value={this.state.titleValue}
                      />
                    {titleError && <div className={`error ${styles.DiscussionsError}`}>Required</div>}
                  </label>

                  <div className={styles.editor}>
                    <label className={classnames(styles.editorLabel, { validationError: editorError })}>
                      <span>Type or Paste Your Content</span>
                      <RichTextEditor
                        editorValue={this.state.editorValue}
                        onChange={this.handleEditorChange}
                      />
                      {editorError && <div className={`error ${styles.DiscussionsError}`}>Required</div>}
                    </label>
                  </div>
                </div>
              </div>
              <hr />
              <div className={styles.DiscussionsFormInputContainer}>
                <span className={styles.number}>3</span>
                <div><b>Upload Image</b> (optional)</div>
                <UploadImage
                  handleUploadImage={handleUploadImage}
                  displayImages={S3URLs}
                  handleDeleteImage={handleDeleteImage}
                />
                {uploadError && <span className="errorMsg">{uploadError}</span>}
                {(!uploadError && uploadLoading) && <GenericLoadingBox />}
              </div>
              <hr />
              <Link className={`button btn-primary btn-cancel ${styles.DiscussionsInline}`} to="/discussions">
                Sorry, Cancel This.
              </Link>
              <button
                className={`button btn-primary ${styles.DiscussionsInline}`}
                onClick={submitThread}
              >
                Submit New Thread
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
  fetchForumTopicList,
  createNewThread,
  resetNewThreadState,
}, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(NewDiscussionsThread);
