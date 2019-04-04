// @flow
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Btn from 'app/atoms/Btn';
import noop from 'lodash/fp/noop';

type TMissionDetailsHeader = {
  image: Object,
  missionTitle: string,
  missionIconURL: string,
  missionDateCreated: string,
  imageCount: number,
};

const MissionDetailsHeader = (props: TMissionDetailsHeader) => {
  const {
    missionTitle,
    missionIconURL,
    missionDateCreated,
    imageCount,
  } = props;
  const getTelescopeName = () => {
    return props.image && props.image.telescopeName;
  };
  const getInstrumentName = () => {
    return props.image && props.image.instrumentName;
  };
  return (
    <header className="header-wrapper shadow i-box-white">
      <Row>
        <Col md={12}>
          <h1 className="h-1 h-1-low">
            <img src={missionIconURL} alt={missionTitle} />{' '}
            <span>{missionTitle}</span>
          </h1>
        </Col>
      </Row>
      <hr className="hr" />
      <Row noGutters className="mission-details-box">
        <Col md={2} sm={3}>
          <h5 className="h-5 h-5-normal">{missionDateCreated}</h5>
        </Col>
        <Col md={4} sm={4}>
          <h5 className="h-5 h-5-normal mission-details-ceil">
            <span>{getTelescopeName()}</span>
            <span>{getInstrumentName()}</span>
          </h5>
        </Col>
        <Col md={3} sm={3}>
          <h5 className="h-5 h-5-normal mission-details-ceil">
            {imageCount} photos
          </h5>
        </Col>
        <Col md={3} sm={2}>
          <div className="btn-group justify-content-end">
            <Btn onClick={noop} mod="circle">
              <i className="fa fa-tag" />
            </Btn>
            <Btn onClick={noop} mod="circle">
              <i className="icon icon-download nightfall" />
            </Btn>
          </div>
        </Col>
      </Row>
    </header>
  );
};

export default MissionDetailsHeader;
