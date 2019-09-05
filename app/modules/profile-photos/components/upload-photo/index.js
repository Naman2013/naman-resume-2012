import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import './index.scss';

export class UploadPhoto extends Component {
  state = {
    isUploadModalOpen: false,
  };

  render() {
    const { uploadPhotoPageData } = this.props;
    const {
      DisplayTitle,
      DisplaySlooh1000,
      DisplayCatalog,
      DisplayOther,
    } = uploadPhotoPageData;
    const { isUploadModalOpen } = this.state;

    return (
      <div className="photohub-upload-photo-container">
        <Button onClick={() => this.setState({ isUploadModalOpen: true })}>
          Upload
        </Button>
        <Modal
          show={isUploadModalOpen}
          onHide={() => this.setState({ isUploadModalOpen: false })}
          aria-labelledby="contained-modal-title-vcenter"
          centered
          dialogClassName="upload-modal"
        >
          <h2 className="h2-custom text-center">{DisplayTitle}</h2>

          <form className="upload-photo-form">
            <div className="upload-photo-form-left">
              <div className="upload-photo-form-input-file">
                <label htmlFor="photoHubUploadInput">Upload photo</label>
                <input type="file" id="photoHubUploadInput" />
              </div>
            </div>
            <div className="upload-photo-form-right">
              <div className="upload-photo-radio">
                <input
                  id="photoTypeSlooh1000"
                  type="radio"
                  name="photoType"
                  value="slooh1000"
                />
                <label htmlFor="photoTypeSlooh1000">{DisplaySlooh1000}</label>
              </div>
              <div className="upload-photo-radio">
                <input
                  id="photoTypeCatalog"
                  type="radio"
                  name="photoType"
                  value="catalog"
                />
                <label htmlFor="photoTypeCatalog">{DisplayCatalog}</label>
              </div>
              <div className="upload-photo-radio">
                <input
                  id="photoTypeOther"
                  type="radio"
                  name="photoType"
                  value="other"
                />
                <label htmlFor="photoTypeOther">{DisplayOther}</label>
              </div>
            </div>
          </form>
        </Modal>
      </div>
    );
  }
}
