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
    const { activeTelescope } = this.props;
    const { observatoryData } = activeTelescope;
    const { obsId, DomecamTimelapseWidgetId } = observatoryData;
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
          Open Timelapse
        </Button>

        <Collapse in={isTimelapseExpanded} mountOnEnter unmountOnExit>
          <div id="example-collapse-text">
            <DomeCamTimelapseWidget
              obsId={obsId}
              DomecamTimelapseWidgetId={DomecamTimelapseWidgetId}
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
    } = this.props;

    const { observatoryData } = activeTelescope;
    const { DomecamTimelapseWidgetId } = observatoryData;
    console.log(facilityWebcamUrl);
    const { isModalOpen } = this.state;

    return (
      <ModuleContainer title="Pico del teide cam">
        <ImagePortalViewer
          imageURL={facilityWebcamUrl}
          onClick={this.openModal}
        />
        {/*{DomecamTimelapseWidgetId ? this.renderTimelapseCollapsible() : null}*/}
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
