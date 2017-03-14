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

  render() {
    const { threadList, fetching, route: { path } } = this.props;

    return (
      <div className="discussions-list">
        <DiscussionsListHeader activeLink={path} />
        { fetching ? <GenericLoadingBox /> : <DiscussionsList discussions={threadList} />}
        {(!threadList || threadList.length === 0) && <article className="no-availability">There are no threads to display</article>}
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
