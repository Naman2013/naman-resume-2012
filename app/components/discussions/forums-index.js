import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classnames from 'classnames';
import GenericLoadingBox from '../common/loading-screens/generic-loading-box';
import { fetchForumList } from '../../modules/discussions-forums/actions';
import { SORT_MENU_ORDER } from '../../services/discussions/get-forum-list';
import {
  white,
  pink,
  sloohWhite,
  darkBlueGray,
  lightGray,
  turqoise,
} from '../../styles/variables/colors';

const {
  bool,
  object,
  string,
} = PropTypes;

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
      sortBy: SORT_MENU_ORDER,
      count: -1,
      page: 1,
    });
  }

  render() {
    const { fetching, forumList, currentForumId } = this.props;
    return (
      <div className="forums-index-wrapper">
        <div className="forums-index-header">
          <div>Forums Index</div>
          <div className="description">Conversations across the Slooh Community</div>
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
                      <Link to={`/discussions/forums/${forum.forumId}/topics`}>
                        <a className={`link-item ${linkStyle}`}>
                          <div className="cell topic">{forum.title} {forum.closedFlag === 'yes' && <img alt="" className="closed-icon" src={forum.closedIconURL} />}</div>
                          <div className="cell threads">{forum.topicCount}</div>
                        </a>
                      </Link>
                    </li>
                  );
                },
              )}
            </ul>
          </div>
        }
      <style jsx>
        {`
          .table-row {
            display: flex;
          }

          .cell {
            flex: 0 0 50%;
          }

          .cell .icon {
            height: 50px;
            width: 50px;
          }

          .cell:first-child {
            padding-left: 14%;
          }

          .cell:last-child {
            text-align: center;
            align-self: center;
          }

          .forums-index-wrapper {
            position: relative;
            margin-top: 56px;
          }

          .forums-index-header {
            background: ${turqoise};
            border-bottom: 4px solid ${darkBlueGray};
            font-size: 22px;
            color: ${sloohWhite};
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            font-weight: bold;
            padding: 10px 0;
            width: 100%;
          }

          .forums-index-header .description {
            font-size: 14px;
            font-weight: normal;
          }

          .forums-index-sub-header {
            display: flex;
            text-transform: uppercase;
            border-bottom: 2px solid ${lightGray};
            color: ${darkBlueGray};
            padding: 18px 25px 6px;
            font-weight: bold;
          }

          .forums-index-list {
            list-style: none;
            padding: 0 25px;
          }

          .link-item {
            padding: 7px 0;
            margin: 4px auto;
            border-radius: 100px;
            color: ${darkBlueGray};
            cursor: pointer;
            display: flex;
            flex-direction: row;
            width: 100%;
          }

          .topic {
            color: ${pink};
            flex: 3;
          }

          .threads {
            flex: 1;
          }

          .link-item:hover,
          .highlight {
            background: ${turqoise};
            color: ${white};
          }

          .link-item:hover .topic,
          .highlight .topic {
            color: inherit;
          }
        `}
      </style>
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
