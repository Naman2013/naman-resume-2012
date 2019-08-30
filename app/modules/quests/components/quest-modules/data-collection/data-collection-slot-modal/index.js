import { Modal } from 'app/components/modal';
import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { browserHistory, Link } from 'react-router';
import Pagination from 'app/components/common/pagination/v4-pagination/pagination';
import { Spinner } from 'app/components/spinner/index';
import { DataCollectionImageCard } from '../data-collection-image-card';
import './styles.scss';

export class DataCollectionSlotModal extends Component {
  state = {
    activePage: 1,
  };

  componentDidMount() {
    this.getDataCollectionSlotImages(1);
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
    const { activePage } = this.state;
    const {
      showMoreImagesIncrement,
      firstImageNumber,
    } = questDataCollectionSlotImages;
    const newFirstImageNumber = firstImageNumber + showMoreImagesIncrement;

    this.getDataCollectionSlotImages(newFirstImageNumber);
    this.setState({
      activePage: activePage + 1,
    });
  };

  handlePageChange = ({ activePage }) => {
    const {
      questDataCollectionSlotImages: { maxImageCount },
    } = this.props;
    const newFirstImageNumber = (activePage - 1) * maxImageCount + 1;
    this.setState({
      activePage,
    });
    this.getDataCollectionSlotImages(newFirstImageNumber);
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
    const { activePage } = this.state;
    const {
      imageList,
      imageCount,
      showShowMoreButton,
      showMoreButtonCaption,
      emptySetFlag,
      emptySetDisplay,
      totalImageCount,
      maxImageCount,
    } = questDataCollectionSlotImages;
    const { slotSequence } = selectedSlot;

    return (
      <Modal show={show} onHide={onHide} goBackText="GO BACK">
        <div className="image-selection-modal">
          <Spinner loading={loading} />

          <h1 className="modal-h">
            Select your Image for slot {slotSequence}.
          </h1>

          {emptySetFlag && !loading && (
            <h3 className="modal-h3">{emptySetDisplay}</h3>
          )}

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

          <div className="mobile-container">
            {showShowMoreButton && (
              <Button className="show-more modal-btn" onClick={this.showMore}>
                {showMoreButtonCaption}
              </Button>
            )}
          </div>

          {!loading && !!totalImageCount && (
            <div className="desktop-container">
              <Pagination
                pagesPerPage={4}
                activePage={activePage}
                onPageChange={this.handlePageChange}
                totalPageCount={Math.ceil(totalImageCount / maxImageCount)}
              />
            </div>
          )}
        </div>
      </Modal>
    );
  }
}
