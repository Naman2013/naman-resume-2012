import { Modal } from 'app/components/modal';
import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router';
import { WriteObservationImageCard } from 'app/modules/object-details/components/write-observation-image-card';

export class DataCollectionSlotModal extends Component {
  componentDidMount() {
    // const { getMyPictures, objectDetails } = this.props;
    // const { objectId } = objectDetails;
    // getMyPictures({
    //   viewType: 'photoRoll',
    //   astroObjectIds: [objectId],
    // });
  }

  render() {
    const { onHide, show } = this.props;

    return (
      <Modal show={show} onHide={onHide} goBackText="GO BACK">
        Modal
        {/* <div className="write-observation-step1">
          {!isFetching && myPictures?.imageList?.length > 0 && (
            <>
              <h1 className="modal-h">Select an Image for your Observation.</h1>
              <Row>
                <Col md={6} xl={4}>
                  <WriteObservationImageCard
                    imageData={myPictures?.imageList[0]}
                    objectDetails={objectDetails}
                    onClick={() => selectImage(myPictures?.imageList[0])}
                    defaultCard
                  />
                </Col>
                {myPictures?.imageList.map(item => (
                  <Col md={6} xl={4}>
                    <WriteObservationImageCard
                      imageData={item}
                      objectDetails={objectDetails}
                      onClick={() => selectImage(item)}
                    />
                  </Col>
                ))}
              </Row>
            </>
          )}
          {!isFetching && myPictures?.imageList?.length === 0 && (
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
          )}
        </div>*/}
      </Modal>
    );
  }
}
