import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Pagination from 'rc-pagination';
import { Link } from 'react-router';
import uniqueId from 'lodash/uniqueId';
import isEmpty from 'lodash/isEmpty';
import ByUserTag from '../../components/common/by-user-tag/by-user-tag';
import CommunityPostTools from '../../components/community/tools/community-post-tools';
import styles from './object-story.scss';

class ObjectStoryList extends Component {

  prepareData(objectPosts, firstPostIndex) {
    return objectPosts.map((v, k) =>
      <div key={uniqueId()} className={styles.storyCard}>
        SLOOH STORIES
        <div key={v.postId}>

          <figure className={styles.ObjectStoryListInfo}>
            <Link to={`/community/post/${v.postId}`}>
              <h2 dangerouslySetInnerHTML={{ __html: v.title }} className={styles.ObjectStoryListInfoTitle}></h2>
            </Link>

            <figcaption className={styles.ObjectStoryListInfoDesc}>
              <span dangerouslySetInnerHTML={{ __html: (v.rubric || v.excerpt) }}></span>
            </figcaption>
              
            <ByUserTag
              photo={v.avatarURL}
              name={v.displayName}
              accountType={v.membershipType}
              memberSince={v.memberSince}
              location={v.location}
              theme="light"
            />

            {/*<div className={styles.ObjectStoryListToolsHot}>
              <CommunityPostTools
                type={v.type}
                authorId={v.customerId}
                objectSlug={v.slug}
                likesCount={v.likesCount}
                showLikePrompt={v.showLikePrompt}
                likePrompt={v.likePrompt}
                likeId={v.postId}
              />
            </div>*/}

          </figure>

        </div>
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
      <div className="card-container__stories">
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
            .card-container__stories {
              display: flex;
              flex-wrap: wrap;
              justify-content: space-between;
            }
          `}
        </style>
      </div>
    );
  }
}

ObjectStoryList.propTypes = {
  SlugLookupId: PropTypes.string.isRequired,
  fetchObjectLatestContent: PropTypes.func.isRequired,
  pages: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  postsCount: PropTypes.number.isRequired,
  objectPosts: PropTypes.array,
  fetchObjectPosts: PropTypes.func.isRequired,
  /*path: PropTypes.string,*/
};


export default ObjectStoryList
