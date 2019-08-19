import React, { Component } from 'react';
import { Button, Collapse } from 'react-bootstrap';
import DomeCamTimelapseWidget from 'app/components/telescope-details/domecam-timelapse-widget';
import { ModalImg } from 'app/modules/telescope/components/modal-img';
import { ImagePortalViewer, ModuleContainer } from './index';

export class DomCameraWidget extends Component {
  state = {
    isModalOpen: false,
    isTimelapseExpanded: false,
  };

  openModal = () => this.setState({ isModalOpen: true });

  closeModal = () => this.setState({ isModalOpen: false });

  renderTimelapseCollapsible = () => {
    const {
      onlineStatus,
      offlineImageURL,
      refreshIntervalSec,
      facilityWebcamTimelapseURL,
      fetchingDomeCamTimelapseWidgetResult,
      widgetId,
      obsId,
    } = this.props;
    const { isTimelapseExpanded } = this.state;
    return (
      <div className="text-center">
        <Button
          className="open-timelapse"
          onClick={() =>
            this.setState({ isTimelapseExpanded: !isTimelapseExpanded })
          }
          aria-controls="open timelapse"
          aria-expanded={isTimelapseExpanded}
        >
          {isTimelapseExpanded ? 'Close' : 'Open'} Timelapse
        </Button>

        <Collapse in={isTimelapseExpanded} mountOnEnter unmountOnExit>
          <div id="example-collapse-text">
            <DomeCamTimelapseWidget
              obsId={obsId}
              onlineStatus={onlineStatus}
              offlineImageURL={offlineImageURL}
              refreshIntervalSec={refreshIntervalSec}
              domeCamTimelapseURL={facilityWebcamTimelapseURL}
              DomecamTimelapseWidgetId={widgetId}
              fetchingDomeCamTimelapseWidgetResult={
                fetchingDomeCamTimelapseWidgetResult
              }
            />
          </div>
        </Collapse>
      </div>
    );
  };

  render() {
    const { domeCamURL, activeTelescope } = this.props;
    if (!activeTelescope) return null;

    const { observatoryData } = activeTelescope;
    const { DomecamTimelapseWidgetId } = observatoryData || activeTelescope;

    const { isModalOpen } = this.state;

    return (
      <ModuleContainer title="Dome view">
        <ImagePortalViewer imageURL={domeCamURL} onClick={this.openModal} />

        {DomecamTimelapseWidgetId && this.renderTimelapseCollapsible()}

        <ModalImg
          isOpen={isModalOpen}
          imageURL={domeCamURL}
          onHide={this.closeModal}
        />
      </ModuleContainer>
    );
  }
}
