import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { List } from 'immutable';
import _ from 'lodash';
import * as topicsActions from '../../../modules/discussions-topics/actions';
import * as threadActions from '../../../modules/discussions-thread/actions';
import * as replyActions from '../../../modules/discussions-replies/actions';
import DiscussionsThread from './DiscussionsThread';
import GenericLoadingBox from '../../../components/common/loading-screens/generic-loading-box';
import ForumsIndex from '../../../components/discussions/forums-index';
import styles from '../discussions.scss';

const { instanceOf, bool, func, string, object, number } = PropTypes;
class DiscussionsThreadWrapper extends Component {
  componentDidMount() {
    const { fetchTopicList, fetchThread, routeParams: { threadId, topicId, forumId } } = this.props;

    fetchThread({
      topicId,
      threadId,
    });

    fetchTopicList({
      forumId,
    });
  }

  render() {
    const {
      fetching,
      fetchReplies,
      forumName,
      repliesCount,
      repliesLists,
      repliesPage,
      routeParams: { forumId, threadId, topicId },
      thread,
      topicList,
    } = this.props;
    const currentReplyList = repliesLists[threadId] || [];
    const newThreadUrl = forumId && topicId && threadId ? `discussions/forums/${forumId}/topics/${topicId}/threads/${threadId}/new-thread` : null;
    const currentTopic = topicList.find(topic => (topic.topicId === Number(topicId)));

    return (
      <div>
        <header className={styles.discussionsThreadHeader}>
          <span className="breadcrumbs">
            <Link to="/discussions/main">Discussions Main </Link> +
            <Link to={`/discussions/forums/${forumId}/topics`}> <span dangerouslySetInnerHTML={{ __html: forumName || 'Forum' }}></span></Link> +
            <Link to={`/discussions/forums/${forumId}/topics/${topicId}/threads`}> <span dangerouslySetInnerHTML={{ __html: currentTopic ? currentTopic.get('title') : 'Topic' }}></span></Link>
          </span>
          <div className="container row">
            <h1 className="title-container col-md-10">Discussions: <span className="title" dangerouslySetInnerHTML={{ __html: thread.title }} /> {thread.closedFlag === 'yes' && <img alt="" className="closed-icon" src={thread.closedIconURL} />}</h1>
            {thread.closedFlag === 'no' && <div className="button-nav col-md-2">
              <Link className="button btn-primary" to={newThreadUrl}>
                <i className="fa fa-plus" /> New Thread
              </Link>
            </div>}
          </div>
        </header>
        <section className="discussions-container container-fluid clearfix">
          <div className="col-md-8 nopadding">
            {fetching && <GenericLoadingBox /> }
            {!fetching && !_.isEmpty(thread) && <DiscussionsThread
              repliesList={currentReplyList}
              forumId={forumId}
              thread={thread}
              topicId={topicId}
              fetchReplies={fetchReplies}
              repliesCount={repliesCount}
              page={repliesPage}
            />}
          </div>

          <div className="col-md-4 mission-sidebar">
            <ForumsIndex currentForumId={forumId} />
          </div>
        </section>
      </div>
    );
  }
}

DiscussionsThreadWrapper.defaultProps = {
  topicList: new List(),
  forumName: '',
  fetching: false,
  repliesCount: 0,
};

DiscussionsThreadWrapper.propTypes = {
  fetchTopicList: func.isRequired,
  fetchThread: func.isRequired,
  fetchReplies: func.isRequired,
  repliesLists: object.isRequired,
  thread: object.isRequired,
  topicList: instanceOf(List),
  fetching: bool,
  forumName: string,
  repliesCount: number,
};

const mapStateToProps = ({ discussionsThread, discussionsReplies, discussionsTopics }) => ({
  topicList: discussionsTopics.topicList,
  thread: discussionsThread.thread,
  repliesLists: discussionsReplies.repliesLists,
  forumName: discussionsTopics.forumName,
  repliesCount: discussionsReplies.resultsCount,
  repliesPage: discussionsReplies.page,
  fetching: discussionsThread.fetching,
});
const mapDispatchToProps = dispatch => (bindActionCreators({
  ...topicsActions,
  ...threadActions,
  ...replyActions
}, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(DiscussionsThreadWrapper);
