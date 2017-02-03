import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import _ from 'lodash';
import ByUserTag from '../../components/common/by-user-tag/by-user-tag';
import CommunityPostTools from '../../components/community/tools/community-post-tools'
import { iconCategory as icon } from '../../components/community/tools/community-icon';
import styles from './object-post.scss';

class ObjectPostList extends Component {

  prepareData(objectPosts) {
    return objectPosts.map((v, k) =>
      <div key={k}>
        <div className={styles.ObjectPostList} key={v.postId}>
          <span className={styles.ObjectPostListID}>{k+1}.</span>

          <figure className={styles.ObjectPostListInfo}>
            <Link to={`community/post/${v.postId}`}>
              <h2 dangerouslySetInnerHTML={{ __html: v.title }} className={styles.ObjectPostListInfoTitle}></h2>
            </Link>

            <div className="row">
              <div className="col-md-6">
                <ByUserTag
                  photo={v.avatarURL}
                  name={v.displayName}
                  accountType={v.membershipType}
                  memberSince={v.memberSince}
                  location={v.location}
                  theme="light"
                />
              </div>

              <div className="col-md-2 pull-right">
                <img className="icon" src={v.typeIconURL} />
              </div>

              <div className="col-md-3 pull-right">
                <div className={styles.ObjectPostListToolsHot}>
                  <CommunityPostTools {...v.postTools} share={false} />
                </div>
              </div>
            </div>

            <figcaption className={styles.ObjectPostListInfoDesc}>
              <h3>HOW IT MADE THE LIST</h3>
              <span dangerouslySetInnerHTML={{ __html: (v.rubric || v.excerpt) }}></span>
            </figcaption>

          </figure>

        </div>

        <hr className={styles.ObjectPostListHr} />
      </div>
    );
  }

  render() {
    const { objectPosts } = this.props;
    const isEmpty = !objectPosts || _.isEmpty(objectPosts);
    const noPosts = (
      <div>
        <h3>No posts available...</h3>
      </div>
    );

    return (
      <div>
        {isEmpty && noPosts }
        {!isEmpty && this.prepareData(objectPosts)}
      </div>
    );
  }
}

ObjectPostList.propTypes = {
  pages: PropTypes.number,
  objectPosts: PropTypes.array,
  fetchObjectPosts: PropTypes.func,
  path: PropTypes.string,
};


export default ObjectPostList
