import React, { PureComponent } from 'react';
import { ModalImg } from 'app/modules/telescope/components/modal-img';
import { ImagePortalViewer } from 'app/modules/telescope/components/old/common/image-portal-viewer';
import { IAllSkyCam } from 'app/modules/telescope/types';

type TDomeCamProps = {
  obsId: string;
  allSkyWidgetID: string;
  getAllSkyCam: Function;
  allSkyCamData: IAllSkyCam;
};

type TDomeCamState = {
  isModalOpen: boolean;
};

export class AllSkyCamWidget extends PureComponent<
  TDomeCamProps,
  TDomeCamState
> {
  state = {
    isModalOpen: false,
  };

  componentDidMount(): void {
    this.getAllSkyCam();
  }

  getAllSkyCam = (): void => {
    const { getAllSkyCam, obsId, allSkyWidgetID } = this.props;
    if (allSkyWidgetID && obsId) {
      getAllSkyCam({
        obsId,
        widgetUniqueId: allSkyWidgetID,
      });
    }
  };

  openModal = () => this.setState({ isModalOpen: true });

  closeModal = () => this.setState({ isModalOpen: false });

  render() {
    const { allSkyCamData } = this.props;
    const { allSkyCamURL } = allSkyCamData;
    const { isModalOpen } = this.state;

    return (
      <div className="dome-cam-widget">
        <ImagePortalViewer imageURL={allSkyCamURL} onClick={this.openModal} />

        <ModalImg
          isOpen={isModalOpen}
          imageURL={allSkyCamURL}
          onHide={this.closeModal}
        />
      </div>
    );
  }
}
