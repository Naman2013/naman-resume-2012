import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as threadActions from '../../../modules/discussions-thread/actions';
import * as replyActions from '../../../modules/discussions-replies/actions';
import DiscussionsThread from './DiscussionsThread';
import AnnouncementBanner from '../../../components/common/announcement-banner/announcement-banner';
import DiscussionsHeader from '../../../components/discussions/DiscussionsHeader';
import GenericLoadingBox from '../../../components/common/loading-screens/generic-loading-box';
import ForumsIndex from '../../../components/discussions/forums-index';

const { bool, func, string, object } = PropTypes;

class DiscussionsThreadWrapper extends Component {
  componentDidMount() {
    const { fetchThread, routeParams: { threadId, topicId, forumId } } = this.props;

    fetchThread({
      topicId,
      threadId,
    });
  }

  render() {
    const { repliesLists, thread, fetching, routeParams: { forumId, threadId, topicId } } = this.props;
    const currentReplyList = repliesLists[threadId] || [];

    return (
      <div>
        <AnnouncementBanner />
        <DiscussionsHeader title={thread.title} />
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

DiscussionsThreadWrapper.propTypes = {
  fetchThread: func.isRequired,
  repliesLists: object.isRequired,
  thread: object.isRequired,
  fetching: bool,
};

const mapStateToProps = ({ discussionsThread, discussionsReplies }) => ({
  thread: discussionsThread.thread,
  repliesLists: discussionsReplies.repliesLists,
});
const mapDispatchToProps = dispatch => (bindActionCreators({
  ...threadActions,
  ...replyActions
}, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(DiscussionsThreadWrapper);
