import DomeCamTimelapseWidget from 'app/components/telescope-details/domecam-timelapse-widget';
import { ModalImg } from 'app/modules/telescope/components/modal-img';
import React, { Component } from 'react';
import { Button, Collapse } from 'react-bootstrap';
import { ImagePortalViewer, ModuleContainer } from './index';

export class PicoDelTeidesWidget extends Component {
  state = {
    isModalOpen: false,
    isTimelapseExpanded: false,
  };

  openModal = () => this.setState({ isModalOpen: true });

  closeModal = () => this.setState({ isModalOpen: false });

  renderTimelapseCollapsible = () => {
    const { activeTelescope, domeCam } = this.props;
    const {
      domeCamTimelapseURL,
      offlineImageURL,
      onlineStatus,
      refreshIntervalSec,
      fetchingDomeCamTimelapseWidgetResult,
    } = domeCam;
    const { observatoryData } = activeTelescope;
    const { obsId, DomecamTimelapseWidgetId } =
      observatoryData || activeTelescope;
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
              domeCamTimelapseURL={domeCamTimelapseURL}
              DomecamTimelapseWidgetId={DomecamTimelapseWidgetId}
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
    const {
      activeTelescope,
      obsId,
      FacilityWebcamWidgetId,
      facilityWebcamUrl,
      title,
    } = this.props;

    const { observatoryData } = activeTelescope;
    const { DomecamTimelapseWidgetId } = observatoryData || activeTelescope;
    const { isModalOpen } = this.state;

    return (
      <ModuleContainer title={title}>
        <ImagePortalViewer
          imageURL={facilityWebcamUrl}
          onClick={this.openModal}
        />
        {this.renderTimelapseCollapsible()}
        <ModalImg
          isOpen={isModalOpen}
          imageURL={facilityWebcamUrl}
          onHide={this.closeModal}
        />
      </ModuleContainer>
    );
  }
}
