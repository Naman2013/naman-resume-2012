import React, { Component, PropTypes } from 'react';
import { List } from 'immutable';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as topicActions from '../../../modules/discussions-topics/actions';
import GenericLoadingBox from '../../../components/common/loading-screens/generic-loading-box';
import DiscussionsTopicList from '../../../components/discussions/DiscussionsTopicList';
import DiscussionsListHeader from '../../../components/discussions/DiscussionsListHeader';

const { func, bool, instanceOf, number, object } = PropTypes;

class DiscussionsTopicsList extends Component {

  fetchMoreTopics = () => {
    const { fetchTopicList, page, route: { path }, params: { forumId } } = this.props;
    fetchTopicList({
      sortBy: path,
      forumId,
      page: page + 1,
    });
  }

  render() {
    const { fetchMoreTopics } = this;
    const { topicList, fetching, route: { path }, resultsCount } = this.props;
    return (
      <section className="discussions-list">
        <DiscussionsListHeader threads activeLink={path} />
        <DiscussionsTopicList topics={topicList} />
        {fetching && <GenericLoadingBox />}
        {(!fetching && topicList.size < resultsCount) && <div className="load-more" onClick={fetchMoreTopics}>Load more...</div>}
        {!fetching && (!topicList || topicList.size === 0) && <article className="no-availability">There are no topics to display</article>}
      </section>
    );
  }
}

DiscussionsTopicsList.defaultProps = {
  topicList: new List(),
  fetching: false,
};

DiscussionsTopicsList.propTypes = {
  topicList: instanceOf(List),
  fetching: bool,
  fetchTopicList: func.isRequired,
};

const mapStateToProps = ({ discussionsTopics }) => ({
  topicList: discussionsTopics.topicList,
  resultsCount: discussionsTopics.resultsCount,
  page: discussionsTopics.page,
  fetching: discussionsTopics.fetching,
});
const mapDispatchToProps = dispatch => (bindActionCreators(topicActions, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(DiscussionsTopicsList);
