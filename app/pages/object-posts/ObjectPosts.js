import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ObjectPostList from '../../components/object-post/object-post-list';
import SloohRecommends from '../../components/common/recommendations/SloohRecommends';
import OtherFeaturedObjects from '../../components/common/OtherFeaturedObjects/OtherFeaturedObjects';
import GenericLoadingBox from '../../components/common/loading-screens/generic-loading-box';
import MissionAd from '../../components/missions/mission-ad';

const mapStateToProps = ({ objectPostList }) => ({
  fetchingPosts: objectPostList.fetching,
  objectPosts: objectPostList.objectPosts,
  pages: objectPostList.pages,
});

@connect(mapStateToProps)
class ObjectPosts extends Component {
  static propTypes = {
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
      headerObjectTitle,
      route: { path }
    } = this.props;

    return (
      <section className="container clearfix">
        <div className="col-md-8 nopadding">

          {
            fetchingPosts ? <GenericLoadingBox />
            :
            <ObjectPostList
              objectPosts={objectPosts}
              pages={pages}
              path={path}
            />
          }
        </div>

        <div className="col-md-4 mission-sidebar">
          {
            showRecommends ?
              <SloohRecommends
                title="Reserve A Mission Now"
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
