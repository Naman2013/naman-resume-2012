import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Pagination from 'rc-pagination';
import { Link } from 'react-router';
import uniqueId from 'lodash/uniqueId';
import isEmpty from 'lodash/isEmpty';
import ByUserTag from '../../components/common/by-user-tag/by-user-tag';
import CommunityPostTools from '../../components/community/tools/community-post-tools';
import styles from './object-post.scss';

class ObjectPostList extends Component {

  prepareData(objectPosts, firstPostIndex) {
    return objectPosts.map((v, k) =>
      <div key={uniqueId()}>
        <div className={styles.ObjectPostList} key={v.postId}>
          <span className={styles.ObjectPostListID}>{firstPostIndex + k}.</span>

          <figure className={styles.ObjectPostListInfo}>
            <Link to={`/community/post/${v.postId}`}>
              <h2 dangerouslySetInnerHTML={{ __html: v.title }} className={styles.ObjectPostListInfoTitle}></h2>
            </Link>

            <div className="row">
              <div className="col-md-6 col-xs-12">
                <ByUserTag
                  photo={v.avatarURL}
                  name={v.displayName}
                  accountType={v.membershipType}
                  memberSince={v.memberSince}
                  location={v.location}
                  theme="light"
                />
              </div>

              <div className="col-sm-3 hidden-xs">
                <img className="icon" src={v.typeIconURL} />
              </div>

              <div className="col-sm-3 hidden-xs">
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


             <div className="row visible-xs">
               <div className="col-xs-6">
                 <img className="icon" src={v.typeIconURL} />
               </div>

               <div className="col-xs-6">
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

  handlePageChange = (page) => {
    const { fetchObjectLatestContent, SlugLookupId } = this.props;
    fetchObjectLatestContent({
      page,
      SlugLookupId,
    });
  };

  render() {
    const {
      objectPosts,
      page,
      count,
      postsCount,
      firstPostIndex,
    } = this.props;
    const hasPosts = !objectPosts || isEmpty(objectPosts);
    const noPosts = (
      <div>
        <h3>No posts available...</h3>
      </div>
    );
    return (
      <div>
        {hasPosts && noPosts}
        {!hasPosts && this.prepareData(objectPosts, firstPostIndex)}
        <div className="pagination">
          <Pagination
            onChange={this.handlePageChange}
            defaultPageSize={count}
            current={page}
            total={postsCount}
          />
        </div>
        <style jsx>
          {`
            .pagination {
              margin: 25px 50px;
            }
          `}
        </style>
      </div>
    );
  }
}

ObjectPostList.propTypes = {
  SlugLookupId: PropTypes.string.isRequired,
  fetchObjectLatestContent: PropTypes.func.isRequired,
  pages: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  postsCount: PropTypes.number.isRequired,
  objectPosts: PropTypes.array,
  fetchObjectPosts: PropTypes.func.isRequired,
  path: PropTypes.string,
};


export default ObjectPostList
