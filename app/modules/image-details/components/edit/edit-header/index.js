import { BtnWithPopover } from 'app/modules/image-details/components/edit/btn-with-popover';
import { GalleryBtn } from 'app/modules/image-details/components/edit/edit-header/gallery-btn';
import { TagBtn } from 'app/modules/image-details/components/edit/edit-header/tag-btn';
import { getGalleries } from 'app/modules/image-details/thunks';
import React, { useState } from 'react';
import { downloadFile } from 'app/utils/downloadFile';
import { Button, Col, Row } from 'react-bootstrap';
import { Modal } from 'app/components/modal';
import { WriteObservationStep3 } from 'app/modules/object-details/components/write-observation-step3';
import './styles.scss';

export const EditHeader = props => {
  const {
    imageTitle,
    customerImageId,
    deleteImage,
    canEditFlag,
    canShareFlag,
    observationLog,
    refetchData,
    shareMemberPhotoData,
  } = props;

  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [isDownloadOpen, setDownloadOpen] = useState(false);
  const [isShareOpen, setShareOpen] = useState(false);

  const onDownloadFile = () => {
    const { imageDownloadURL, imageDownloadFilename } = props;
    downloadFile(imageDownloadURL, imageDownloadFilename);
  };

  const onShare = () => {
    const {
      actions: { shareMemberPicture },
      customerImageId,
    } = props;

    shareMemberPicture({ customerImageId }).then(data => {
      setShareOpen(true);
    });
  };

  const onWriteObservation = () =>
    window.scrollTo(
      0,
      document.getElementById('img-details-obs-form').offsetTop
    );

  const onShareModalClose = () => {
    refetchData();
    setShareOpen(false);
  };

  return (
    <Row className="edit-header">
      <Col lg={6} className="header">
        <h2 className="">{imageTitle}</h2>
      </Col>
      <Col lg={6}>
        <div className="float-right">
          {!!(canEditFlag && !observationLog) && (
            <Button onClick={() => onWriteObservation()}>
              Write Observation
            </Button>
          )}
          {!(canEditFlag && !observationLog) && !!canShareFlag && (
            <Button onClick={onShare}>Share Observation</Button>
          )}
          <TagBtn
            objectId={customerImageId}
            placeholder="Add tags to this image"
            {...props}
          />

          <BtnWithPopover
            isOpen={isDownloadOpen}
            setOpen={setDownloadOpen}
            className="ml-2"
            tooltip="Download"
            icon={<span className="icon-download" />}
            popover={
              <Button block onClick={() => onDownloadFile()}>
                Download
              </Button>
            }
          />

          <GalleryBtn {...props} />

          <Modal show={isShareOpen} onHide={onShareModalClose}>
            <WriteObservationStep3
              onHide={onShareModalClose}
              shareMemberPhotoData={shareMemberPhotoData}
            />
          </Modal>
          {/*<BtnWithPopover
            isOpen={isShareOpen}
            setOpen={setShareOpen}
            className="ml-2"
            tooltip="Share"
            icon={<span className="icon-share" />}
            popoverHeader="SHARE THIS IMAGE"
            popover={
              <div>
                <h1>Share</h1>
              </div>
            }
          />*/}

          <BtnWithPopover
            isOpen={isDeleteOpen}
            setOpen={setDeleteOpen}
            className="ml-2"
            tooltip="Delete"
            icon={<span className="icon-delete" />}
            popoverHeader="DELETE THIS IMAGE?"
            popover={
              <div>
                <p className="p-19">
                  Are you sure you want to delete this image? It will be removed
                  from all galleries.
                </p>
                <hr />
                <Button block onClick={() => setDeleteOpen(false)}>
                  NO, DO NOT DELETE
                </Button>
                <hr />
                <Button
                  block
                  onClick={() =>
                    deleteImage(customerImageId).then(() => {
                      setDeleteOpen(false);
                      props.router.push('/profile/private/photos/photoroll');
                    })
                  }
                >
                  YES, DELETE NOW
                </Button>
              </div>
            }
          />
        </div>
      </Col>
    </Row>
  );
};
