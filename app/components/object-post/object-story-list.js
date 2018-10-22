import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Pagination from 'rc-pagination';
import { Link } from 'react-router';
import uniqueId from 'lodash/uniqueId';
import isEmpty from 'lodash/isEmpty';
import ByUserTag from '../../components/common/by-user-tag/by-user-tag';
import CommunityPostTools from '../../components/community/tools/community-post-tools';
import StoryTile from 'components/common/tiles/StoryTile';


class ObjectStoryList extends Component {

  prepareData(objectPosts, firstPostIndex) {
    return objectPosts.map((v, k) =>
    <Fragment>
      <StoryTile
        key={uniqueId()}
        iconURL="https://vega.slooh.com/icons/home/observatory.png"
        title="Constellation Stories with Helen Avery"
        author="BY HELEN AVERY"
      />
    </Fragment>
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
        <style jsx>
          {`
            .pagination {
              margin: 25px 50px;
            }
            .card-container__stories {
              display: flex;
              flex-wrap: wrap;
              justify-content: space-between;
              padding: 40px 0;
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
