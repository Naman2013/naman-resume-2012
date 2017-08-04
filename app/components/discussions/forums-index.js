import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classnames from 'classnames';
import GenericLoadingBox from '../common/loading-screens/generic-loading-box';
import { fetchForumList } from '../../modules/discussions-forums/actions';
import { SORT_ALPHABETIC } from '../../services/discussions/get-forum-list';
import styles from './forums-index.scss';

const { bool, object, func, string } = PropTypes;

class ForumsIndex extends Component {
  static propTypes = {
    fetching: bool.isRequired,
    forumList: object.isRequired,
    currentForumId: string,
  };

  static defaultProps = {
    currentForumId: undefined,
  };

  componentDidMount() {
    const { actions } = this.props;
    actions.fetchForumList({
      sortBy: SORT_ALPHABETIC,
      count: -1,
      page: 1,
    });
  }

  render() {
    const { fetching, forumList, currentForumId } = this.props;
    return (
      <div className="forums-index-wrapper">
        <div className="forums-index-header">
          Forums Index
          <span className="description">Conversations across the Slooh Community</span>
        </div>
        {fetching && <GenericLoadingBox />}
        {!fetching &&
          <div>
            <div className="forums-index-sub-header">
              <div className="cell">Forum</div>
              <div className="cell">Topics</div>
            </div>
            <ul className="forums-index-list">
              {
                forumList.toArray().map((forum) => {
                  const linkStyle = classnames({
                    highlight: currentForumId == forum.forumId,
                  });
                  return (
                    <li
                      key={forum.forumId}
                    >
                      <Link className={`forums-link ${linkStyle}`} to={`/discussions/forums/${forum.forumId}/topics`}>
                        <span className="cell topic">{forum.title} {forum.closedFlag === 'yes' && <img alt="" className="closed-icon" src={forum.closedIconURL} />}</span>
                        <span className="cell threads">{forum.topicCount}</span>
                      </Link>
                    </li>
                  );
                },
              )}
            </ul>
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = ({ discussionsForums }) => ({
  fetching: discussionsForums.fetching,
  forumList: discussionsForums.forumList,
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchForumList,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ForumsIndex);
