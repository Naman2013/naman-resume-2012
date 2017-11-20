import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import GenericLoadingBox from '../../components/common/loading-screens/generic-loading-box';
import DiscussionsList from '../../components/discussions/DiscussionsList';
import DiscussionsListHeader from '../../components/discussions/DiscussionsListHeader';
import {
  fetchThreadList,
  fetchFeaturedThreadList,
} from '../../modules/discussions-thread/actions';

const { arrayOf, bool, object } = PropTypes;

class DiscussionsListWrapper extends Component {

  fetchMoreThreads = () => {
    const { actions, page, route: { path }, params: { topicId } } = this.props;
    if (path == 'featured') {
      actions.fetchFeaturedThreadList({
        page: page + 1,
        appendToList: true,
      });
    } else {
      actions.fetchThreadList({
        sortBy: path,
        topicId,
        page: page + 1,
        appendToList: true,
      });
    }

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
        {!fetching && (!threadList || threadList.length === 0) && <article className="no-availability">There are no threads to display</article>}
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
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchThreadList,
    fetchFeaturedThreadList,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(DiscussionsListWrapper);
