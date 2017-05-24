import React, { Component, PropTypes, cloneElement } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Pagination from 'rc-pagination';
import GenericLoadingBox from '../../components/common/loading-screens/generic-loading-box';
import PulsePopular from '../../components/pulse/sidebar/pulse-popular';
import SloohRecommends from '../../components/common/recommendations/SloohRecommends';
import CommunityPostHeader from '../../components/community/community-post-header';
import GoogleAd from '../../components/common/google-ads/GoogleAd';
import { fetchPost, fetchContent } from '../../modules/pulse/get-post-action';
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

  fetchMoreAuthorPosts = (page) => {
    const { actions, content, post } = this.props;
    actions.fetchContent({
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
      content,
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
            {content.posts &&
              <div>
                <h3 className="center">More posts from this author</h3>
                <hr />
                {content.posts.map(data => <PulsePostContent showExcerpt="true" post={data} key={data.postId} />)}
                <Pagination
                  onChange={this.fetchMoreAuthorPosts}
                  defaultPageSize={content.count}
                  current={content.page}
                  total={content.postsCount}
                />
              </div>
            }
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
