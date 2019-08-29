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
      slotContentsHeader,
      slotContentsDesc,
      showSlotContentsDesc,
      showEmptySetContentsDesc,
      emptySetContentsDesc,
    } = questDataCollectionSlotImages;
    const { slotSequence } = selectedSlot;

    return (
      <Modal show={show} onHide={onHide} goBackText="GO BACK">
        <div className="image-selection-modal">
          <Spinner loading={loading} />

          {!emptySetFlag && !loading && (
            <>
              <h1 className="modal-h">{slotContentsHeader}</h1>

              {showSlotContentsDesc && (
                <p
                  className="modal-p"
                  dangerouslySetInnerHTML={{ __html: slotContentsDesc }}
                />
              )}
            </>
          )}

          {emptySetFlag && !loading && (
            <>
              <h1 className="modal-h">{slotContentsHeader}</h1>
              <p
                className="modal-p"
                dangerouslySetInnerHTML={{ __html: emptySetDisplay }}
              />

              {showEmptySetContentsDesc && (
                <div className="empty-set-content">
                  <p
                    className="modal-p"
                    dangerouslySetInnerHTML={{
                      __html: emptySetContentsDesc?.noImagesFoundPrompt,
                    }}
                  />

                  {emptySetContentsDesc?.slotObjectMissionLinks.map(link => (
                    <div
                      className="object-mission-link"
                      key={`object-mission-link-${link.linkIndex}`}
                    >
                      <Link to={link.linkURL} className="modal-p">
                        {link.linkLabel}
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </>
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
