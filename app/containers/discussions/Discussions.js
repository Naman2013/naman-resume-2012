import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
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
    const isSubPage = forumId && topicId;
    const newThreadUrl = isSubPage ? `discussions/forums/${forumId}/topics/${topicId}/threads/new-thread` : null;
    const imgUrl = isSubPage ? undefined : 'https://vega.slooh.com/images/graphics/discussionLanding.jpg';

    return (
      <div className="clearfix">
        <DiscussionsHeader imgUrl={imgUrl} newThreadUrl={newThreadUrl} title={showHeaderTitle && `Forum: ${forumName}   Topic: ${currentTopic.get('title')}`} />
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
