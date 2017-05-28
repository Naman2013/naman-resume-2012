import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classnames from 'classnames';
import style from './announcement-banner.scss';

import {
  fetchAnnouncements,
  hideBanner,
} from '../../../modules/Announcement-Banner';


function mapStateToProps(state) {
  return {
    announcementMessages: state.announcementBanner.messages,
    announcementsLoading: state.announcementBanner.messageLoading,
    refreshIntervalSec: state.announcementBanner.refreshIntervalSec,
    showAnnouncementsBanner: state.announcementBanner.bannerDisplayed,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      fetchAnnouncements,
      hideBanner,
    }, dispatch),
  };
}

@connect(mapStateToProps, mapDispatchToProps)
class AnnouncementBanner extends Component {

  componentWillMount() {
    this.scaffoldAnnouncementUpdates(this.props.obsId);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.obsId === this.props.obsId) {
      return;
    }
    this.scaffoldAnnouncementUpdates(nextProps.obsId);
  }

  componentWillUnmount() {
    clearInterval(this.refreshInterval);
  }

  updateAnnouncements(obsId) {
    const { level, category } = this.props;

    this.props.actions.fetchAnnouncements(
      obsId,
      category,
      level,
    );
  }

  generateMessages() {
    const { announcementMessages } = this.props;
    if (announcementMessages) {
      return this.props.announcementMessages.map(announcement => (
        <p key={announcement.uniqueId} className={style.announcement}>
          {announcement.text}
        </p>
      ));
    }
    return null;
  }

  // TODO: refactor to use componentWillReceiveProps and destruct nextProps
  scaffoldAnnouncementUpdates(obsId) {
    this.updateAnnouncements(obsId);
    const { refreshIntervalSec } = this.props;

    const intervalInSeconds = refreshIntervalSec * 1000;

    clearInterval(this.refreshInterval);

    if (intervalInSeconds) {
      this.refreshInterval = setInterval(() => {
        this.updateAnnouncements();
      }, intervalInSeconds);
    }
  }

  render() {
    const displayBannerStyles = classnames({
      hide: !this.props.showAnnouncementsBanner,
      announcementBanner: true,
    });

    return (
      <div className={displayBannerStyles}>
        {this.generateMessages()}

        <button
          onClick={this.props.actions.hideBanner}
          className={style.button}>
            <span
              className="glyphicon glyphicon-remove"
              aria-hidden="true"></span>
        </button>
      </div>
    );
  }
}

AnnouncementBanner.defaultProps = {
  messages: [],
};

AnnouncementBanner.propTypes = {
  messages: PropTypes.array,
  obsId: PropTypes.string,
};

export default AnnouncementBanner;
