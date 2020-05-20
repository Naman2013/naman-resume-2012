/** *********************************
 * V4 Related Stories populated with info
 *
 *
 *
 ********************************** */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import AveryTile from '../common/tiles/AveryTile';
import styles from './RelatedStories.style';

const { arrayOf, shape } = PropTypes;

class BootstrappedRelatedStories extends Component {
  static propTypes = {
    relatedStoriesList: arrayOf(shape()),
  };

  static defaultProps = {
    relatedStoriesList: [],
  };

  render() {
    const { relatedStoriesList, isMobile } = this.props;
    const mobileStyles = {
      height: '200px',
      width: '300px',
      margin: '0 auto 10px',
    };

    const nonMobileStyles = {
      height: '300px',
      width: '300px',
      marginBottom: '10px',
    };

    const theme = isMobile ? mobileStyles : nonMobileStyles;
    
    return (
      <div className="root">
        {relatedStoriesList.map(item => (
          <Link to={item.linkUrl} key={`story-${item.postId}`}>
            <AveryTile
              title={item.title}
              iconUrl={item.imageUrl}
              theme={theme}
            />
          </Link>
        ))}
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default BootstrappedRelatedStories;
