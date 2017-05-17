import React, { Component, PropTypes, cloneElement } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Pagination from 'rc-pagination';
import GenericLoadingBox from '../../components/common/loading-screens/generic-loading-box';
import PulsePopular from '../../components/pulse/sidebar/pulse-popular';
import SloohRecommends from '../../components/common/recommendations/SloohRecommends';
import CommunityPostHeader from '../../components/community/community-post-header';
import MissionAd from '../../components/missions/mission-ad';
import { fetchPost, fetchAuthorContent } from '../../modules/pulse/get-post-action';
import { getRandomAdvertisementIndex } from '../../modules/utils';
import PulsePostContent from '../../pages/pulse/pulse-post';

function mapStateToProps({ post }, ownProps) {
  return {
    ...post,
    id: ownProps.params.id,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      fetchPost,
      fetchAuthorContent,
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

    this.randomAdIdx = getRandomAdvertisementIndex();
    props.actions.fetchPost(this.props.id);
  }

  componentWillReceiveProps(nextProps) {
    const previousPostID = this.props.id;
    const nextPostID = nextProps.id;
    if (previousPostID !== nextPostID) {
      this.props.actions.fetchPost(nextPostID);
    }
  }

  fetchMoreAuthorPosts = (page) => {
    const { actions, authorContent, post } = this.props;
    actions.fetchAuthorContent({
      page,
      authorId: post.customerId,
      ignorePostId: post.postId,
    });
  }

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
      pageMeta: {
        headerIconURL,
        headerObjectTitle,
        showRecommends,
        showCreateNewPostButton,
        objectId,
        slugLookupId,
      },
      authorContent,
    } = this.props;
    const recommendations = [Number(objectId)];

    return (
      <div className="clearfix pulse">

        <CommunityPostHeader
          titleText={headerObjectTitle}
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
            {authorContent.posts &&
              <div>
                <h4 className="center">More posts from this author</h4>
                <hr />
                {authorContent.posts.map(data => <PulsePostContent showExcerpt post={data} key={data.postId} />)}
                <Pagination onChange={this.fetchMoreAuthorPosts} defaultPageSize={authorContent.count} current={authorContent.page} total={authorContent.postsCount} />
              </div>
            }
          </div>

          <aside className="col-md-4 mission-sidebar">
            <MissionAd index={this.randomAdIdx} />
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
