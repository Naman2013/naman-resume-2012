import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DiscussionsNav from '../../components/discussions/DiscussionsNav';
import ForumsIndex from '../../components/discussions/forums-index';
import {
  fetchThreadList,
  fetchFeaturedThreadList,
} from '../../modules/discussions-thread/actions';

const { func, object, shape } = PropTypes;
const buildLink = ({ forumId, topicId, path }) => {
  if (forumId && topicId) {
    return `/discussions/forums/${forumId}/topics/${topicId}/threads/${path}`;
  }
  return `/discussions/main/${path}`;
};

class DiscussionsWrapper extends Component {
  static propTypes = {
    actions: shape({
      fetchThreadList: func.isRequired,
    }),
    children: object,
  }

  static defaultProps = {
    children: {},
  }
  componentDidMount() {
    const { actions, children, params: { topicId } } = this.props;
    const { props: { route: { path } } } = children;
    if (path === 'featured') {
      actions.fetchFeaturedThreadList({
        sortBy: path,
        topicId,
        page: 1,
      });
    } else {
      actions.fetchThreadList({
        sortBy: path,
        topicId,
        page: 1,
      });
    }


  }

  componentWillReceiveProps(nextProps) {
    const { actions, children } = this.props;
    const { props: { route: { path } } } = children;
    const { children: nextChildren, params: { topicId, forumId } } = nextProps;
    const { props: { route: { path: nextPath } } } = nextChildren;
    if (path !== nextPath || this.props.params.topicId !== topicId) {
      if (nextPath === 'featured') {
        actions.fetchFeaturedThreadList({
          page: 1,
        });
      } else {
        actions.fetchThreadList({
          sortBy: nextPath,
          topicId,
          page: 1,
        });
      }
    }
  }

  render() {
    const { children, params: { forumId, topicId } } = this.props;
    const mostRecentLink = buildLink({ forumId, topicId, path: 'most-recent' });
    const mostActiveLink = buildLink({ forumId, topicId, path: 'most-active' });
    return (
      <div className="discussions-wrapper container-fluid">
        <DiscussionsNav
          featuredLink={forumId && topicId ? null : '/discussions/main/featured'}
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
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchThreadList,
    fetchFeaturedThreadList,
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(DiscussionsWrapper);
