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
            popoverHeader="Delete"
            popover={
              <div>
                <h1>Delete</h1>
              </div>
            }
          />
        </div>
      </Col>
    </Row>
  );
};
