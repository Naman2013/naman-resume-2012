import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import uniqueId from 'lodash/uniqueId';
import isEmpty from 'lodash/isEmpty';
import ByUserTag from '../../components/common/by-user-tag/by-user-tag';
import CommunityPostTools from '../../components/community/tools/community-post-tools';
import styles from './object-post.scss';

class ObjectPostList extends Component {

  prepareData(objectPosts) {
    return objectPosts.map((v, k) =>
      <div key={uniqueId()}>
        <div className={styles.ObjectPostList} key={v.postId}>
          <span className={styles.ObjectPostListID}>{k+1}.</span>

          <figure className={styles.ObjectPostListInfo}>
            <Link to={`community/post/${v.postId}`}>
              <h2 dangerouslySetInnerHTML={{ __html: v.title }} className={styles.ObjectPostListInfoTitle}></h2>
            </Link>

            <div className="row">
              <div className="col-xs-6">
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

              <div className="col-xs-3 pull-right">
                <div className={styles.ObjectPostListToolsHot}>
                  <CommunityPostTools
                    type={v.type}
                    authorId={v.customerId}
                    objectSlug={v.slug}
                    likesCount={v.likesCount}
                    showLikePrompt={v.showLikePrompt}
                    likePrompt={v.likePrompt}
                    likeId={v.postId}
                  />
                </div>
              </div>
            </div>

            <figcaption className={styles.ObjectPostListInfoDesc}>
              {
                /**
                  <h3>HOW IT MADE THE LIST</h3>
                */
              }
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
    const hasPosts = !objectPosts || isEmpty(objectPosts);
    const noPosts = (
      <div>
        <h3>No posts available...</h3>
      </div>
    );

    return (
      <div>
        {hasPosts && noPosts}
        {!hasPosts && this.prepareData(objectPosts)}
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
