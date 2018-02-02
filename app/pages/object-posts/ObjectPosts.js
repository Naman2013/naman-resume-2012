import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ObjectPostList from '../../components/object-post/object-post-list';
import SloohRecommends from '../../components/common/recommendations/SloohRecommends';
import OtherFeaturedObjects from '../../components/common/OtherFeaturedObjects/OtherFeaturedObjects';
import Guardian from '../../components/common/guardian/Guardian';
import GenericLoadingBox from '../../components/common/loading-screens/generic-loading-box';

const mapStateToProps = ({ objectPostList }) => ({
  fetchingPosts: objectPostList.fetching,
  objectPosts: objectPostList.objectPosts,
  pages: objectPostList.pages,
  count: objectPostList.count,
  page: objectPostList.page,
  postsCount: objectPostList.postsCount,
  firstPostIndex: objectPostList.firstPostIndex,
});

@connect(mapStateToProps)
class ObjectPosts extends Component {
  static propTypes = {
    fetchObjectLatestContent: PropTypes.func.isRequired,
    fetchingPosts: PropTypes.bool,
    showRecommends: PropTypes.bool.isRequired,
    showAdUnit: PropTypes.bool.isRequired,
    showLatestEntriesMenu: PropTypes.bool.isRequired,
    showPostTypesSubmenu: PropTypes.bool.isRequired,
    showGuardian: PropTypes.bool.isRequired,
    showFeaturedObjects: PropTypes.bool.isRequired,
    showFollowObjectButton: PropTypes.bool.isRequired,
    showCreateNewPostButton: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    fetchingPosts: true,
  }

  render() {
    const {
      fetchingPosts,
      fetchObjectLatestContent,
      firstPostIndex,
      recommendationCards,
      objectPosts,
      pages,
      showRecommends,
      showAdUnit,
      showLatestEntriesMenu,
      showPostTypesSubmenu,
      showGuardian,
      showFeaturedObjects,
      showFollowObjectButton,
      showCreateNewPostButton,
      SlugLookupId,
      headerObjectTitle,
      count,
      page,
      postsCount,
      route: { path }
    } = this.props;

    return (
      <section className="container clearfix">
        <div className="col-md-8 nopadding">

          {
            fetchingPosts ?
              <GenericLoadingBox />
            :
              <ObjectPostList
                objectPosts={objectPosts}
                pages={pages}
                page={page}
                count={count}
                path={path}
                postsCount={postsCount}
                fetchObjectLatestContent={fetchObjectLatestContent}
                SlugLookupId={SlugLookupId}
                firstPostIndex={firstPostIndex}
              />
          }
        </div>

        <div className="col-md-4 mission-sidebar">
          {showGuardian && <Guardian slugLookupId={SlugLookupId} />}
          {
            showRecommends ?
              <SloohRecommends
                title="Schedule A Mission Now"
                subTitle={`See ${headerObjectTitle} through Slooh's Telscopes`}
                recommendations={recommendationCards}
              /> : null
          }
          <OtherFeaturedObjects />
        </div>
      </section>
    );
  }
}

export default ObjectPosts;
