/***********************************
* V4 Related Stories populated with info
*
*
*
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import classnames from 'classnames';
import uniqueId from 'lodash/uniqueId';
import AveryTile from 'components/common/tiles/AveryTile';

import styles from './RelatedStories.style';

const {
  arrayOf,
  bool,
  number,
  shape,
  string,
} = PropTypes;

class BootstrappedRelatedStories extends Component {
  static propTypes = {
    isDesktop: bool,
    posts: arrayOf(shape()),
    postsCount: number,
  }

  static defaultProps = {
    isDesktop: false,
    posts: [],
    postsCount: 0,

  };

  state = {
    showInfo: !this.props.isDesktop,
  };



  render() {
    const {
      isDesktop,
      posts,
      postsCount,
    } = this.props;

    return (<div className="root">
      <div className="related-stories-title">Related Stories <span className="related-stories-count">({postsCount})</span></div>
      {posts.length > 0  ?
        <AveryTile title={posts[0].title} avatarURL={posts[0].avatarURL} /> :
        null
      }
      <style jsx>{styles}</style>
    </div>);
  }
}

export default BootstrappedRelatedStories;
