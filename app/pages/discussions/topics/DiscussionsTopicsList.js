import React, { Component, PropTypes } from 'react';
import { List } from 'immutable';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import GenericLoadingBox from '../../../components/common/loading-screens/generic-loading-box';
import DiscussionsTopicList from '../../../components/discussions/DiscussionsTopicList';
import DiscussionsListHeader from '../../../components/discussions/DiscussionsListHeader';

const { bool, instanceOf, number, object } = PropTypes;

class DiscussionsTopicsList extends Component {

  render() {
    const { topicList, fetching, route: { path } } = this.props;
    return (
      <section className="discussions-list">
        <DiscussionsListHeader threads activeLink={path} />
        { fetching ? <GenericLoadingBox /> : <DiscussionsTopicList topics={topicList} />}
        {(!topicList || topicList.size === 0) && <article className="no-availability">There are no topics to display</article>}
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
};

const mapStateToProps = ({ discussionsTopics }) => ({
  topicList: discussionsTopics.topicList,
});
const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(DiscussionsTopicsList);
