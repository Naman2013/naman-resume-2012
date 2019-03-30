import { BtnWithPopover } from 'app/modules/image-details/components/edit/btn-with-popover';
import React, { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import './styles.scss';

export const EditHeader = props => {
  const { imageTitle, customerImageId, deleteImage } = props;

  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [isTagsOpen, setTagsOpen] = useState(false);
  const [isDownloadOpen, setDownloadOpen] = useState(false);
  const [isAddOpen, setAddOpen] = useState(false);
  const [isShareOpen, setShareOpen] = useState(false);

  return (
    <Row className="edit-header">
      <Col lg={6} className="header">
        <h2 className="">{imageTitle}</h2>
      </Col>
      <Col lg={6}>
        <div className="float-right">
          <Button>Write Observation</Button>

          <BtnWithPopover
            isOpen={isTagsOpen}
            setOpen={setTagsOpen}
            className="ml-2"
            tooltip="Label"
            icon={<span className="icon-label" />}
            popover={
              <div>
                <input
                  type="text"
                  className="observation-control observation-control-sm"
                  placeholder="Add tags to this image"
                />
                <hr />
              </div>
            }
          />

          <BtnWithPopover
            isOpen={isDownloadOpen}
            setOpen={setDownloadOpen}
            className="ml-2"
            tooltip="Download"
            icon={<span className="icon-download" />}
            popover={
              <div>
                <h1>Download</h1>
              </div>
            }
          />

          <BtnWithPopover
            isOpen={isAddOpen}
            setOpen={setAddOpen}
            className="ml-2"
            tooltip="Plus"
            icon={<span className="icon-plus" />}
            popoverHeader="ADD IMAGE TO GALLERY"
            popover={
              <div>
                <h1>Plus</h1>
              </div>
            }
          />

          <BtnWithPopover
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
          />

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
                    deleteImage(customerImageId).then(() =>
                      setDeleteOpen(false)
                    )
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
