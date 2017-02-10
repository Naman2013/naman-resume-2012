import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import GenericLoadingBox from '../../components/common/loading-screens/generic-loading-box';
import DiscussionsList from '../../components/discussions/DiscussionsList';
import DiscussionsListHeader from '../../components/discussions/DiscussionsListHeader';
import * as threadActions from '../../modules/discussions-thread/actions';

const { func, array, bool, object } = PropTypes;

class DiscussionsListWrapper extends Component {
  componentDidMount() {
    const { fetchThreadList, route: { path }, params: { topicId } } = this.props;

    fetchThreadList({
      sortBy: path,
      topicId
    });
  }

  componentWillReceiveProps(nextProps) {
    const { fetchThreadList, route: { path } } = this.props;
    const { route: { path: nextPath }, params: { topicId } } = nextProps;

    if (path !== nextPath) {
      fetchThreadList({
        sortBy: nextPath,
        topicId,
      });
    }
  }

  render() {
    const { threadList, fetching } = this.props;

    return (
      <div className="discussions-list">
        <DiscussionsListHeader />
        { fetching ? <GenericLoadingBox /> : <DiscussionsList discussions={threadList} />}
      </div>
    );
  }
}

DiscussionsListWrapper.propTypes = {
  fetchThreadList: func.isRequired,
  threadList: array.isRequired,
  fetching: bool.isRequired,
};


const mapStateToProps = ({ discussionsThread }) => ({
  ...discussionsThread,
});
const mapDispatchToProps = dispatch => (bindActionCreators(threadActions, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(DiscussionsListWrapper);
