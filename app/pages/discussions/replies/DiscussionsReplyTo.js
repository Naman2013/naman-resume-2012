import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import { fetchThread }  from '../../../modules/discussions-thread/actions';
import * as replyActions from '../../../modules/discussions-replies/actions';
import styles from './discussions-reply.scss';
const { func } = PropTypes;

class DiscussionsReplyTo extends Component {
  componentDidMount() {
    const { fetchThread, thread, routeParams: { threadId, topicId } } = this.props;
    if (_.isEmpty(thread)) {
      fetchThread({
        topicId,
        threadId,
      });
    }
  }
  render() {
    const { routeParams: { threadId, topicId }, thread } = this.props;
    return (
      <div>
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
            Submit your reply to:
            <span>Forum: </span><span>Topic: </span>
            <span>Thread: {thread.title}</span>
          </form>
        </section>
      </div>
    );
  }
}

DiscussionsReplyTo.propTypes = {
  fetchThread: func.isRequired,
};

const mapStateToProps = ({ discussionsReplies, discussionsThread }) => ({
  ...discussionsReplies,
  thread: discussionsThread.thread,
});
const mapDispatchToProps = dispatch => (bindActionCreators({
  ...replyActions,
  fetchThread,
}, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(DiscussionsReplyTo);
