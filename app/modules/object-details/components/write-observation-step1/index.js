import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
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
    const { myPictures, objectDetails, selectImage, imageDetails } = this.props;
    const { imageList } = myPictures;
    const { customerImageId, scheduledMissionId } = imageDetails;

    return (
      <div className="write-observation-step1">
        <h1 className="modal-h">Select an Image for your Observation.</h1>
        <Row>
          <Col md={6} xl={4}>
            <WriteObservationImageCard
              imageData={imageList[0] || {}}
              objectDetails={objectDetails}
              onClick={() => selectImage(imageList[0] || {})}
              defaultCard
            />
          </Col>
          {imageList.map(item => (
            <Col md={6} xl={4}>
              <WriteObservationImageCard
                imageData={item}
                objectDetails={objectDetails}
                onClick={() => selectImage(item)}
              />
            </Col>
          ))}
        </Row>
      </div>
    );
  }
}
