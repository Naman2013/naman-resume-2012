import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DiscussionsHeader from '../../components/discussions/DiscussionsHeader';
import DiscussionsNav from '../../components/discussions/DiscussionsNav';
import ForumsIndex from '../../components/discussions/forums-index';
import * as topicActions from '../../modules/discussions-topics/actions';

const { func, object } = PropTypes;
class DiscussionsTopicsWrapper extends Component {
  static propTypes = {
    fetchTopicList: func.isRequired,
    children: object,
  }

  static defaultProps = {
    children: {},
    forumName: '',
  }

  componentDidMount() {
    const { fetchTopicList, children, params: { forumId } } = this.props;
    const { props: { route: { path } } } = children;

    if (forumId) {
      fetchTopicList({
        sortBy: path,
        forumId,
        page: 1,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { fetchTopicList, children, params: { forumId } } = this.props;
    const { props: { route: { path } } } = children;
    const { children: nextChildren, params: { forumId: nextForumId } } = nextProps;
    const { props: { route: { path: nextPath } } } = nextChildren;
    if (path !== nextPath || forumId !== nextForumId) {
      fetchTopicList({
        sortBy: nextPath,
        forumId: nextForumId,
      });
    }
  }
  render() {
    const { children, params: { forumId }, forumName } = this.props;
    const newThreadUrl = `discussions/forums/${forumId}/topics/new-thread`;
    return (
      <div className="clearfix">
        <DiscussionsHeader title={`Topics for forum: ${forumName}`} newThreadUrl={newThreadUrl} />
        <div className="discussions-wrapper container-fluid">
          <DiscussionsNav
            alphabeticLink={`discussions/forums/${forumId}/topics/alphabetic`}
            mostRecentLink={`discussions/forums/${forumId}/topics/most-recent`}
            mostActiveLink={`discussions/forums/${forumId}/topics/most-active`}
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
      </div>
    );
  }
}

const mapStateToProps = ({ discussionsTopics }) => ({
  forumName: discussionsTopics.forumName,
  ...discussionsTopics,
});
const mapDispatchToProps = dispatch => (bindActionCreators(topicActions, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(DiscussionsTopicsWrapper);
