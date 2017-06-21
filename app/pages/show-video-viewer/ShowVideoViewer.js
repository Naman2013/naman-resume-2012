import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import GoogleAd from '../../components/common/google-ads/GoogleAd';
import VideoImageLoader from '../../components/common/telescope-image-loader/video-image-loader';
import CommunityMashup from '../../components/situation-room/CommunityMashup';
import { fetchShowContent } from '../../modules/community-content/get-show-content-actions';
import { fetchRecordedShow } from '../../modules/show-video-viewer/recorded-show-actions';
import { backgroundImageCover } from '../../styles/mixins/utilities';
import { previousShows } from '../../services/shows/previous-shows';
import { upcomingShows } from '../../services/shows/upcoming-shows';


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
      fetchPreviousShows: func,
    }),
    params: shape({
      showId: string,
    }),
    showStreamCode: string,
    showStreamURL: string,
    hasSocialFlow: bool,
    hasRecentShows: bool,
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
    hasRecentShows: false,
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

    this.state = {
      upcomingShowsList: [],
      previousShowsList: [],
    };

    const { actions, params: { showId } } = props;

    actions.fetchRecordedShow({
      showId,
    });

    actions.fetchShowContent({
      showId,
      listType: 'sluglookupids',
    });

    previousShows({
      page: 1,
      count: 9,
    }).then((res) => {
      this.setState({
        previousShowsList: res.data.eventList,
      });
    });

    upcomingShows({
      page: 1,
      count: 9,
    }).then((res) => {
      this.setState({
        upcomingShowsList: res.data.eventList,
      });
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
      hasRecentShows,
      hasRecommends,
      recommends
    } = this.props;

    const { upcomingShowsList, previousShowsList } = this.state;

    return (
      <div>
        <header className="header">
          <h1 className="header-title">Video Viewer</h1>
        </header>
        <main className="main-container">
        <div className="video">
          <VideoImageLoader
            teleStreamCode={showStreamCode}
            teleStreamURL={showStreamURL}
            teleStreamThumbnailVideoWidth="800"
            teleStreamThumbnailVideoHeight="550"
            showVideoControls={1}
            showInfo={1}
          />
          </div>
          <div className="ad">
            <GoogleAd
              adURL={'/5626790/Replay'}
              adWidth={300}
              adHeight={600}
              targetDivID={'div-gpt-ad-1495118239378-0'}
            />
          </div>
        </main>
        <CommunityMashup
          hasSocialFlow={hasSocialFlow}
          hasPerspectives={hasPerspectives}
          hasUpcomingShows={hasUpcomingShows}
          hasRecentShows={hasRecentShows}
          hasRecommends={hasRecommends}
          communityPosts={communityPosts}
          recommends={recommends}
          upcomingShows={upcomingShowsList}
          recentShows={previousShowsList}
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

          .ad {
            margin-left: 50px;
          }
          .video {
            margin-left: 50px;
          }
        `}</style>
      </div>
    );
  }

}

export default ShowVideoViewer;
