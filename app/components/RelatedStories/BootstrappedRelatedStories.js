/** *********************************
 * V4 Related Stories populated with info
 *
 *
 *
 ********************************** */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
    const { relatedStoriesList } = this.props;

    return (
      <div className="root">
        {relatedStoriesList.map(item => (
          <AveryTile
            key={`story-${item.showId}`}
            title={item.title}
            avatarURL={item.avatarURL}
            theme={{
              marginBottom: '10px',
            }}
          />
        ))}
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default BootstrappedRelatedStories;
