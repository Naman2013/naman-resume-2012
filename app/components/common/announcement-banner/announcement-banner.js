import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import classnames from 'classnames';
import style from './announcement-banner.scss';

import {
  fetchAnnouncements,
  hideBanner,
} from '../../../modules/Announcement-Banner';

import exampleUser from '../../../example-api-data/example-user';

const {string, array} = PropTypes;

function mapStateToProps(state, ownProps) {
  return {
    user: exampleUser, // TODO: state.user
    announcementMessages: state.announcementBanner.messages,
    announcementsLoading: state.announcementBanner.messageLoading,
    showAnnouncementsBanner: state.announcementBanner.bannerDisplayed,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      fetchAnnouncements,
      hideBanner,
    }, dispatch)
  };
}

@connect(mapStateToProps, mapDispatchToProps)
class AnnouncementBanner extends Component {

  generateMessages() {
    return this.props.announcementMessages.map(announcement => (
      <p key={announcement.uniqueId} className={style.announcement}>
        {announcement.text}
      </p>
    ));
  }

  componentWillMount() {
    this.props.actions.fetchAnnouncements(
      this.props.user
    );
  }

  render() {
    const displayBannerStyles = classnames({
      hide: !this.props.showAnnouncementsBanner,
      announcementBanner: true,
    });

    return(
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
  messages: array,
};

export default AnnouncementBanner;
