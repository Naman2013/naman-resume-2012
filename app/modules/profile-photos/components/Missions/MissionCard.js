/***********************************
 * V4 MissionCard
 *  Mission tile on the /profile/private/photos/missions
 ***********************************/
// @flow
import React, { PureComponent } from 'react';
import cn from 'classnames';
import { browserHistory } from 'react-router';
import { FormattedMessage } from 'react-intl';
import Button from 'app/components/common/style/buttons/Button';
import { downloadFile } from 'app/utils/downloadFile';
import AsideToggleableMenu from '../AsideToggleableMenu';
import messages from './MissionCard.messages';
import style from './MissionCard.style';

type TMissionCard = {
  isDesktop: boolean,
  isMobile: boolean,
  currentItem: Object,
};

class MissionCard extends PureComponent<TMissionCard> {
  state = { menuIsVisible: false, width: null };

  optionsList = [
    { label: 'Add tags' },
    { label: 'Download fits data', action: 'download' },
    { label: 'Download all images', action: 'downloadAll' },
  ];

  blockWidth = null;

  componentDidMount() {
    this.setState({ width: this.blockWidth.clientWidth });
  }

  onToggleMenuVisibility = () => {
    this.setState({ menuIsVisible: !this.state.menuIsVisible });
  };

  onOpenMission = () => {
    const { scheduledMissionId } = this.props.currentItem;
    browserHistory.push(`/missions-details/${scheduledMissionId}`);
  };

  onDownloadFile = () => {
    const { currentItem: { imageURL } } = this.props;
    downloadFile(imageURL, 'my-photos-mission.png');
  };

  render() {
    const { index, isDesktop, isMobile, currentItem: mission } = this.props;
    const inCenter = index % 3 === 1;
    const { menuIsVisible, width } = this.state;
    const {
      imageTitle,
      displayDate,
      missionImageCount,
      telescopeName,
      imageURL,
    } = mission;
    if (!mission) return null;

    return (
      <div className={cn(['root', { inCenter: inCenter && isDesktop }])}>
        <div
          className={cn('missionCard', { hovered: menuIsVisible })}
          ref={node => { this.blockWidth = node; }}
        >
          <AsideToggleableMenu
            mod="narrow"
            blockWidth={width}
            visible={menuIsVisible}
            optionsList={this.optionsList}
            downloadFile={this.onDownloadFile}
            toggleMenuVisibility={this.onToggleMenuVisibility}
            {...this.props}
          />
          <div className="circle show-onhover" />
          <div className="card-top">
            <div className="mission-title" title={imageTitle}>
              {imageTitle}
            </div>
            <div className="mission-details">
              <div className="mission-details-tile mission-details-date">
                {displayDate}
              </div>
              <div className="mission-details-tile mission-details-images">
                {missionImageCount} <FormattedMessage {...messages.Images} />
              </div>
            </div>
            <div
              className={cn('mission-telescope', { 'display-none': isMobile })}
            >
              {telescopeName}
            </div>

            <div className="onhover-field show-onhover">ULTRA-WIDE-FIELD</div>
            <div className="onhover-field show-onhover flex-row justify-content-between">
              <span>Contains fits data</span>
              <Button
                mod="plain"
                onClickEvent={this.onDownloadFile}
                theme={{ borderColor: '#fff', color: '#fff' }}
              >
                <i className="icon icon-download" />
              </Button>
            </div>

            <div className="mission-image-wrapper">
              <div className="mission-image-border">
                <img className="mission-image" src={imageURL} alt="Mission" />
              </div>
            </div>
          </div>
          <div className="show-onhover card-bottom">
            <Button
              onClickEvent={this.onOpenMission}
              theme={{ borderColor: '#fff', color: '#fff' }}
              text="Open mission"
            />
            <Button
              mod="circular"
              onClickEvent={this.onToggleMenuVisibility}
              theme={{ borderColor: '#fff', color: '#fff', marginLeft: '10px' }}
            >
              <i className="icon icon-ellipsis-h" />
            </Button>
          </div>
        </div>
        <style jsx>{style}</style>
      </div>
    );
  }
}

export default MissionCard;
