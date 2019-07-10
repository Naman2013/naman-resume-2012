import { Modal } from 'app/components/modal';
import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router';
import { DataCollectionImageCard } from '../data-collection-image-card';

export class DataCollectionSlotModal extends Component {
  componentDidMount() {
    // const { getDataCollectionImagesSuccess, objectDetails } = this.props;
    // const { objectId } = objectDetails;
    // getDataCollectionImagesSuccess({
    //   viewType: 'photoRoll',
    //   astroObjectIds: [objectId],
    // });
  }

  render() {
    const {
      onHide,
      show,
      questDataCollectionSlotImages,
      selectedSlot,
      setDataCollectionSlotImages,
    } = this.props;
    const { imageList, imageCount } = questDataCollectionSlotImages;
    const { slotSequence } = selectedSlot;

    return (
      <Modal show={show} onHide={onHide} goBackText="GO BACK">
        <div className="container image-selection-modal">
          {imageCount > 0 && (
            <>
              <h1 className="modal-h">
                Select your Image for slot {slotSequence}.
              </h1>
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
            </>
          )}
          {/* {!isFetching && myPictures?.imageList?.length === 0 && (
            <>
              <h1 className="modal-h">{myPictures?.missionLink?.displayTitle}</h1>
              <p className="modal-p my-5">
                {myPictures?.missionLink?.displaySubTitle}
              </p>
              <Link to={`/${myPictures?.missionLink?.buttonLink}`}>
                <Button className="modal-btn">
                  {myPictures?.missionLink?.confirmButtonText}
                </Button>
              </Link>
            </>
          )} */}
        </div>
      </Modal>
    );
  }
}
