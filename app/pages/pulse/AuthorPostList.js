import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Pagination from 'rc-pagination';
import { Link } from 'react-router';
import uniqueId from 'lodash/uniqueId';
import isEmpty from 'lodash/isEmpty';
import ByUserTag from '../../components/common/by-user-tag/by-user-tag';
import CommunityPostTools from '../../components/community/tools/community-post-tools';
import { lightBlue, pink, black } from '../../styles/variables/colors';


class AuthorPostList extends Component {

  prepareData = (posts, firstPostIndex) => {
    return posts.map((v, k) =>
      <div key={uniqueId()}>
        <div className="author-post-list" key={v.postId}>
          <span className="author-post-list-id">{firstPostIndex + k}.</span>

          <figure className="author-post-list-info">
            <Link to={`/community/post/${v.postId}`}>
              <h2 dangerouslySetInnerHTML={{ __html: v.title }} className="author-post-list-info-title"></h2>
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
                <div className="author-post-list-tools">
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
                 <div className="author-post-list-tools">
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

            <figcaption className="author-post-list-info-desc">
              <span dangerouslySetInnerHTML={{ __html: (v.rubric || v.excerpt) }}></span>
            </figcaption>
          </figure>
        </div>
        <hr className="author-post-list-hr" />
        <style jsx>{`
            .author-post-list {
              display: flex;
            }

            .author-post-list .row {
              display: flex;
              align-items: center;
            }

            .author-post-list-id {
              font-size: 110px;
              color: ${lightBlue};
              padding: 0 20px 10px 30px;
              display: block;
              font-weight: 700;
            }

            .author-post-list-info {
              font-size: 16px;
              color: ${black};
              padding: 35px 140px 10px 30px;
            }

            .author-post-list-info-title {
              font-size: 35px;
              color: ${pink};
              text-decoration: none;
              font-weight: 500;
              margin: 0;
              display: flex;
              align-items: flex-end;
              height: 90px;
            }
            .author-post-list-desc {
              margin-bottom: 0;
              white-space: pre-wrap;
              margin-top: 15px;
            }

            .author-post-list-desc h3 {
              font-weight: 700;
              color: #546069;
              font-size: 15px;
              padding-bottom: 5px;
            }

            .author-post-list-hr {
              display: block;
              width: 90%;
              margin: 15px auto -10px;
              background: #E6E6E4;
              height: 1px;
              border: 0;
            }

            @media(max-width:767px){
              .author-post-list-hr {
                margin-bottom:10px;
              }
            }
          `}</style>
      </div>
    );
  }

  handlePageChange = (page) => {
    const { fetchAuthorContent, authorId } = this.props;
    fetchAuthorContent({
      page,
      authorId,
    });
  };

  render() {
    const {
      posts,
      page,
      count,
      postsCount,
      firstPostIndex,
    } = this.props;
    const hasNoPosts = !posts || isEmpty(posts);
    const noPosts = (
      <div>
        <h3>No posts available...</h3>
      </div>
    );
    return (
      <div>
        {hasNoPosts && noPosts}
        {!hasNoPosts && this.prepareData(posts, firstPostIndex)}
        <div className="pagination">
          <Pagination
            onChange={this.handlePageChange}
            defaultPageSize={count}
            current={page}
            total={postsCount}
          />
        </div>

        <style jsx>{`
            .pagination {
              margin: 25px 50px;
            }
          `}</style>
      </div>
    );
  }
}

AuthorPostList.propTypes = {
  authorId: PropTypes.string.isRequired,
  fetchAuthorContent: PropTypes.func.isRequired,
  pages: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  postsCount: PropTypes.number.isRequired,
  posts: PropTypes.array,
  path: PropTypes.string,
};


export default AuthorPostList
