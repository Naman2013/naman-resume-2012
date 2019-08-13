import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router';
import { WriteObservationImageCard } from '../write-observation-image-card';
import './styles.scss';

export class WriteObservationStep1 extends Component {
  componentDidMount() {
    const { getMyPictures, objectDetails } = this.props;
    const { objectId } = objectDetails;
    getMyPictures({
      viewType: 'photoRoll',
      astroObjectIds: [objectId],
    });
  }

  render() {
    const {
      myPictures,
      objectDetails,
      selectImage,
      imageDetails,
      isFetching,
    } = this.props;
    const { customerImageId, scheduledMissionId } = imageDetails;

    return (
      <div className="write-observation-step1">
        {!isFetching && myPictures?.imageList?.length > 0 && (
          <>
            <h1 className="modal-h">Select an Image for your Observation.</h1>
            <Row>
              {myPictures?.imageList.map(
                item =>
                  item.canShareFlag && (
                    <Col md={6} xl={4}>
                      <WriteObservationImageCard
                        imageData={item}
                        objectDetails={objectDetails}
                        onClick={() => selectImage(item)}
                      />
                    </Col>
                  )
              )}
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
      </div>
    );
  }
}
