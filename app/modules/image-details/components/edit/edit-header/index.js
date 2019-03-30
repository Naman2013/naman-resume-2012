import { BtnWithPopover } from 'app/modules/image-details/components/edit/btn-with-popover';
import { Popover } from 'app/modules/image-details/components/edit/popover';
import React, { useState } from 'react';
import { Button, Col, OverlayTrigger, Row } from 'react-bootstrap';
import { Tooltip } from 'react-tippy';
import './styles.scss';

export const EditHeader = ({ imageTitle }) => {
  const [isOpen, open] = useState(false);

  return (
    <Row className="edit-header">
      <Col lg={6} className="header">
        <h2 className="">{imageTitle}</h2>
      </Col>
      <Col lg={6}>
        <div className="float-right">
          <Button>Write Observation</Button>

          <BtnWithPopover
            className="ml-2"
            tooltip="Label"
            icon={<span className="icon-label" />}
            popover={
              <div>
                <h1>Label</h1>
              </div>
            }
          />

          <BtnWithPopover
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
                <Button block>NO, DO NOT DELETE</Button>
                <hr />
                <Button block>YES, DELETE NOW</Button>
              </div>
            }
          />
        </div>
      </Col>
    </Row>
  );
};
