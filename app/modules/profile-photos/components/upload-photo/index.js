import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import cx from 'classnames';
import { Tooltip } from 'react-tippy';
import Datetime from 'react-datetime';
import moment from 'moment';
import { Spinner } from 'app/components/spinner/index';
import { Select } from 'app/components/common/select';
import { Datepicker } from 'app/modules/profile-photos/components/filter-dropdown/datepicker';
import FindObject from 'app/modules/browse-find-data/containers/find-object';
import './styles.scss';

const REFERENCE_TYPES = {
  slooh1000: 'slooh1000',
  catalog: 'catalog',
  other: 'other',
};

const INITIAL_STATE = {
  referenceType: REFERENCE_TYPES.slooh1000,
  astroObjectId: null,
  findObjectResultVisible: true,
  findValue: '',
  selectedCatalog: {},
  designator: '',
  title: '',
  text: '',
};

const DATE_FORMAT = 'YYYY-MM-DD';
const TIME_FORMAT = 'HH:mm:ss';

export class UploadPhoto extends Component {
  state = {
    isUploadModalOpen: false,
    photoDateTime: moment(),
    ...INITIAL_STATE,
  };

  onTypeChange = e => {
    this.setState({
      referenceType: e.target.value,
      findObjectResultVisible: false,
      findValue: '',
    });
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

    setMyPicturesUpload(data).then(({ payload }) => {
      if (payload.foundPhotoDateTime) {
        this.setState({ photoDateTime: moment(payload.photoDateTime) });
      }
    });
  };

  getRequestData = () => {
    const {
      referenceType,
      selectedCatalog,
      designator,
      astroObjectId,
      photoDateTime,
    } = this.state;
    const { uploadPhotoData } = this.props;
    const { imageData } = uploadPhotoData;
    const { catalog } = selectedCatalog;
    const formatedDate = photoDateTime.format(`${DATE_FORMAT} ${TIME_FORMAT}`);

    switch (referenceType) {
      case REFERENCE_TYPES.slooh1000: {
        return {
          ...imageData,
          referenceType,
          astroObjectId,
          photoDateTime: formatedDate,
        };
      }
      case REFERENCE_TYPES.catalog: {
        return {
          ...imageData,
          referenceType,
          catalog,
          designator,
          photoDateTime: formatedDate,
        };
      }
      case REFERENCE_TYPES.other: {
        return {
          ...imageData,
          referenceType,
          photoDateTime: formatedDate,
        };
      }
      default: {
        return {};
      }
    }
  };

  setCatalog = catalog => {
    const { uploadPhotoPageData } = this.props;
    const { CatalogList } = uploadPhotoPageData;
    const selectedCatalog = CatalogList.filter(
      item => item.catalog === catalog
    )[0];

    this.setState({ selectedCatalog, designator: '' });
  };

  showUploadModal = () => {
    const { uploadToMyPicturesPage } = this.props;

    uploadToMyPicturesPage();
    this.setState({ isUploadModalOpen: true });
  };

  uploadToMyPictures = () => {
    const {
      uploadToMyPictures,
      uploadPhotoData,
      setObservationTags,
      onHide,
    } = this.props;
    const { imageData } = uploadPhotoData;
    const { title, text } = this.state;

    uploadToMyPictures({
      imageDataList: [{ ...imageData, ...this.getRequestData() }],
    }).then(({ payload }) => {
      if (title || text) {
        setObservationTags(
          payload?.ImageStatus[0]?.CustomerImageId,
          null,
          title,
          text
        ).then(() => this.uploadModalHide());
      } else {
        this.uploadModalHide();
      }
      onHide();
    });
  };

  uploadModalHide = () => {
    const { clearUploadedPhotoData } = this.props;
    this.setState({
      isUploadModalOpen: false,
      photoDateTime: moment(),
      ...INITIAL_STATE,
    });
    clearUploadedPhotoData();
  };

  render() {
    const {
      uploadPhotoPageData,
      uploadPhotoData,
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
      designator,
      astroObjectId,
      findObjectResultVisible,
      findValue,
      photoDateTime,
    } = this.state;
    const { imageData, explanationText } = uploadPhotoData;
    const { imageUrl } = imageData;

    return (
      <div className="photohub-upload-photo-container">
        <Button onClick={this.showUploadModal}>Upload</Button>

        <Modal
          show={isUploadModalOpen}
          onHide={this.uploadModalHide}
          aria-labelledby="contained-modal-title-vcenter"
          centered
          dialogClassName="upload-modal"
        >
          <Spinner loading={isFetching} />

          <div className="photohub-upload-modal-header d-flex justify-content-between">
            <span>{DisplayTitle}</span>
            <Tooltip title="Close">
              <span
                className="icon-close close-btn"
                onClick={this.uploadModalHide}
                role="presentation"
              />
            </Tooltip>
          </div>

          <form className="upload-photo-form">
	    <p className="upload-photo-instructions">Introducing Photo Upload, which enables Apprentice and Astronomer members to upload photos to their photo roll. This makes it possible for you to share your very best processed photos as Observations. We ask that you only upload and share astronomical images you capture personally, either via Slooh or using your own telescopes.</p>
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

                <p className="photo-explanation-text">{explanationText}</p>
              </div>

              <Datetime
                className="upload-custom-date"
                dateFormat={DATE_FORMAT}
                timeFormat={TIME_FORMAT}
                value={photoDateTime}
                onChange={dateTime =>
                  this.setState({ photoDateTime: moment(dateTime) })
                }
              />
            </div>

            <div className="upload-photo-form-right">
              <div className="upload-photo-radio reference-type">
                <input
                  id="photoTypeSlooh1000"
                  type="radio"
                  name="photoType"
                  value={REFERENCE_TYPES.slooh1000}
                  checked={referenceType === REFERENCE_TYPES.slooh1000}
                  onChange={this.onTypeChange}
                />
                <label htmlFor="photoTypeSlooh1000">{DisplaySlooh1000}</label>

                <div className="reference-type-content">
                  <FindObject
                    onSelect={astroObjectId =>
                      this.setState({
                        astroObjectId,
                      })
                    }
                    selectedObject={astroObjectId}
                    findObjectResultVisible={findObjectResultVisible}
                    findValue={findValue}
                    onFind={() =>
                      this.setState({
                        referenceType: REFERENCE_TYPES.slooh1000,
                        findObjectResultVisible: true,
                      })
                    }
                    onChange={findValue => this.setState({ findValue })}
                  />
                </div>
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

                  {referenceType === REFERENCE_TYPES.catalog && (
                    <>
                      <textarea
                        className="textarea designation"
                        placeholder="Type designation here"
                        value={designator}
                        onChange={e =>
                          this.setState({ designator: e.target.value })
                        }
                        disabled={referenceType !== REFERENCE_TYPES.catalog}
                      />

                      <div className="designation-format">
                        Format: {selectedCatalog.catFormat}
                      </div>

                      <div className="designation-example">
                        Example: {selectedCatalog.catExample}
                      </div>
                    </>
                  )}
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
                onChange={e => this.setState({ title: e.target.value })}
              />
              <textarea
                placeholder="Write your Observation"
                onChange={e => this.setState({ text: e.target.value })}
              />
            </div>

            <div className="upload-photo-upload-button">
              <Button onClick={this.uploadToMyPictures}>
                {DisplayUploadBtn}
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    );
  }
}
