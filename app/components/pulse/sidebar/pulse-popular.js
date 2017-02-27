import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { uniqueId } from 'lodash';
import { iconCategory as icon } from '../../community/tools/community-icon';
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
  }

  static defaultProps = {
    list: [],
  }

  render() {
    const { tag, list } = this.props;
    return (
      <div className={styles.pulsePopular}>

        <header className={styles.pulsePopularHeader}>
          {tag ? <h4>More About <Link to="#" className="tag">{tag}</Link></h4> : <h4>Popular Posts on Slooh Pulse</h4>}
          <p>As submitted by the Slooh Community...</p>
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
