/***********************************
 * V4 MissionCard
 *  Mission tile on the /profile/private/photos/missions
 ***********************************/
// @flow
import React, { PureComponent, Fragment } from 'react';
import cn from 'classnames';
import { withTranslation } from 'react-i18next';
import Modal from 'react-modal';
import { browserHistory } from 'react-router';
import Button from 'app/components/common/style/buttons/Button';
import { downloadFile } from 'app/utils/downloadFile';
import { customModalStylesFitDevice } from 'app/styles/mixins/utilities';
import AsideToggleableMenu from '../AsideToggleableMenu';

import style from './MissionCard.style';
import './fitsData.scss';

type TMissionCard = {
  isDesktop: boolean,
  isMobile: boolean,
  currentItem: Record<string, any>;
};

@withTranslation()
class MissionCard extends PureComponent<TMissionCard> {
  state = {
    menuIsVisible: false,
    width: null,
    showPrompt: false,
    modalComponent: null,
    modalStyles: customModalStylesFitDevice,
  };

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
    const {
      currentItem: { scheduledMissionId },
    } = this.props;
    browserHistory.push(`/missions-details/${scheduledMissionId}`);
  };

  onDownloadFitsData = () => {
    const { currentItem, getFitsData } = this.props;
    if (
      currentItem.scheduledMissionId !==
      this.props.fitsData.data.scheduledMissionId
    ) {
      getFitsData(currentItem.scheduledMissionId).then(() => {
        const { fitsData } = this.props;
        this.setModal(fitsData);
      });
    }
    this.showModal();
  };

  onDownloadFile = (e, url, name) => {
    e.preventDefault();
    downloadFile(url, name);
  };

  setModal = modalComponent => {
    this.setState(state => ({
      modalComponent: modalComponent || state.modalComponent,
    }));
  };

  showModal = () => {
    this.setState(() => ({
      showPrompt: true,
    }));
  };

  closeModal = () => {
    this.setState(() => ({
      showPrompt: false,
    }));
  };

  renderModalComponent = data => {
    const {
      popupTitleText,
      missionIconURL,
      missionTitle,
      missionObsName,
      missionPierName,
      missionDateTime,
      ownerMembershipType,
      takenByText,
      ownerAvatarURL,
      ownerFirstName,
      ownerMemberSince,
      groupList,
      buttonText,
      ownerDisplayName,
    } = data;
    const { closeModal, onDownloadFile } = this;
    return (
      <div className="fitsData">
        <h2>{popupTitleText}</h2>
        <h3>
          <img src={missionIconURL} alt="" />
          {missionTitle}
        </h3>
        <h3>{missionObsName}</h3>
        <h3>{missionPierName}</h3>
        <h3>{missionDateTime}</h3>
        <h5>
          <p>{takenByText}</p>
          <img src={ownerAvatarURL} alt="" />
          <p className="flex-column text-left">
            <p>{ownerDisplayName}</p>
          </p>
        </h5>

        {groupList &&
          groupList.length &&
          groupList.map(({ groupIndex, groupName, groupImageList }) => {
            return (
              <ul key={`${groupIndex}-${groupName}`}>
                <h5>{groupName}</h5>
                {groupImageList.map(({ imageId, imageTitle, imageURL }) => {
                  return (
                    <li key={`${imageId}-${imageTitle}`}>
                      <a
                        href={imageURL}
                        download
                        className="cursor-pointer link"
                        onClick={e => onDownloadFile(e, imageURL, imageTitle)}
                      >
                        {imageTitle}
                      </a>
                    </li>
                  );
                })}
              </ul>
            );
          })}

        <p className="top-bot-20">Click links above to download</p>
        <Button onClickEvent={closeModal} mod="auto">
          {buttonText}
        </Button>
      </div>
    );
  };

  render() {
    const {
      index,
      isDesktop,
      isMobile,
      fitsData,
      currentItem: mission,
      t,
    } = this.props;
    const inCenter = index % 3 === 1;
    const { menuIsVisible, width } = this.state;
    const {
      imageTitle,
      displayDate,
      missionImageCount,
      telescopeName,
      imageURL,
      fitsIsAvailable,
    } = mission;
    if (!mission) return null;
    const { closeModal, renderModalComponent } = this;
    const { showPrompt, modalStyles, modalComponent } = this.state;

    return (
      <div className={cn(['root', { inCenter: inCenter && isDesktop }])}>
        <div
          className={cn('missionCard', { hovered: menuIsVisible })}
          ref={node => {
            this.blockWidth = node;
          }}
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
          <div className="card-top">
            <div className="mission-title" title={imageTitle}>
              {imageTitle}
            </div>
            <div className="mission-details">
              <div className="mission-details-tile mission-details-date">
                {displayDate}
              </div>
              <div className="mission-details-tile mission-details-images">
                {missionImageCount} {t('Photos.Images')}
              </div>
            </div>
            <div
              className={cn('mission-telescope', { 'display-none': isMobile })}
            >
              {telescopeName}
            </div>

            {fitsIsAvailable && (
              <Fragment>
                <div className="onhover-field show-onhover flex-row justify-content-between">
                  <span>Contains fits data</span>
                  <Button
                    mod="plain"
                    onClickEvent={this.onDownloadFitsData}
                    theme={{ borderColor: '#fff', color: '#fff' }}
                  >
                    <i className="icon white icon-download" />
                  </Button>
                </div>

                <Modal
                  ariaHideApp={false}
                  isOpen={showPrompt}
                  style={modalStyles}
                  contentLabel="Fits image download"
                  onRequestClose={closeModal}
                  shouldCloseOnOverlayClick
                >
                  {fitsData && fitsData.isFetching && !modalComponent && (
                    <div className="text-center">Loading...</div>
                  )}
                  {modalComponent &&
                    modalComponent.isLoaded &&
                    renderModalComponent(modalComponent.data)}
                </Modal>
              </Fragment>
            )}

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
          </div>
        </div>
        <style jsx>{style}</style>
      </div>
    );
  }
}

export default MissionCard;
