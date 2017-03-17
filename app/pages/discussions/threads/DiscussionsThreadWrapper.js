import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { List } from 'immutable';
import * as topicsActions from '../../../modules/discussions-topics/actions';
import * as threadActions from '../../../modules/discussions-thread/actions';
import * as replyActions from '../../../modules/discussions-replies/actions';
import DiscussionsThread from './DiscussionsThread';
import AnnouncementBanner from '../../../components/common/announcement-banner/announcement-banner';
import DiscussionsHeader from '../../../components/discussions/DiscussionsHeader';
import GenericLoadingBox from '../../../components/common/loading-screens/generic-loading-box';
import ForumsIndex from '../../../components/discussions/forums-index';
import styles from '../discussions.scss';

const { instanceOf, bool, func, string, object } = PropTypes;
const getBreadcrumbs = args => (args.map(arg => (`<a href="${arg.url}">${arg.name}</a>`)));
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
    const { repliesLists, thread, fetching, forumName, topicList, routeParams: { forumId, threadId, topicId } } = this.props;
    const currentReplyList = repliesLists[threadId] || [];
    const currentTopic = topicList.find(topic => (topic.topicId === Number(topicId)));
    const breadcrumbs = [
      {
        url: '/#/discussions/main',
        name: 'Discussions Main'
      },
      {
        url: `/#/discussions/forums/${forumId}/topics`,
        name: forumName || 'Forum',
      },
      {
        url: `/#/discussions/forums/${forumId}/topics/${topicId}/threads`,
        name: currentTopic && currentTopic.get('title') || 'Topic',
      },
    ];

    return (
      <div>
        <AnnouncementBanner />
        <header className={styles.discussionsThreadHeader}>
          {breadcrumbs && <span className="breadcrumbs" dangerouslySetInnerHTML={{ __html: getBreadcrumbs(breadcrumbs).join(' + ') }}></span>}
          <div className="container row">
            <h1 className="title-container col-md-10">Discussions: <span className="title">{thread.title}</span></h1>
            <div className="button-nav col-md-2">
              <Link className="button btn-primary" to="/discussions/new-thread">
                <i className="fa fa-plus" /> New Thread
              </Link>
            </div>
          </div>
        </header>
        <section className="discussions-container container-fluid clearfix">
          <div className="col-md-8 nopadding">
            { fetching ? <GenericLoadingBox /> : <DiscussionsThread repliesList={currentReplyList} forumId={forumId} thread={thread} topicId={topicId} />}
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
};

DiscussionsThreadWrapper.propTypes = {
  fetchTopicList: func.isRequired,
  fetchThread: func.isRequired,
  repliesLists: object.isRequired,
  thread: object.isRequired,
  topicList: instanceOf(List),
  fetching: bool,
  forumName: string
};

const mapStateToProps = ({ discussionsThread, discussionsReplies, discussionsTopics }) => ({
  topicList: discussionsTopics.topicList,
  thread: discussionsThread.thread,
  repliesLists: discussionsReplies.repliesLists,
  forumName: discussionsTopics.forumName,
});
const mapDispatchToProps = dispatch => (bindActionCreators({
  ...topicsActions,
  ...threadActions,
  ...replyActions
}, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(DiscussionsThreadWrapper);
