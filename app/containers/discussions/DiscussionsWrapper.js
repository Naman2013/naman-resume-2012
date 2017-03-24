import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DiscussionsNav from '../../components/discussions/DiscussionsNav';
import ForumsIndex from '../../components/discussions/forums-index';
import * as threadActions from '../../modules/discussions-thread/actions';

const { func, object } = PropTypes;
const buildLink = ({ forumId, topicId, path }) => {
  if (forumId && topicId) {
    return `discussions/forums/${forumId}/topics/${topicId}/threads/${path}`;
  }
  return `/discussions/main/${path}`;
};

class DiscussionsWrapper extends Component {
  static propTypes = {
    fetchThreadList: func.isRequired,
    children: object,
  }

  static defaultProps = {
    children: {},
  }
  componentDidMount() {
    const { fetchThreadList, children, params: { topicId } } = this.props;
    const { props: { route: { path } } } = children;

    fetchThreadList({
      sortBy: path,
      topicId,
      page: 1,
    });

  }

  componentWillReceiveProps(nextProps) {
    const { fetchThreadList, children } = this.props;
    const { props: { route: { path } } } = children;
    const { children: nextChildren, params: { topicId } } = nextProps;
    const { props: { route: { path: nextPath } } } = nextChildren;
    if (path !== nextPath) {
      fetchThreadList({
        sortBy: nextPath,
        topicId,
        page: 1,
      });
    }
  }

  render() {
    const { children, params: { forumId, topicId } } = this.props;
    const mostRecentLink = buildLink({ forumId, topicId, path: 'most-recent' });
    const mostActiveLink = buildLink({ forumId, topicId, path: 'most-active' });
    return (
      <div className="discussions-wrapper container-fluid">
        <DiscussionsNav
          mostRecentLink={mostRecentLink}
          mostActiveLink={mostActiveLink}
        />
        <div className="row">
          <div className="col-md-8">
            {children}
          </div>
          <div className="col-md-4">
            <ForumsIndex currentForumId={forumId} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ discussionsThread }) => ({
  ...discussionsThread,
});
const mapDispatchToProps = dispatch => (bindActionCreators({
  ...threadActions,
}, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(DiscussionsWrapper);
