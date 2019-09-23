// @flow
import React, { useState, useRef, useEffect } from 'react';
import cn from 'classnames';
import { Col, Row } from 'react-bootstrap';
import Btn from 'app/atoms/Btn';
import noop from 'lodash/fp/noop';
import './gallery-details-header.scss';

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
    deleteGallery,
    renameGallery,
    galleryId,
  } = props;
  const width = canEditFlag ? 6 : 12;

  const editGalleryInputRef = useRef(null);
  const [editMode, setEditMode] = useState(false);
  const [galleryName, setGalleryName] = useState(galleryTitle);

  const onEditGallery = () => {
    setEditMode(true);
  };
  const onRenameGallery = () => {
    setEditMode(false);
    renameGallery({ galleryId, title: galleryName });
  };
  const onKeyDown = e => {
    const ENTER_KEYCODE = 13,
      ESC_KEYCODE = 27;
    switch (e.keyCode) {
      case ENTER_KEYCODE: {
        setEditMode(false);
        break;
      }
      case ESC_KEYCODE: {
        setEditMode(false);
        setGalleryName(galleryTitle);
        break;
      }
    }
  };

  //This effect hook used for set input focus when that will be displayed
  useEffect(() => {
    if (editMode) {
      editGalleryInputRef.current.focus();
    }
  }, [editMode]);

  return (
    <header className="gallery-details-header-root header-wrapper shadow i-box-white">
      <Row noGutters>
        <Col lg={width} md={width} sm={width}>
          <h1
            className={cn('h-1 h-1-low h-1-lowercase gallery-details-head', {
              'd-none': editMode,
            })}
          >
            <span>{galleryName}</span>
          </h1>
          <input
            className={cn('edit-gallery', { 'd-none': !editMode })}
            onBlur={onRenameGallery}
            type="text"
            ref={editGalleryInputRef}
            onChange={e => setGalleryName(e.target.value)}
            onKeyDown={onKeyDown}
            value={galleryName}
          />
        </Col>
        {canEditFlag ? (
          <Col
            lg={6}
            md={6}
            sm={6}
            className="flex-row justify-content-end align-items-center"
          >
            <Btn onClick={onEditGallery} mod="circle">
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
              <Btn onClick={deleteGallery} mod="circle">
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
