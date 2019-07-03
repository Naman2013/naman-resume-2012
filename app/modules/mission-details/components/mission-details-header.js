// @flow
import React from 'react';
import cn from 'classnames';
import { Col, Row } from 'react-bootstrap';
import Btn from 'app/atoms/Btn';
import noop from 'lodash/fp/noop';
import { TagBtn } from 'app/modules/image-details/components/edit/edit-header/tag-btn';

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
    scheduledMissionId,
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
          <h1 className="h-1 h-1-low h-1-lowercase mission-details-head">
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
        <Col lg={4} md={4} sm={12}>
          <h5 className="h-5 h-5-normal mission-details-ceil">
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
        <Col lg={2} md={2} sm={12}>
          <div
            className={`btn-group justify-content-${
              isMobile ? 'start' : 'end'
            }`}
          >
            <TagBtn
              objectId={scheduledMissionId}
              placeholder="Add tags to this mission"
              {...props}
            />
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
