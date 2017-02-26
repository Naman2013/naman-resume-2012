import React, { Component, PropTypes, cloneElement } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import GenericLoadingBox from '../../components/common/loading-screens/generic-loading-box';
import PulsePopular from '../../components/pulse/sidebar/pulse-popular';
import PulseRecommended from '../../components/pulse/sidebar/pulse-recommends';
import SloohRecommends from '../../components/common/recommendations/SloohRecommends';
import CommunityPostHeader from '../../components/community/community-post-header';
import MissionAd from '../../components/missions/mission-ad';
import { fetchPost } from '../../modules/pulse/get-post-action';

const list = [
  {
    label: "A Painting Inspired by the possibility of life on Europa",
    link: "#",
    type: "ART_CULTURE",
  }, {
    label: "New Comet Discovered by Slooh Members",
    link: "#",
    type: "SCIENCE_LOG",
  }, {
    label: "My image of the M12 Globular Cluster taken from the Canary Islands",
    link: "#",
    type: "DIY",
  }, {
    label: "My Horoscope Changed! Who Am I Now?",
    link: "#",
    type: "HUMAN_SPIRIT",
  }, {
    label: "Image of Jupiter Moon transit",
    link: "#",
    type: "SCIENCE_LOG",
  },
];

const tag = 'The Moon';

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
  constructor(props) {
    super(props);
    props.actions.fetchPost(this.props.id);
  }

  render() {
    const {
      post,
      fetching,
      children,
      pageMeta: {
        headerIconURL,
        headerObjectTitle,
        showRecommends,
        showCreateNewPostButton,
        objectId,
      }
    } = this.props;

    const recommendations = [Number(objectId)];

    return (
      <div className="clearfix pulse">

        <CommunityPostHeader
          titleText={headerObjectTitle}
          objectIconURL={headerIconURL}
          showCreateNewPostButton={showCreateNewPostButton}
        />

        <section className="container clearfix">

          <div className="col-md-8 nopadding">
            {
              fetching ? <GenericLoadingBox /> :

              cloneElement(children, {
                post,
              })

            }
          </div>

          <aside className="col-md-4 mission-sidebar">
            <MissionAd />
            {
              showRecommends ?
                <SloohRecommends
                  title="Reserve A Mission Now"
                  subTitle={`See ${headerObjectTitle} through Slooh's Telescopes`}
                  recommendations={recommendations}
                /> : null
            }

            <PulsePopular list={list} />
            <PulsePopular tag={tag} list={list} />
          </aside>

        </section>
      </div>
    )
  }
}

export default PulsePost;

PulsePost.propTypes = {
  children: PropTypes.element.isRequired
};
