import React, { Component, PropTypes, cloneElement } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { List } from 'immutable';
import DiscussionsHeader from '../../components/discussions/DiscussionsHeader';
import * as topicsActions from '../../modules/discussions-topics/actions';

const { func, instanceOf } = PropTypes;
class Discussions extends Component {
  static propTypes = {
    fetchTopicList: func.isRequired,
    topicList: instanceOf(List)
  }

  static defaultProps = {
    topicList: new List(),
  }

  componentDidMount() {
    const { fetchTopicList, params: { forumId, topicId } } = this.props;
    if (topicId) {
      fetchTopicList({
        forumId,
      });
    }
  }

  render() {
    const { topicList, children, forumName, params: { forumId, topicId  } } = this.props;
    const currentTopic = topicList.find(topic => (topic.topicId === Number(topicId)));
    const showHeaderTitle = topicId && currentTopic;
    const newThreadUrl = forumId && topicId ? `discussions/forums/${forumId}/topics/${topicId}/threads/new-thread` : null;

    console.log('the new thread URL');
    console.log(newThreadUrl);
    return (
      <div className="clearfix">
        <DiscussionsHeader newThreadUrl={newThreadUrl} title={showHeaderTitle && `Forum: ${forumName}   Topic: ${currentTopic.get('title')}`} />
        <section>
          {cloneElement(children)}
        </section>
      </div>
    );
  }
}

const mapStateToProps = ({ discussionsTopics}) => ({
  topicList: discussionsTopics.topicList,
  forumName: discussionsTopics.forumName,
});
const mapDispatchToProps = dispatch => (bindActionCreators({
  ...topicsActions,
}, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(Discussions);
