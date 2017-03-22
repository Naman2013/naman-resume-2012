import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import GenericLoadingBox from '../../components/common/loading-screens/generic-loading-box';
import DiscussionsList from '../../components/discussions/DiscussionsList';
import DiscussionsListHeader from '../../components/discussions/DiscussionsListHeader';
import * as threadActions from '../../modules/discussions-thread/actions';

const { func, arrayOf, bool, shape, object } = PropTypes;

class DiscussionsListWrapper extends Component {

  fetchMoreThreads = () => {
    const { fetchThreadList, page, route: { path }, params: { topicId } } = this.props;
    fetchThreadList({
      sortBy: path,
      topicId,
      page: page + 1,
      appendToList: true,
    });
  }

  render() {
    const { fetchMoreThreads } = this;
    const { threadList, fetching, route: { path }, threadCount } = this.props;
    return (
      <div className="discussions-list">
        <DiscussionsListHeader activeLink={path} />
        <DiscussionsList discussions={threadList} />
        {fetching && <GenericLoadingBox />}
        {(!fetching && threadList.length < threadCount) && <div className="load-more" onClick={fetchMoreThreads}>Load more...</div>}
        {(!threadList || (threadList.length === 0 && !fetching)) && <article className="no-availability">There are no threads to display</article>}
      </div>
    );
  }
}
DiscussionsListWrapper.defaultProps = {
  threadList: [],
};

DiscussionsListWrapper.propTypes = {
  threadList: arrayOf(object),
  fetching: bool.isRequired,
};


const mapStateToProps = ({ discussionsThread }) => ({
  ...discussionsThread,
});
const mapDispatchToProps = dispatch => (bindActionCreators(threadActions, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(DiscussionsListWrapper);
