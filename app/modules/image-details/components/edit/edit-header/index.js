import { Popover } from 'app/modules/image-details/components/edit/popover';
import React, { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
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
        <div className="text-right">
          <Button>Write Observation</Button>
          <Tooltip title="Label">
            <Button className="icon-btn ml-2">
              <span className="icon-label" />
            </Button>
          </Tooltip>
          <Tooltip title="Download">
            <Button className="icon-btn ml-2">
              <span className="icon-download" />
            </Button>
          </Tooltip>
          <Tooltip title="Plus">
            <Button className="icon-btn ml-2">
              <span className="icon-plus" />
            </Button>
          </Tooltip>

          <Tooltip title="Share">
            <Button className="icon-btn ml-2">
              <span className="icon-share" />
            </Button>
          </Tooltip>

          <Tooltip title="Delete">
            <Button className="icon-btn ml-2" onClick={() => open(!isOpen)}>
              <span className="icon-delete" />
            </Button>
          </Tooltip>
          <Popover isOpen={isOpen} onHide={() => open(!isOpen)}>
            <h2>test</h2>
          </Popover>
        </div>
      </Col>
    </Row>
  );
};
