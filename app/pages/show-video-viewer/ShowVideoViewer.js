import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import noop from 'lodash/noop';
import GoogleAd from '../../components/common/google-ads/GoogleAd';
import VideoImageLoader from '../../components/common/telescope-image-loader/video-image-loader';
import CommunityMashup from '../../components/situation-room/CommunityMashup';
import { fetchShowContent } from '../../modules/community-content/get-show-content-actions';
import { fetchRecordedShow } from '../../modules/show-video-viewer/recorded-show-actions';
import { backgroundImageCover } from '../../styles/mixins/utilities';
import { previousShows } from '../../services/shows/previous-shows';
import { upcomingShows } from '../../services/shows/upcoming-shows';

import { white } from '../../styles/variables/colors';

const { bool, number, string, shape, func, arrayOf } = PropTypes;

function mapStateToProps({ videoViewerShow, communityShowContent }) {
  return {
    ...videoViewerShow,
    communityPosts: communityShowContent.resultBody.posts,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        fetchRecordedShow,
        fetchShowContent,
      },
      dispatch
    ),
  };
}

@connect(
  mapStateToProps,
  mapDispatchToProps
)
@withTranslation()
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
  };

  static defaultProps = {
    actions: {
      fetchRecordedShow: noop,
      fetchShowContent: noop,
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
  };

  constructor(props) {
    super(props);

    this.state = {
      upcomingShowsList: [],
      previousShowsList: [],
    };

    const {
      actions,
      params: { showId },
    } = props;

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
    }).then(res => {
      this.setState({
        previousShowsList: res.data.eventList,
      });
    });

    upcomingShows({
      page: 1,
      count: 9,
    }).then(res => {
      this.setState({
        upcomingShowsList: res.data.eventList,
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    const {
      actions,
      params: { showId },
    } = nextProps;
    if (showId === this.props.params.showId) {
      return;
    }
    actions.fetchRecordedShow({
      showId,
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
      recommends,
      t,
    } = this.props;

    const { upcomingShowsList, previousShowsList } = this.state;

    return (
      <div>
        <header className="header">
          <h1 className="header-title">{t('Shows.VideoViewer')}</h1>
        </header>
        <main className="main-container row">
          <div className="col-md-8 col-sm-6">
            <VideoImageLoader
              teleStreamCode={showStreamCode}
              teleStreamURL={showStreamURL}
              teleStreamThumbnailVideoWidth="800"
              teleStreamThumbnailVideoHeight="550"
              showVideoControls={1}
              showInfo={1}
            />
          </div>

          <div className="col-md-4 col-sm-6">
            <GoogleAd
              adURL="/5626790/Replay"
              adWidth={300}
              adHeight={600}
              targetDivID="div-gpt-ad-1495118239378-0"
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
            background-image: url(https://vega.slooh.com/assets/images/photos/enigma.png);
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
            margin: 50px 25px;
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
