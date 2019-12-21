import React, { PureComponent } from 'react';
import { ModalImg } from 'app/modules/telescope/components/modal-img';
import { ImagePortalViewer } from 'app/modules/telescope/components/old/common/image-portal-viewer';
import { IDomeCam } from 'app/modules/telescope/types';

type TDomeCamProps = {
  obsId: string;
  domeCamWidgetId: string;
  getDomeCam: Function;
  domeCamData: IDomeCam;
};

type TDomeCamState = {
  isModalOpen: boolean;
};

export class DomeCamWidget extends PureComponent<TDomeCamProps, TDomeCamState> {
  state = {
    isModalOpen: false,
  };

  componentDidMount(): void {
    this.getDomeCam();
  }

  getDomeCam = (): void => {
    const { getDomeCam, obsId, domeCamWidgetId } = this.props;
    if (domeCamWidgetId && obsId) {
      getDomeCam({
        obsId,
        widgetUniqueId: domeCamWidgetId,
      });
    }
  };

  openModal = () => this.setState({ isModalOpen: true });

  closeModal = () => this.setState({ isModalOpen: false });

  render() {
    const { domeCamData } = this.props;
    const { domeCamURL } = domeCamData;
    const { isModalOpen } = this.state;

    return (
      <div className="dome-cam-widget">
        <ImagePortalViewer imageURL={domeCamURL} onClick={this.openModal} />

        <ModalImg
          isOpen={isModalOpen}
          imageURL={domeCamURL}
          onHide={this.closeModal}
        />
      </div>
    );
  }
}
