// @flow
import React from 'react';
import cn from 'classnames';
import { Col, Row } from 'react-bootstrap';
import Btn from 'app/atoms/Btn';
import noop from 'lodash/fp/noop';

type TGalleryDetailsHeader = {
  galleryTitle: string,
  galleryDateCreated: string,
  imageCount: number,
  canEditFlag: number | boolean,
  isMobile: boolean,
};

const GalleryDetailsHeader = (props: TGalleryDetailsHeader) => {
  const {
    galleryTitle,
    galleryDateCreated,
    imageCount,
    isMobile,
    canEditFlag,
  } = props;
  const width = canEditFlag ? 6 : 12;
  return (
    <header className="header-wrapper shadow i-box-white">
      <Row noGutters>
        <Col lg={width} md={width} sm={width}>
          <h1 className="h-1 h-1-low h-1-lowercase gallery-details-head">
            <span>{galleryTitle}</span>
          </h1>
        </Col>
        {canEditFlag ? (
          <Col
            lg={6}
            md={6}
            sm={6}
            className="flex-row justify-content-end align-items-center"
          >
            <Btn onClick={noop} mod="circle">
              <i className="fa fa-pencil" />
            </Btn>
          </Col>
        ) : null}
      </Row>
      <hr className="hr" />
      <Row noGutters className="gallery-details-box">
        <Col lg={3} md={3} sm={12}>
          <h5 className="h-5 h-5-normal">{galleryDateCreated}</h5>
        </Col>
        <Col lg={4} md={4} sm={12}>
          <h5
            className={cn('h-5 h-5-normal gallery-details-ceil', {
              'gallery-details-ceil-mobile': isMobile,
            })}
          >
            {imageCount} photo{imageCount > 1 && 's'}
          </h5>
        </Col>
        <Col lg={5} md={5} sm={12}>
          <div
            className={`btn-group justify-content-${
              isMobile ? 'start' : 'end'
            }`}
          >
            {/*Hide buttons from UI*/}
            {/*<Btn onClick={noop} mod="circle">
              <i className="icon icon-download nightfall" />
            </Btn>
            <Btn onClick={noop} mod="circle">
              <i className="fa fa-share-alt" />
            </Btn>*/}
            {canEditFlag ? (
              <Btn onClick={noop} mod="circle">
                <i className="fa fa-trash" />
              </Btn>
            ) : null}
          </div>
        </Col>
      </Row>
    </header>
  );
};

export default GalleryDetailsHeader;
