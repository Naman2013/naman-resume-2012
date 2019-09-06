import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Spinner } from 'app/components/spinner/index';
import { Select } from 'app/components/common/select';
import { Datepicker } from 'app/modules/profile-photos/components/filter-dropdown/datepicker';
import './styles.scss';

const REFERENCE_TYPES = {
  slooh1000: 'slooh1000',
  catalog: 'catalog',
  other: 'other',
};

export class UploadPhoto extends Component {
  state = {
    isUploadModalOpen: false,
    referenceType: REFERENCE_TYPES.slooh1000,
    selectedCatalog: {},
    designation: '',
  };

  onTypeChange = e => {
    this.setState({ referenceType: e.target.value });
  };

  onFileUpload = e => {
    e.preventDefault();

    const { files } = e.target;
    const { setMyPicturesUpload, user } = this.props;
    const { cid, token, at } = user;
    const data = new FormData();
    data.append('cid', cid);
    data.append('token', token);
    data.append('at', at);
    data.append('attachment', files[0]);

    setMyPicturesUpload(data);
  };

  setCatalog = catalog => {
    const { uploadPhotoPageData } = this.props;
    const { CatalogList } = uploadPhotoPageData;
    const selectedCatalog = CatalogList.filter(
      item => item.catalog === catalog
    )[0];

    this.setState({ selectedCatalog });
  };

  render() {
    const {
      uploadPhotoPageData,
      imageData,
      isFetching,
      catalogListOpts,
    } = this.props;
    const {
      DisplayTitle,
      DisplaySlooh1000,
      DisplayCatalog,
      DisplayOther,
      DisplayObservationLogHeader,
      DisplayUploadBtn,
    } = uploadPhotoPageData;
    const {
      isUploadModalOpen,
      referenceType,
      selectedCatalog,
      designation,
    } = this.state;
    const { imageUrl } = imageData;

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
          <Spinner loading={isFetching} />
          <h2 className="h2-custom text-center">{DisplayTitle}</h2>

          <form className="upload-photo-form">
            <div className="upload-photo-form-left">
              <div className="upload-photo-form-input-file">
                <label htmlFor="photoHubUploadInput">
                  Upload photo
                  {imageUrl && <img src={imageUrl} />}
                </label>
                <input
                  type="file"
                  id="photoHubUploadInput"
                  onChange={this.onFileUpload}
                />
              </div>

              {/* <Datepicker
                className="upload-custom-date"
                value={activeDateFilter}
                onChange={dateFilter => onChange({ dateFilter })}
                placeholder="SET DATE"
                outputFormat="YYYY-MM-DD"
              /> */}
            </div>

            <div className="upload-photo-form-right">
              <div className="upload-photo-radio">
                <input
                  id="photoTypeSlooh1000"
                  type="radio"
                  name="photoType"
                  value={REFERENCE_TYPES.slooh1000}
                  checked={referenceType === REFERENCE_TYPES.slooh1000}
                  onChange={this.onTypeChange}
                />
                <label htmlFor="photoTypeSlooh1000">{DisplaySlooh1000}</label>
              </div>

              <div className="upload-photo-radio reference-type">
                <input
                  id="photoTypeCatalog"
                  type="radio"
                  name="photoType"
                  value={REFERENCE_TYPES.catalog}
                  checked={referenceType === REFERENCE_TYPES.catalog}
                  onChange={this.onTypeChange}
                />
                <label htmlFor="photoTypeCatalog">{DisplayCatalog}</label>

                <div className="reference-type-content">
                  <Select
                    handleChange={this.setCatalog}
                    options={catalogListOpts}
                    value={selectedCatalog.catalog}
                    isDisabled={referenceType !== REFERENCE_TYPES.catalog}
                  />

                  <textarea
                    className="textarea designation"
                    placeholder="Type designation here"
                    value={designation}
                    onChange={e =>
                      this.setState({ designation: e.target.value })
                    }
                    disabled={referenceType !== REFERENCE_TYPES.catalog}
                  />

                  <div className="designation-format">
                    Format: {selectedCatalog.catFormat}
                  </div>

                  <div className="designation-example">
                    Example: {selectedCatalog.catExample}
                  </div>
                </div>
              </div>

              <div className="upload-photo-radio">
                <input
                  id="photoTypeOther"
                  type="radio"
                  name="photoType"
                  value={REFERENCE_TYPES.other}
                  checked={referenceType === REFERENCE_TYPES.other}
                  onChange={this.onTypeChange}
                />
                <label htmlFor="photoTypeOther">{DisplayOther}</label>
              </div>
            </div>

            <div className="upload-photo-observation-log">
              <h4 className="h4-custom">{DisplayObservationLogHeader}</h4>
              <input
                placeholder="Title your Observation"
                onChange={e => setTitle(e.target.value)}
              />
              <textarea
                placeholder="Write your Observation"
                onChange={e => setText(e.target.value)}
              />
            </div>

            <div className="upload-photo-upload-button">
              <Button onClick={() => {}}>{DisplayUploadBtn}</Button>
            </div>
          </form>
        </Modal>
      </div>
    );
  }
}
