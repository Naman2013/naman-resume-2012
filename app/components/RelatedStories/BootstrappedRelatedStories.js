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
    relatedStoriesList: arrayOf(shape()),
    relatedStoriesListCount: number,
  }

  static defaultProps = {
    isDesktop: false,
    relatedStoriesList: [],
    postsCount: 0,

  };

  state = {
    showInfo: !this.props.isDesktop,
  };



  render() {
    const {
      isDesktop,
      relatedStoriesList,
      relatedStoriesListCount,
    } = this.props;

    return (<div className="root">
      <div className="related-stories-title">Related Stories <span className="related-stories-count">({relatedStoriesListCount})</span></div>
      {relatedStoriesList.length > 0  ?
        <AveryTile title={relatedStoriesList[0].title} avatarURL={relatedStoriesList[0].avatarURL} /> :
        null
      }
      <style jsx>{styles}</style>
    </div>);
  }
}

export default BootstrappedRelatedStories;
