import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import VideoImageLoader from '../../components/common/telescope-image-loader/video-image-loader';
import CommunityMashup from '../../components/situation-room/CommunityMashup';
import { fetchShowContent } from '../../modules/community-content/get-show-content-actions';
import { fetchRecordedShow } from '../../modules/show-video-viewer/recorded-show-actions';
import { backgroundImageCover } from '../../styles/mixins/utilities';
import { white } from '../../styles/variables/colors';


const {
  bool,
  number,
  string,
  shape,
  func,
  arrayOf,
} = PropTypes;

function mapStateToProps({ videoViewerShow, communityShowContent }) {
  return {
    ...videoViewerShow,
    communityPosts: communityShowContent.resultBody.posts,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      fetchRecordedShow,
      fetchShowContent,
    }, dispatch),
  };
}

@connect(mapStateToProps, mapDispatchToProps)
class ShowVideoViewer extends Component {
  static propTypes = {
    actions: shape({
      fetchRecordedShow: func,
      fetchShowContent: func,
    }),
    params: shape({
      showId: string,
    }),
    showStreamCode: string,
    showStreamURL: string,
    hasSocialFlow: bool,
    hasPerspectives: bool,
    hasUpcomingShows: bool,
    hasRecommends: bool,
    recommends: arrayOf(shape({})),
    communityPosts: arrayOf(shape({})),
  }
  static defaultProps = {
    actions: {
      fetchRecordedShow: _.noop,
      fetchShowContent: _.noop,
    },
    showStreamCode: '',
    showStreamURL: '',
    hasSocialFlow: false,
    hasPerspectives: false,
    hasUpcomingShows: false,
    hasRecommends: false,
    recommends: [],
    params: {
      showId: null,
    },
    communityPosts: [],
  }
  constructor(props) {
    super(props);

    const { actions, params: { showId } } = props;

    actions.fetchRecordedShow({
      showId,
    });

    actions.fetchShowContent({
      showId,
      listType: 'sluglookupids',
    });
  }
  render() {
    const {
      actions,
      communityPosts,
      showStreamCode,
      showStreamURL,
      hasSocialFlow,
      hasPerspectives,
      hasUpcomingShows,
      hasRecommends,
      recommends
    } = this.props;

    return (
      <div>
        <header className="header">
          <h1 className="header-title">Video Viewer</h1>
        </header>
        <main className="main-container">
          { showStreamCode && <VideoImageLoader
            teleStreamCode={showStreamCode}
            teleStreamURL={showStreamURL}
            teleStreamThumbnailVideoWidth="1000"
            teleStreamThumbnailVideoHeight="550"
            showVideoControls={1}
            showInfo={1}
          />}
        </main>
        <CommunityMashup
          hasSocialFlow={hasSocialFlow}
          hasPerspectives={hasPerspectives}
          hasUpcomingShows={hasUpcomingShows}
          hasRecommends={hasRecommends}
          communityPosts={communityPosts}
          recommends={recommends}
        />
        <style jsx>{`
          .header {
            ${backgroundImageCover}
            background-image: url(../../../assets/images/photos/enigma.png);
            color: ${white};
            width: 100%;
            height: 140px;
            margin-top: -20px;
            position: relative;
          }

          .header-title {
            position: absolute;
            bottom: 5px;
            left: 20px;
            text-transform: uppercase;
          }

          .main-container {
            display: flex;
            flex-direction: row;
          }
        `}</style>
      </div>
    );
  }

}

export default ShowVideoViewer;
