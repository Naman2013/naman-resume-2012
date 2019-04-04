// @flow
import React from 'react';
import cn from 'classnames';
import { Col, Row } from 'react-bootstrap';
import Btn from 'app/atoms/Btn';
import noop from 'lodash/fp/noop';

type TMissionDetailsHeader = {
  image: Object,
  missionTitle: string,
  missionIconURL: string,
  missionDateCreated: string,
  imageCount: number,
  isMobile: boolean,
};

const MissionDetailsHeader = (props: TMissionDetailsHeader) => {
  const {
    missionTitle,
    missionIconURL,
    missionDateCreated,
    imageCount,
    isMobile,
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
          <h1 className="h-1 h-1-low mission-details-head">
            <span className="mission-details-img">
              <img src={missionIconURL} alt={missionTitle} />
            </span>
            <span>{missionTitle}</span>
          </h1>
        </Col>
      </Row>
      <hr className="hr" />
      <Row noGutters className="mission-details-box">
        <Col lg={3} md={3} sm={12}>
          <h5 className="h-5 h-5-normal">{missionDateCreated}</h5>
        </Col>
        <Col lg={3} md={4} sm={12}>
          <h5
            className={cn('h-5 h-5-normal mission-details-ceil', {
              'mission-details-ceil-mobile': isMobile,
            })}
          >
            <span>{getTelescopeName()}</span>
            <span>{getInstrumentName()}</span>
          </h5>
        </Col>
        <Col lg={3} md={3} sm={12}>
          <h5
            className={cn('h-5 h-5-normal mission-details-ceil', {
              'mission-details-ceil-mobile': isMobile,
            })}
          >
            {imageCount} photo{imageCount > 1 && 's'}
          </h5>
        </Col>
        <Col lg={3} md={2} sm={12}>
          <div
            className={`btn-group justify-content-${
              isMobile ? 'start' : 'end'
            }`}
          >
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
