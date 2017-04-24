import React, { Component, PropTypes, cloneElement } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import GenericLoadingBox from '../../components/common/loading-screens/generic-loading-box';
import PulsePopular from '../../components/pulse/sidebar/pulse-popular';
import SloohRecommends from '../../components/common/recommendations/SloohRecommends';
import CommunityPostHeader from '../../components/community/community-post-header';
import MissionAd from '../../components/missions/mission-ad';
import { fetchPost } from '../../modules/pulse/get-post-action';
import { getRandomAdvertisementIndex } from '../../modules/utils';

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
      }
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
          </div>

          <aside className="col-md-4 mission-sidebar">
            <MissionAd index={this.randomAdIdx}/>
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
