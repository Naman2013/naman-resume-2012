import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import GenericLoadingBox from '../../components/common/loading-screens/generic-loading-box';
import PulsePopular from '../../components/pulse/sidebar/pulse-popular';
import SloohRecommends from '../../components/common/recommendations/SloohRecommends';
import CommunityPostHeader from '../../components/community/community-post-header';
import GoogleAd from '../../components/common/google-ads/GoogleAd';
import SharedPictures from '../../components/home/shared-pictures';
import { fetchPost, fetchContent } from '../../modules/pulse/get-post-action';

function mapStateToProps({ post, sharedMemberPhotos }, ownProps) {
  return {
    ...post,
    sharedMemberPhotos,
    id: ownProps.params.id,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      fetchPost,
      fetchContent,
    }, dispatch),
  };
}

@connect(mapStateToProps, mapDispatchToProps)
class PulsePost extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
  }

  constructor(props) {
    super(props);
    props.actions.fetchPost(this.props.id);
  }

  componentWillReceiveProps(nextProps) {
    const previousPostID = this.props.id;
    const nextPostID = nextProps.id;
    if (previousPostID !== nextPostID) {
      this.props.actions.fetchPost(nextPostID);
    }
  }

  // fetchMoreAuthorPosts = (page) => {
  //   const { actions, content, post } = this.props;
  //   actions.fetchContent({
  //     page,
  //     authorId: post.customerId,
  //     ignorePostId: post.postId,
  //   });
  // }

  render() {
    const {
      fetchingPopularPosts,
      popularPosts,
      fetchingMoreAboutObject,
      moreAboutObject,
      post,
      fetching,
      failed,
      children,
      sharedMemberPhotos: {
        imageList,
        timelineData
      },
      pageMeta: {
        headerIconURL,
        headerObjectTitle,
        headerSubtitle,
        showRecommends,
        showCreateNewPostButton,
        objectId,
        slugLookupId,
      },
    } = this.props;
    const recommendations = [Number(objectId)];
    return (
      <div className="clearfix pulse">

        <CommunityPostHeader
          titleText={headerObjectTitle}
          subtitleText={headerSubtitle}
          errorOccurred={failed}
          objectIconURL={headerIconURL}
          showCreateNewPostButton={showCreateNewPostButton}
        />

        <section className="container clearfix">
          <div className="col-md-8 nopadding">
            {
              fetching ? <GenericLoadingBox /> : null
            }
            {
              !fetching && !failed ?
                cloneElement(children, {
                  post,
                }) : null
            }
            {
              !fetching && failed ? <GenericLoadingBox text="This post is not available." /> : null
            }
              <div className="pulse-post-extras">
                <h3 className="center">
                  <Link to={`/authors/${post.customerId}`}>
                    More posts from this author
                  </Link>
                </h3>
                {post.showMemberPicturesFlag && <SharedPictures
                  heading={post.memberPicturesHeading}
                  subheading={post.memberPicturesSubHeading}
                  imageList={imageList}
                  timelineData={timelineData}
                />}
{/*                <hr />
                <Pagination
                  onChange={this.fetchMoreAuthorPosts}
                  defaultPageSize={content.count}
                  current={content.page}
                  total={content.postsCount}
                />
                  */}
              </div>

          </div>

          <aside className="col-md-4 mission-sidebar">
            <GoogleAd
              adURL={'/5626790/Community'}
              adWidth={300}
              adHeight={250}
              targetDivID={'div-gpt-ad-1495110800300-0'}
            />

            {
              showRecommends ?
                <SloohRecommends
                  title="Reserve A Mission Now"
                  subTitle={`See ${headerObjectTitle} through Slooh's Telescopes`}
                  recommendations={recommendations}
                /> : null
            }

            {
              moreAboutObject.itemList.length > 0 ?
                <PulsePopular
                  tag={headerObjectTitle}
                  list={moreAboutObject.itemList}
                  slugLookupId={slugLookupId}
                /> : null
            }

            {
              popularPosts.itemList.length > 0 ?
                <PulsePopular
                  list={popularPosts.itemList}
                /> : null
            }
          </aside>

        </section>
      </div>
    );
  }
}

export default PulsePost;
