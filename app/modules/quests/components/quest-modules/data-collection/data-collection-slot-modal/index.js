import { Modal } from 'app/components/modal';
import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router';
import { Spinner } from 'app/components/spinner/index';
import { DataCollectionImageCard } from '../data-collection-image-card';
import './styles.scss';

export class DataCollectionSlotModal extends Component {
  componentDidMount() {
    const { questDataCollectionSlotImages } = this.props;
    const { firstImageNumber } = questDataCollectionSlotImages;
    this.getDataCollectionSlotImages(firstImageNumber);
  }

  getDataCollectionSlotImages = firstImageNumber => {
    const {
      moduleId,
      questId,
      getDataCollectionSlotImages,
      selectedSlot,
      questDataCollectionSlotImages,
    } = this.props;
    const { slotId } = selectedSlot;
    const { maxImageCount, pagingMode } = questDataCollectionSlotImages;

    getDataCollectionSlotImages({
      moduleId,
      questId,
      slotId,
      firstImageNumber,
      maxImageCount,
      pagingMode,
    });
  };

  showMore = () => {
    const { questDataCollectionSlotImages } = this.props;
    const {
      showMoreImagesIncrement,
      firstImageNumber,
    } = questDataCollectionSlotImages;
    const newFirstImageNumber = firstImageNumber + showMoreImagesIncrement;

    this.getDataCollectionSlotImages(newFirstImageNumber);
    this.setState({ firstImageNumber: newFirstImageNumber });
  };

  render() {
    const {
      onHide,
      show,
      questDataCollectionSlotImages,
      selectedSlot,
      setDataCollectionSlotImages,
      loading,
    } = this.props;
    const {
      imageList,
      imageCount,
      showShowMoreButton,
      showMoreButtonCaption,
      emptySetFlag,
      emptySetDisplay,
    } = questDataCollectionSlotImages;
    const { slotSequence } = selectedSlot;

    return (
      <Modal show={show} onHide={onHide} goBackText="GO BACK">
        <div className="container image-selection-modal">
          <Spinner loading={loading} />

          <h1 className="modal-h">
            Select your Image for slot {slotSequence}.
          </h1>

          {emptySetFlag && !loading && <h3 className="modal-h3">{emptySetDisplay}</h3>}

          {imageCount > 0 && (
            <Row>
              {imageList.map(item => (
                <Col md={6} xl={4}>
                  <DataCollectionImageCard
                    imageData={item}
                    onClick={() => setDataCollectionSlotImages(item)}
                  />
                </Col>
              ))}
            </Row>
          )}

          {showShowMoreButton && (
            <Button className="show-more modal-btn" onClick={this.showMore}>
              {showMoreButtonCaption}
            </Button>
          )}
        </div>
      </Modal>
    );
  }
}
