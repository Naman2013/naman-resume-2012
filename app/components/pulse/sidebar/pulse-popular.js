import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import uniqueId from 'lodash/uniqueId';
import styles from '../style/pulse-popular.scss';

class PulsePopular extends Component {
  static propTypes = {
    list: PropTypes.arrayOf(PropTypes.shape({
      itemIndex: PropTypes.number.isRequired,
      status: PropTypes.string.isRequired,
      displayOrder: PropTypes.number.isRequired,
      startTimestamp: PropTypes.number.isRequired,
      endTimestamp: PropTypes.number.isRequired,
      postId: PropTypes.number.isRequired,
      slugLookupId: PropTypes.number.isRequired,
      itemTitle: PropTypes.string.isRequired,
      itemIconURL: PropTypes.string.isRequired,
      itemObjectTitle: PropTypes.string.isRequired,
      itemDescription: PropTypes.string.isRequired,
      itemURL: PropTypes.string.isRequired,
    })),
    tag: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    slugLookupId: PropTypes.number,
  }

  static defaultProps = {
    list: [],
  }

  render() {
    const { tag, list, title, subtitle, slugLookupId } = this.props;
    return (
      <div className={styles.pulsePopular}>

        <header className={styles.pulsePopularHeader}>
          {tag ? <h4>{title ? `${title} ` : 'More About '} <Link to={`/objects/latest-entries/${slugLookupId}/all`} className="tag">{tag}</Link></h4> : <h4>Popular Posts on Slooh Pulse</h4>}
          <p>
            {subtitle || 'As submitted by the Slooh Community...'}
          </p>
        </header>

        <ul className={styles.pulsePopularContainer}>
          {
            list.map((post) => {
              const linkURL = post.itemURL ? post.itemURL : `/community/post/${post.postId}`;
              return (
                <li key={uniqueId()}>
                  <img alt="" className={styles.icon} src={post.itemIconURL} />
                  <Link to={linkURL} dangerouslySetInnerHTML={{ __html: post.itemTitle }} />
                </li>
              );
            }
          )
        }
        </ul>

      </div>
    );
  }
}

export default PulsePopular;
